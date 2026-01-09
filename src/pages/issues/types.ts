// CreateIssueModal.types.ts

import type { KanbanIssue } from "../../types/kanban";

export type IssueStatus = "backlog" | "selected" | "in-progress";
export type IssueType = "story" | "task" | "bug";
export type PriorityType = "high" | "medium" | "low";

export interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateIssue: (issue: Omit<KanbanIssue, "id" | "order">) => void;
  defaultStatus?: IssueStatus;
}

export interface Assignee {
  id: string;
  name: string;
  initials: string;
  avatar: string;
}

export interface CreateIssueFormData {
  title: string;
  description: string;
  type: IssueType;
  priority: PriorityType;
  status: IssueStatus;
  assigneeIds: string[];
  labels: string[];
  epic: string;
  image: string;
}
