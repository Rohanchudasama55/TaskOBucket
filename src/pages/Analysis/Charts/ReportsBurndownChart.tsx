import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { BurndownData, ChartProps } from "../types";

const BurndownChart: React.FC<ChartProps<BurndownData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    legend: {
      data: ["Completed", "Pending"],
      right: "5%",
      top: "0%",
      textStyle: { fontSize: 12 },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.dates,
      axisLabel: { color: "#6B7280", fontSize: 11 },
      axisLine: { lineStyle: { color: "#F3F4F6" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#6B7280", fontSize: 11 },
      splitLine: { lineStyle: { color: "#F3F4F6" } },
    },
    series: [
      {
        name: "Completed",
        type: "line",
        smooth: true,
        data: data.completed,
        lineStyle: { width: 2, color: "#3B82F6" },
        itemStyle: { color: "#3B82F6" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59,130,246,0.6)" },
              { offset: 1, color: "rgba(59,130,246,0.1)" },
            ],
          },
        },
      },
      {
        name: "Pending",
        type: "line",
        smooth: true,
        data: data.pending,
        lineStyle: { width: 2, color: "#E5E7EB" },
        itemStyle: { color: "#9CA3AF" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(229,231,235,0.6)" },
              { offset: 1, color: "rgba(229,231,235,0.1)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sprint Burndown
          </h3>
          <p className="text-sm text-gray-500">
            Completed vs Pending issues for current sprint
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sprint #12 2025</span>
        </div>
      </div>{" "}
      <ReactECharts option={option} style={{ height: 280 }} />{" "}
    </div>
  );
};

export default BurndownChart;
