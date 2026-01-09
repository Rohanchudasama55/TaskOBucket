import { useState } from "react";
import type { Filters } from "./types";
import { generateDummyData } from "./constant";
import StatCard from "./StatCard";
import {
  BurndownChart,
  DonutChart,
  HorizontalBarChart,
  ProjectComparisonChart,
  TrendLineChart,
} from "./Charts";
import moment from "moment";

const ProjectAnalyticsDashboard = () => {
  const [filters, setFilters] = useState<Filters>({
    dateRange: "Last 30 Days",
    assignees: "All Assignees",
    epics: "All Epics",
  });

  const data = generateDummyData(filters);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hour = moment().hour();

  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17 && hour < 24) {
    greeting = "Good Evening";
  }

  return (
    <div className="bg-transparent mt-[10px] mb-[30px] rounded-[12px]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left side text */}
        <div className="w-full md:w-1/2">
          <h2 className="font-['Segoe_UI'] font-semibold text-[30px] leading-[100%]">
            {greeting},{" "}
            <span
              className="font-['Segoe_UI'] font-bold text-[30px] leading-[100%]"
              style={{ color: "rgba(167, 167, 167, 1)" }}
            >
              {/* {user?.Name}! */}
            </span>
          </h2>

          <p className="mt-1 font-['Segoe_UI'] font-normal text-[15px] leading-[100%] text-gray-500">
            Track & manage your awesome team's progress here!
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

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Issues"
          value={data.summary.totalIssues.value}
          subtitle="vs last month"
        />
        <StatCard
          title="Completion Rate"
          value={`${data.summary.completionRate.value}%`}
          subtitle="vs sprint"
        />
        <StatCard
          title="Overdue Tasks"
          value={data.summary.overdueTasks.value}
          subtitle="vs last week"
        />
        <StatCard
          title="Avg Resolution Time"
          value={`${data.summary.avgResolutionTime.value} days`}
          subtitle="improved"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Issues by Status */}
        <DonutChart data={data.issuesByStatus} />

        <HorizontalBarChart data={data.workloadByAssignee} />
      </div>

      {/* Burndown Chart */}
      <BurndownChart data={data.burndown} />

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProjectComparisonChart data={data.projectComparison} />

        {/* Trend Line */}
        <TrendLineChart data={data.trendData} />
      </div>
    </div>
  );
};

export default ProjectAnalyticsDashboard;
