import type { Filters, ProjectDashboardData } from "./types";


export const projectInfo = {
  projectId: 'alpha-001',
  projectName: 'Project Alpha',
  assignees: ['Sarah Connor', 'Kyle Reese', 'Alex Morgan'],
  issueTypes: ['Bug', 'Task', 'Story', 'Epic'],
  statuses: ['Done', 'In Progress', 'To Do', 'Backlog'],
  priorities: ['Critical', 'High', 'Medium', 'Low']
};

export const generateProjectData = (_filters: Filters): ProjectDashboardData => ({
  summary: {
    totalIssues: { value: 65, change: 12, trend: 'up' },
    completionRate: { value: 72, change: 8, trend: 'up' },
    overdueTasks: { value: 3, change: -1, trend: 'down' },
    avgResolutionTime: { value: 1.8, change: -0.5, trend: 'down' }
  },
  issuesByStatus: {
    done: 47,
    inProgress: 10,
    toDo: 6,
    backlog: 2
  },
  workloadByAssignee: {
    'Sarah Connor': 28,
    'Kyle Reese': 22,
    'Alex Morgan': 15
  },
  burndown: {
    dates: ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10'],
    completed: [5,12,18,25,32,38,44,50,55,60],
    pending: [60,53,47,40,33,27,21,15,10,5]
  },
  trendData: {
    dates: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'],
    created: [15,12,18,10,8,12],
    resolved: [10,14,16,12,11,14]
  },
  priorityBreakdown: {
    Critical: 5,
    High: 18,
    Medium: 28,
    Low: 14
  },
  issueTypeDistribution: {
    Bug: 22,
    Task: 25,
    Story: 15,
    Epic: 3
  },
  avgTimeInStatus: {
    'To Do': 1.2,
    'In Progress': 3.5,
    'Code Review': 0.8,
    Testing: 1.5,
    Done: 0
  },
  slaBreachCount: 3
});
