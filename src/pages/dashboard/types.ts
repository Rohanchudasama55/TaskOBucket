export interface SummaryMetric {
  value: number;
  change: number;
  trend: 'up' | 'down';
}

export interface Summary {
  totalIssues: SummaryMetric;
  completionRate: SummaryMetric;
  overdueTasks: SummaryMetric;
  avgResolutionTime: SummaryMetric;
}

export interface IssuesByStatus {
  done: number;
  inProgress: number;
  toDo: number;
  backlog: number;
}

export interface WorkloadData {
  [assignee: string]: number;
}

export interface BurndownData {
  dates: string[];
  completed: number[];
  pending: number[];
}

export interface ProjectComparisonData {
  [project: string]: number;
}

export interface TrendData {
  dates: string[];
  created: number[];
  resolved: number[];
}

export interface DashboardData {
  summary: Summary;
  issuesByStatus: IssuesByStatus;
  workloadByAssignee: WorkloadData;
  burndown: BurndownData;
  projectComparison: ProjectComparisonData;
  trendData: TrendData;
}

export interface Filters {
  dateRange: string;
  assignees: string;
  epics: string;
}

export interface ChartProps<T> {
  data: T;
}
