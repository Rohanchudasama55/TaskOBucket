import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { ChartProps, TimeInStatusData } from "../types";

const TimeInStatusChart: React.FC<ChartProps<TimeInStatusData>> = ({
  data,
}) => {
  const option: EChartsOption = {
    tooltip: { trigger: "axis", formatter: "{b}: {c} days" },
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
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: "value",
      name: "Days",
    },
    series: [
      {
        type: "bar",
        data: Object.values(data),
        barWidth: "45%",
        itemStyle: { color: "#6366F1", borderRadius: [8, 8, 0, 0] },
        label: { show: true, position: "top", formatter: "{c}d" },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Time In Status
      </h3>
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  );
};

export default TimeInStatusChart;
