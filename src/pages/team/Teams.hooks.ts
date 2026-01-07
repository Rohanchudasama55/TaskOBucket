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
