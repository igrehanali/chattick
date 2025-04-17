import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const chartStyles = {
  cartesianGrid: { strokeDasharray: "3 3", stroke: "#374151" },
  axis: { tick: { fill: "#6B7280" } },
  tooltip: {
    contentStyle: {
      backgroundColor: "#1F2937",
      border: "none",
      borderRadius: "0.375rem",
      color: "#F3F4F6",
    },
  },
};

export function Chart({ type, data, config }) {
  let ChartComponent;
  switch (type) {
    case "area":
      ChartComponent = AreaChart;
      break;
    case "bar":
      ChartComponent = BarChart;
      break;
    case "line":
      ChartComponent = LineChart;
      break;
    default:
      ChartComponent = BarChart;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        {config.title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data}>
          <CartesianGrid {...chartStyles.cartesianGrid} />
          <XAxis dataKey={config.xAxis} {...chartStyles.axis} />
          <YAxis yAxisId="left" {...chartStyles.axis} />
          {config.yAxisRight && (
            <YAxis yAxisId="right" orientation="right" {...chartStyles.axis} />
          )}
          <Tooltip {...chartStyles.tooltip} />
          {type === "area" &&
            config.areas?.map((area) => (
              <Area
                key={area.dataKey}
                type="monotone"
                yAxisId={area.yAxisId || "left"}
                {...area}
                fillOpacity={0.3}
              />
            ))}
          {type === "bar" &&
            config.bars?.map((bar) => (
              <Bar key={bar.dataKey} yAxisId="left" {...bar} />
            ))}
          {type === "line" &&
            config.lines?.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                yAxisId="left"
                {...line}
              />
            ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
