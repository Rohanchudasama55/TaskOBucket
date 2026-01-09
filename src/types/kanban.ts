export interface KanbanIssue {
  id: string;
  key: string;
  title: string;
  type: 'story' | 'task' | 'bug';
  status: 'backlog' | 'selected' | 'in-progress' | 'completed';
  assignee?: {
    id: string;
    name: string;
    avatar: string;
  };
  labels?: string[];
  epic?: string;
  image?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  order?: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: 'backlog' | 'selected' | 'in-progress' | 'completed';
  issues: KanbanIssue[];
}

export interface BoardFilters {
  assignee?: string;
  epic?: string;
  label?: string;
}

export type ViewMode = 'kanban' | 'list' | 'timeline';