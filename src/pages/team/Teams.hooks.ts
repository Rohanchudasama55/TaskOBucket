import { useCallback, useEffect, useMemo, useState } from "react";
import type { ApiUser, UserListResponse } from "../../services/userService";
import { userService } from "../../services/userService";
import { toast } from "../../utils/toast";

export type MemberRole = "Admin" | "Editor" | "Viewer";
export type MemberStatus = "Active" | "Away" | "Pending";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: MemberRole;
  status: MemberStatus;
  activity: string;
}

export interface Tab {
  name: string;
  count: number;
}

export interface TeamsPageProps {
  currentUserRole?: MemberRole;
}

export interface UseTeamsPageReturn {
  members: Member[];
  activeTab: string;
  searchQuery: string;
  isInviteModalOpen: boolean;
  isDeleteModalOpen: boolean;
  deleteMemberId: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  tabs: Tab[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  handleRoleChange: (memberId: string, newRole: MemberRole) => void;
  handleDeleteClick: (memberId: string) => void;
  handleDeleteConfirm: () => void;
  handleDeleteCancel: () => void;
  handleInviteSuccess: () => void;
  openInviteModal: () => void;
  closeInviteModal: () => void;
}

const PAGE_SIZE = 10;

const normalizeRole = (role?: string): MemberRole => {
  const normalized = (role || "").toLowerCase();
  if (normalized === "admin") return "Admin";
  if (normalized === "editor") return "Editor";
  return "Viewer";
};

const normalizeStatus = (status?: string): MemberStatus => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "away") return "Away";
  if (normalized === "pending") return "Pending";
  return "Active";
};

const fallbackAvatar = (name?: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name || "User"
  )}`;

const extractUsersFromResponse = (
  payload: UserListResponse
): { users: ApiUser[]; total?: number; limit?: number; page?: number } => {
  const data = (payload?.data as any) || {};
  const result = (payload?.result as any) || {};

  const candidates = [
    Array.isArray(payload?.users) ? payload.users : null,
    Array.isArray(payload?.data as ApiUser[])
      ? (payload.data as ApiUser[])
      : null,
    Array.isArray(data?.users) ? data.users : null,
    Array.isArray(data?.data) ? data.data : null,
    Array.isArray(result?.users) ? result.users : null,
    Array.isArray(result?.data) ? result.data : null,
  ];

  const users = (candidates.find((candidate) => Array.isArray(candidate)) ||
    []) as ApiUser[];

  const paginationSource =
    data?.pagination || result?.pagination || data || result || payload || {};

  const total =
    paginationSource.total ??
    paginationSource.totalCount ??
    paginationSource.totalRecords ??
    payload?.total ??
    users.length;

  const limit =
    paginationSource.limit ?? paginationSource.pageSize ?? payload?.limit;
  const page =
    paginationSource.page ?? paginationSource.currentPage ?? payload?.page;

  return { users, total, limit, page };
};

const mapApiUsersToMembers = (apiUsers: ApiUser[]): Member[] =>
  apiUsers.map((user, index) => {
    const idCandidate =
      user.id ??
      user._id ??
      user.email ??
      user.name ??
      `user-${Date.now()}-${index}`;

    const name = user.name || "Unknown User";

    return {
      id: String(idCandidate),
      name,
      email: user.email || "No email provided",
      avatar: user.avatar || user.profileImage || fallbackAvatar(name),
      role: normalizeRole(user.role),
      status: normalizeStatus(user.status),
      activity:
        user.lastActive || user.updatedAt || user.createdAt || "Active now",
    };
  });

export function useTeamsPage({
  currentUserRole = "Admin",
}: TeamsPageProps): UseTeamsPageReturn {
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [activeTab, setActiveTab] = useState("All Members");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const isAdmin = currentUserRole === "Admin";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await userService.list({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
      });

      const {
        users,
        total,
        limit,
        page: responsePage,
      } = extractUsersFromResponse(response);

      const normalized = mapApiUsersToMembers(users);
      setAllMembers(normalized);
      setTotalCount(total ?? normalized.length);

      if (responsePage && responsePage !== page) {
        setPage(responsePage);
      }

      if (limit && limit !== PAGE_SIZE) {
        // In case backend forces different page size, adjust total using provided limit.
        setTotalCount((prev) => (total !== undefined ? total : prev));
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load team members";
      setError(message);
      setAllMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleRoleChange = (memberId: string, newRole: MemberRole) => {
    setAllMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleDeleteClick = (memberId: string) => {
    setDeleteMemberId(memberId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteMemberId) return;

    setIsLoading(true);
    setError(null);

    const previousMembers = allMembers;

    // Optimistic update: remove user locally first
    setAllMembers((prev) =>
      prev.filter((member) => member.id !== deleteMemberId)
    );

    try {
      const response = await userService.delete(deleteMemberId);

      toast.success(response.message || "User deleted successfully", "Success");

      // Refresh from server to ensure consistency
      await fetchMembers();
      setIsDeleteModalOpen(false);
      setDeleteMemberId(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(message);
      // Revert optimistic update on error
      setAllMembers(previousMembers);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteMemberId(null);
  };

  const handleInviteSuccess = () => {
    fetchMembers();
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  const filteredMembers = useMemo(() => {
    if (activeTab === "Admins") {
      return allMembers.filter((member) => member.role === "Admin");
    }
    if (activeTab === "Editors") {
      return allMembers.filter((member) => member.role === "Editor");
    }
    if (activeTab === "Viewers") {
      return allMembers.filter((member) => member.role === "Viewer");
    }
    return allMembers;
  }, [activeTab, allMembers]);

  const roleCounts = useMemo(
    () =>
      allMembers.reduce(
        (acc, member) => {
          acc[member.role] += 1;
          return acc;
        },
        { Admin: 0, Editor: 0, Viewer: 0 }
      ),
    [allMembers]
  );

  const totalPages = Math.max(
    1,
    Math.ceil((totalCount || allMembers.length || 1) / PAGE_SIZE)
  );

  const tabs = useMemo<Tab[]>(
    () => [
      { name: "All Members", count: totalCount || allMembers.length },
      { name: "Admins", count: roleCounts.Admin },
      { name: "Editors", count: roleCounts.Editor },
      { name: "Viewers", count: roleCounts.Viewer },
    ],
    [totalCount, allMembers.length, roleCounts]
  );

  const boundedSetPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
  };

  return {
    members: filteredMembers,
    activeTab,
    searchQuery,
    isInviteModalOpen,
    isDeleteModalOpen,
    deleteMemberId,
    isAdmin,
    isLoading,
    error,
    tabs,
    page,
    pageSize: PAGE_SIZE,
    totalPages,
    totalCount,
    setActiveTab,
    setSearchQuery,
    setPage: boundedSetPage,
    handleRoleChange,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleInviteSuccess,
    openInviteModal,
    closeInviteModal,
  };
}
