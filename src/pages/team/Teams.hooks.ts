import { useState } from "react";
import { mockMembers } from "./Teams.constants";

export type MemberRole = "Admin" | "Editor" | "Viewer";
export type MemberStatus = "Active" | "Away" | "Pending";

export interface Member {
  id: number;
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
  isAdmin: boolean;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  handleRoleChange: (memberId: number, newRole: MemberRole) => void;
  handleDelete: (memberId: number) => void;
  handleInviteSuccess: () => void;
  openInviteModal: () => void;
  closeInviteModal: () => void;
}

export function useTeamsPage({
  currentUserRole = "Admin",
}: TeamsPageProps): UseTeamsPageReturn {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [activeTab, setActiveTab] = useState("All Members");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const isAdmin = currentUserRole === "Admin";

  const handleRoleChange = (memberId: number, newRole: MemberRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member
      )
    );
  };

  const handleDelete = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
  };

  const handleInviteSuccess = () => {
    // Optionally refresh the members list or perform other actions
    // For now, the modal handles everything
  };

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  return {
    members,
    activeTab,
    searchQuery,
    isInviteModalOpen,
    isAdmin,
    setActiveTab,
    setSearchQuery,
    handleRoleChange,
    handleDelete,
    handleInviteSuccess,
    openInviteModal,
    closeInviteModal,
  };
}
