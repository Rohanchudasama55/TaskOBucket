import type { DashboardData, Filters } from "./types";


export const projectData = {
  projects: ['Project Alpha', 'Project Beta', 'Project Gamma'],
  assignees: ['Sarah Connor', 'Kyle Reese', 'Alex Morgan', 'Unassigned', 'John Doe']
};

export const generateDummyData = (_filters: Filters): DashboardData => ({
  summary: {
    totalIssues: { value: 142, change: 20, trend: 'up' },
    completionRate: { value: 68, change: 5, trend: 'up' },
    overdueTasks: { value: 8, change: -2, trend: 'down' },
    avgResolutionTime: { value: 2.4, change: -0.3, trend: 'down' }
  },
  issuesByStatus: {
    done: 47,
    inProgress: 31,
    toDo: 33,
    backlog: 31
  },
  workloadByAssignee: {
    'Sarah Connor': 34,
    'Kyle Reese': 28,
    'Alex Morgan': 22,
    'Unassigned': 8,
    'John Doe': 5
  },
  burndown: {
    dates: ['Sprint Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    completed: [12, 28, 45, 62, 78, 95, 115],
    pending: [130, 114, 97, 80, 64, 47, 27]
  },
  projectComparison: {
    'Project Alpha': 65,
    'Project Beta': 48,
    'Project Gamma': 29
  },
  trendData: {
    dates: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    created: [32, 28, 45, 37],
    resolved: [25, 30, 38, 42]
  }
});
