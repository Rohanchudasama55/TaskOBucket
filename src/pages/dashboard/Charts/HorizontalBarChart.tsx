import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, WorkloadData } from "../types";

const HorizontalBarChart: React.FC<ChartProps<WorkloadData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: "{b}: {c} issues",
    },
    grid: {
      left: "15%",
      right: "10%",
      top: "10%",
      bottom: "10%",
    },
    xAxis: {
      type: "value",
      axisLabel: { color: "#6B7280", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: "#F3F4F6" },
      },
    },
    yAxis: {
      type: "category",
      data: Object.keys(data),
      axisLabel: { color: "#374151", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: "Issues",
        type: "bar",
        data: Object.values(data),
        barWidth: "50%",
        itemStyle: {
          color: "#3B82F6",
          borderRadius: [0, 6, 6, 0],
        },
        label: {
          show: true,
          position: "right",
          color: "#374151",
          fontSize: 12,
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Workload by Assignee
        </h3>
        <span className="text-xs text-gray-500">Sort by: Issue Count</span>
      </div>
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
};

export default HorizontalBarChart;
