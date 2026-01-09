import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, TrendData } from "../types";

const TrendLineChart: React.FC<ChartProps<TrendData>> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
    legend: {
      data: ["Created", "Resolved"],
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
        name: "Created",
        type: "line",
        smooth: true,
        data: data.created,
        lineStyle: { width: 3, color: "#10B981" },
        itemStyle: { color: "#10B981", borderWidth: 2, borderColor: "#fff" },
        symbol: "circle",
        symbolSize: 8,
      },
      {
        name: "Resolved",
        type: "line",
        smooth: true,
        data: data.resolved,
        lineStyle: { width: 3, color: "#3B82F6" },
        itemStyle: { color: "#3B82F6", borderWidth: 2, borderColor: "#fff" },
        symbol: "circle",
        symbolSize: 8,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Issue Creation vs Resolution Trend
      </h3>{" "}
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
};

export default TrendLineChart;
