export type SprintStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  startDate: string; // ISO
  endDate: string;   // ISO
  description?: string;
  status: SprintStatus;
  order?: number;
}

export interface SprintColumn {
  id: SprintStatus;
  title: string;
  status: SprintStatus;
  sprints: Sprint[];
}
