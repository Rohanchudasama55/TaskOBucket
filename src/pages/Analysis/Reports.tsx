import { Filter } from "lucide-react";
import { useState } from "react";
import { generateProjectData } from "./Constant";
import type { Filters } from "./types";
import StatCard from "./StatCard";
import {
  BurndownChart,
  DonutChart,
  HorizontalBarChart,
  IssueTypeChart,
  PriorityBreakdownChart,
  TimeInStatusChart,
  TrendLineChart,
} from "./Charts";

export const ReportsPage = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: "Last 30 Days",
    assignees: "All Assignees",
    issueType: "All Types",
    status: "All Statuses",
  });

  const data = generateProjectData(filters);

  return (
    <div className="bg-transparent mt-[10px] mb-[30px] rounded-[12px] ">
      <div className="mx-auto ">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left side text */}
        <div className="w-full md:w-1/2">
          <h2 className="font-['Segoe_UI'] font-semibold text-[30px] leading-[100%]">
            Project Alph
            <span
              className="font-['Segoe_UI'] font-bold text-[30px] leading-[100%]"
              style={{ color: "rgba(167, 167, 167, 1)" }}
            >
              {/* {user?.Name}! */}
            </span>
          </h2>

          <p className="mt-1 font-['Segoe_UI'] font-normal text-[15px] leading-[100%] text-gray-500">
             Plan, track, and deliver work efficiently with real-time insights.
          </p>
        </div>

        {/* Right side actions */}
        <div className="mt-4 md:mt-0 flex items-center justify-start md:justify-end gap-4">
          {/* Year Selector */}
          <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange}
              //   onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Custom Range</option>
            </select>
        </div>
      </div>
      {/* Divider */}
      <hr className="my-5 border-gray-200" />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Issues"
            value={data.summary.totalIssues.value}
            subtitle={`+${data.summary.totalIssues.change}% vs last period`}
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
            title="Overdue Issues"
            value={data.summary.overdueTasks.value}
            subtitle={`${data.summary.overdueTasks.change} vs last week`}
            change={data.summary.overdueTasks.change}
            trend={data.summary.overdueTasks.trend}
          />
          <StatCard
            title="Avg Resolution Time"
            value={`${data.summary.avgResolutionTime.value} days`}
            subtitle={`${data.summary.avgResolutionTime.change} days improvement`}
            change={data.summary.avgResolutionTime.change}
            trend={data.summary.avgResolutionTime.trend}
          />
        </div>

        {/* Top Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Issues by Status */}
          <DonutChart data={data.issuesByStatus} />

          {/* Workload by Assignee */}
          <HorizontalBarChart data={data.workloadByAssignee} />
        </div>

        {/* Burndown Chart */}
        <BurndownChart data={data.burndown} />

        {/* Issue Trend */}
        <TrendLineChart data={data.trendData} />

        {/* Advanced Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Priority Breakdown */}
          <PriorityBreakdownChart data={data.priorityBreakdown} />

          {/* Issue Types */}
          <IssueTypeChart data={data.issueTypeDistribution} />

          {/* Time In Status */}
          <TimeInStatusChart data={data.avgTimeInStatus} />
        </div>
      </div>
    </div>
  );
};
