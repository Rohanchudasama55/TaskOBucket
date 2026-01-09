import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, IssuesByStatus } from "../types";

const DonutChart: React.FC<ChartProps<IssuesByStatus>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        data: [
          { value: data.done, name: "Done" },
          { value: data.inProgress, name: "In Progress" },
          { value: data.toDo, name: "To Do" },
          { value: data.backlog, name: "Backlog" },
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Issues by Status
      </h3>
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
};

export default DonutChart;
