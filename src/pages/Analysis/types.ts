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

export interface TrendData {
  dates: string[];
  created: number[];
  resolved: number[];
}

export interface PriorityData {
  [priority: string]: number;
}

export interface IssueTypeData {
  [type: string]: number;
}

export interface TimeInStatusData {
  [status: string]: number;
}

export interface ProjectDashboardData {
  summary: Summary;
  issuesByStatus: IssuesByStatus;
  workloadByAssignee: WorkloadData;
  burndown: BurndownData;
  trendData: TrendData;
  priorityBreakdown: PriorityData;
  issueTypeDistribution: IssueTypeData;
  avgTimeInStatus: TimeInStatusData;
  slaBreachCount: number;
}

export interface Filters {
  dateRange: string;
  assignees: string;
  issueType: string;
  status: string;
}

export interface ChartProps<T> {
  data: T;
}
