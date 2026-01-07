import type { Member, Tab } from "./Teams.hooks";

export const mockMembers: Member[] = [
  {
    id: 1,
    name: "Alice Freeman",
    email: "alice@projectflow.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    role: "Admin",
    status: "Active",
    activity: "Active now",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@projectflow.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    role: "Editor",
    status: "Active",
    activity: "Last seen 5m ago",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@projectflow.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    role: "Viewer",
    status: "Away",
    activity: "Away • 30m",
  },
  {
    id: 4,
    name: "Dana Lee",
    email: "dana@projectflow.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dana",
    role: "Viewer",
    status: "Active",
    activity: "Active now",
  },
  {
    id: 5,
    name: "Evan Wright",
    email: "evan@projectflow.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Evan",
    role: "Viewer",
    status: "Pending",
    activity: "Invited • Pending",
  },
];

export const tabs: Tab[] = [
  { name: "All Members", count: 24 },
  { name: "Admins", count: 3 },
  { name: "Editors", count: 12 },
  { name: "Viewers", count: 9 },
];
