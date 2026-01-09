// CreateIssueModal.constants.ts

import type { Assignee } from "./types";

export const assignees: Assignee[] = [
  {
    id: "1",
    name: "John Doe",
    initials: "JD",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    initials: "JS",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    name: "Mike Johnson",
    initials: "MJ",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    initials: "SW",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

export const issueTypes = [
  { value: "story", label: "Story", color: "bg-green-100 text-green-800" },
  { value: "task", label: "Task", color: "bg-blue-100 text-blue-800" },
  { value: "bug", label: "Bug", color: "bg-red-100 text-red-800" },
] as const;

export const priorityTypes = [
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
] as const;

export const availableLabels = [
  "frontend",
  "backend",
  "ui-ux",
  "mobile",
  "bug-fix",
  "enhancement",
  "security",
  "performance",
  "documentation",
  "analytics",
];
