import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, IssuesByStatus } from "../types";

const DonutChart: React.FC<ChartProps<IssuesByStatus>> = ({ data }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const option: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c} issues ({d}%)" },
    legend: { bottom: "0%", left: "center" },
    color: ["#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"],
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
    graphic: {
      type: "text",
      left: "center",
      top: "40%",
      style: {
        text: `${total}\nTotal Issues`,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 700,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Issues by Status
      </h3>{" "}
      <ReactECharts option={option} style={{ height: 320 }} />
    </div>
  );
};

export default DonutChart;
