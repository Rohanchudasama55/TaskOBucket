import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, ProjectComparisonData } from "../types";

const ProjectComparisonChart: React.FC<ChartProps<ProjectComparisonData>> = ({
  data,
}) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: "{b}: {c} issues",
    },
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
      axisLabel: { color: "#6B7280", fontSize: 12 },
      axisLine: {
        lineStyle: { color: "#F3F4F6" },
      },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#6B7280", fontSize: 12 },
      splitLine: {
        lineStyle: { color: "#F3F4F6" },
      },
    },
    series: [
      {
        name: "Total Issues",
        type: "bar",
        data: Object.values(data),
        barWidth: "50%",
        itemStyle: {
          color: "#3B82F6",
          borderRadius: [8, 8, 0, 0],
        },
        label: {
          show: true,
          position: "top",
          color: "#374151",
          fontSize: 12,
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Project-wise Issues
      </h3>{" "}
      <ReactECharts option={option} style={{ height: 300 }} />
    </div>
  );
};

export default ProjectComparisonChart;
