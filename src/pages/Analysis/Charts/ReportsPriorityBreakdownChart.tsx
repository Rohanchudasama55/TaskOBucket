import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, PriorityData } from "../types";

const PriorityBreakdownChart: React.FC<ChartProps<PriorityData>> = ({
  data,
}) => {
  const colors = {
    Critical: "#EF4444",
    High: "#F59E0B",
    Medium: "#3B82F6",
    Low: "#10B981",
  };

  const option: EChartsOption = {
    tooltip: { trigger: "axis", formatter: "{b}: {c} issues" },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: Object.keys(data),
      axisLine: { lineStyle: { color: "#F3F4F6" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "#F3F4F6" } },
    },
    series: [
      {
        type: "bar",
        data: Object.entries(data).map(([key, value]) => ({
          value,
          itemStyle: {
            color: colors[key as keyof typeof colors],
            borderRadius: [8, 8, 0, 0],
          },
        })),
        barWidth: "50%",
        label: { show: true, position: "top" },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Priority Breakdown
      </h3>{" "}
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
};

export default PriorityBreakdownChart;
