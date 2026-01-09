import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { Filter, Download, Plus, TrendingUp, TrendingDown } from 'lucide-react';

// Types
interface SummaryMetric {
  value: number;
  change: number;
  trend: 'up' | 'down';
}

interface Summary {
  totalIssues: SummaryMetric;
  completionRate: SummaryMetric;
  overdueTasks: SummaryMetric;
  avgResolutionTime: SummaryMetric;
}

interface IssuesByStatus {
  done: number;
  inProgress: number;
  toDo: number;
  backlog: number;
}

interface WorkloadData {
  [assignee: string]: number;
}

interface BurndownData {
  dates: string[];
  completed: number[];
  pending: number[];
}

interface ProjectComparisonData {
  [project: string]: number;
}

interface TrendData {
  dates: string[];
  created: number[];
  resolved: number[];
}

interface DashboardData {
  summary: Summary;
  issuesByStatus: IssuesByStatus;
  workloadByAssignee: WorkloadData;
  burndown: BurndownData;
  projectComparison: ProjectComparisonData;
  trendData: TrendData;
}

interface Filters {
  dateRange: string;
  assignees: string;
  epics: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  change?: number;
  trend?: 'up' | 'down';
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface ChartProps<T> {
  data: T;
}

// Sample data
const projectData = {
  projects: ['Project Alpha', 'Project Beta', 'Project Gamma'],
  assignees: ['Sarah Connor', 'Kyle Reese', 'Alex Morgan', 'Unassigned', 'John Doe'],
  statuses: ['Done', 'In Progress', 'To Do', 'Backlog'],
};

const generateDummyData = (filters: Filters): DashboardData => {
  return {
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
  };
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  change, 
  trend, 
  icon: Icon 
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-600">{title}</span>
      {Icon && <Icon size={18} className="text-blue-500" />}
    </div>
    <div className="flex items-end justify-between">
      <div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
      </div>
      {change !== undefined && trend && (
        <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1">{Math.abs(change)}{typeof value === 'number' && value < 100 ? '%' : ''}</span>
        </div>
      )}
    </div>
  </div>
);

const DonutChart: React.FC<ChartProps<IssuesByStatus>> = ({ data }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} issues ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12
      }
    },
    color: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
    series: [
      {
        name: 'Issues',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: data.done, name: 'Done' },
          { value: data.inProgress, name: 'In Progress' },
          { value: data.toDo, name: 'To Do' },
          { value: data.backlog, name: 'Backlog' }
        ]
      }
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: '40%',
      style: {
        text: `${total}\nTotal Issues`,
        textAlign: 'center',
        fill: '#111827',
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 24
      }
    }
  };

  return <ReactECharts option={option} style={{ height: '320px' }} />;
};

const HorizontalBarChart: React.FC<ChartProps<WorkloadData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c} issues'
    },
    grid: {
      left: '15%',
      right: '10%',
      top: '10%',
      bottom: '10%'
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#6B7280',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: Object.keys(data),
      axisLabel: {
        color: '#374151',
        fontSize: 12
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: 'Issues',
        type: 'bar',
        data: Object.values(data),
        itemStyle: {
          color: '#3B82F6',
          borderRadius: [0, 6, 6, 0]
        },
        barWidth: '50%',
        label: {
          show: true,
          position: 'right',
          color: '#374151',
          fontSize: 12
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

const BurndownChart: React.FC<ChartProps<BurndownData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Completed', 'Pending'],
      right: '5%',
      top: '0%',
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.dates,
      axisLabel: {
        color: '#6B7280',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6B7280',
        fontSize: 11
      },
      splitLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    series: [
      {
        name: 'Completed',
        type: 'line',
        smooth: true,
        data: data.completed,
        lineStyle: {
          width: 2,
          color: '#3B82F6'
        },
        itemStyle: {
          color: '#3B82F6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.6)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        }
      },
      {
        name: 'Pending',
        type: 'line',
        smooth: true,
        data: data.pending,
        lineStyle: {
          width: 2,
          color: '#E5E7EB'
        },
        itemStyle: {
          color: '#9CA3AF'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(229, 231, 235, 0.6)' },
              { offset: 1, color: 'rgba(229, 231, 235, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

const ProjectComparisonChart: React.FC<ChartProps<ProjectComparisonData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c} issues'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Object.keys(data),
      axisLabel: {
        color: '#6B7280',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6B7280',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    series: [
      {
        name: 'Total Issues',
        type: 'bar',
        data: Object.values(data),
        itemStyle: {
          color: '#3B82F6',
          borderRadius: [8, 8, 0, 0]
        },
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          color: '#374151',
          fontSize: 12
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

const TrendLineChart: React.FC<ChartProps<TrendData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Created', 'Resolved'],
      right: '5%',
      top: '0%',
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.dates,
      axisLabel: {
        color: '#6B7280',
        fontSize: 11
      },
      axisLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6B7280',
        fontSize: 11
      },
      splitLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    series: [
      {
        name: 'Created',
        type: 'line',
        smooth: true,
        data: data.created,
        lineStyle: {
          width: 3,
          color: '#10B981'
        },
        itemStyle: {
          color: '#10B981',
          borderWidth: 2,
          borderColor: '#fff'
        },
        symbol: 'circle',
        symbolSize: 8
      },
      {
        name: 'Resolved',
        type: 'line',
        smooth: true,
        data: data.resolved,
        lineStyle: {
          width: 3,
          color: '#3B82F6'
        },
        itemStyle: {
          color: '#3B82F6',
          borderWidth: 2,
          borderColor: '#fff'
        },
        symbol: 'circle',
        symbolSize: 8
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px' }} />;
};

const ProjectAnalyticsDashboard: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: 'Last 30 Days',
    assignees: 'All Assignees',
    epics: 'All Epics'
  });

  const data = generateDummyData(filters);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">Home / Project Alpha / Reports</div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Reports</h1>
              <p className="text-gray-600 mt-1">Track project health, team velocity, and issue distribution.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Download size={18} />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus size={18} />
                New Report
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
            </select>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.assignees}
              onChange={(e) => handleFilterChange('assignees', e.target.value)}
            >
              <option>All Assignees</option>
              {projectData.assignees.map(a => <option key={a}>{a}</option>)}
            </select>
            <select 
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.epics}
              onChange={(e) => handleFilterChange('epics', e.target.value)}
            >
              <option>All Epics</option>
              {projectData.projects.map(p => <option key={p}>{p}</option>)}
            </select>
            <div className="flex gap-2 ml-auto">
              <button 
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                onClick={() => setFilters({
                  dateRange: 'Last 30 Days',
                  assignees: 'All Assignees',
                  epics: 'All Epics'
                })}
              >
                Clear all
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Issues"
            value={data.summary.totalIssues.value}
            subtitle={`+${data.summary.totalIssues.change}% vs last month`}
            change={data.summary.totalIssues.change}
            trend={data.summary.totalIssues.trend}
          />
          <StatCard
            title="Completion Rate"
            value={`${data.summary.completionRate.value}%`}
            subtitle={`+${data.summary.completionRate.change}% vs last sprint`}
            change={data.summary.completionRate.change}
            trend={data.summary.completionRate.trend}
          />
          <StatCard
            title="Overdue Tasks"
            value={data.summary.overdueTasks.value}
            subtitle="-2 vs last week"
            change={data.summary.overdueTasks.change}
            trend={data.summary.overdueTasks.trend}
          />
          <StatCard
            title="Avg Resolution Time"
            value={`${data.summary.avgResolutionTime.value} days`}
            subtitle="-0.3 days improvement"
            change={data.summary.avgResolutionTime.change}
            trend={data.summary.avgResolutionTime.trend}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Issues by Status */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues by Status</h3>
            <DonutChart data={data.issuesByStatus} />
          </div>

          {/* Workload by Assignee */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Workload by Assignee</h3>
              <span className="text-xs text-gray-500">Sort by: Issue Count</span>
            </div>
            <HorizontalBarChart data={data.workloadByAssignee} />
          </div>
        </div>

        {/* Burndown Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Completed vs Pending (Sprint Burndown)</h3>
              <p className="text-sm text-gray-500">Velocity progress for Sprint #8 2021</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded">Ideal</button>
              <button className="px-3 py-1 text-xs border border-gray-200 text-gray-600 rounded">Actual</button>
            </div>
          </div>
          <BurndownChart data={data.burndown} />
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Comparison */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project-wise Issues</h3>
            <ProjectComparisonChart data={data.projectComparison} />
          </div>

          {/* Trend Line */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Creation vs Resolution</h3>
            <TrendLineChart data={data.trendData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyticsDashboard;