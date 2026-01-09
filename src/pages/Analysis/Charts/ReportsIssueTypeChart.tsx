import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, IssueTypeData } from "../types";

const IssueTypeChart: React.FC<ChartProps<IssueTypeData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: { bottom: "5%", left: "center" },
    color: ["#8B5CF6", "#EC4899", "#F59E0B", "#10B981"],
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        data: Object.entries(data).map(([name, value]) => ({ name, value })),
        label: {
          show: true,
          formatter: "{b}\n{c}",
          fontSize: 11,
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Types</h3>{" "}
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
};

export default IssueTypeChart;
