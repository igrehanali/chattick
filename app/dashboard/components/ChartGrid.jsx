import React from "react";
import { Chart } from "./Chart";
import {
  generateRevenueData,
  generateDailyData,
  generateSubscriptionData,
  generateUsageData,
  generateContestData,
} from "../utils/data";

export function ChartGrid() {
  const chartConfigs = [
    {
      type: "area",
      data: generateRevenueData(),
      config: {
        title: "Revenue & Users Overview",
        xAxis: "month",
        yAxisRight: true,
        areas: [
          {
            yAxisId: "left",
            dataKey: "revenue",
            stroke: "#6366F1",
            fill: "rgba(99, 102, 241, 0.2)",
          },
          {
            yAxisId: "right",
            dataKey: "users",
            stroke: "#34D399",
            fill: "rgba(52, 211, 153, 0.2)",
          },
        ],
      },
    },
    {
      type: "bar",
      data: generateSubscriptionData(),
      config: {
        title: "Subscription Analytics",
        xAxis: "month",
        yAxisRight: true,
        bars: [
          { dataKey: "renewals", fill: "#6366F1" },
          { dataKey: "newSubs", fill: "#34D399" },
          { dataKey: "churn", fill: "#FB7185" },
        ],
      },
    },
    {
      type: "line",
      data: generateUsageData(),
      config: {
        title: "Call & Message Usage",
        xAxis: "date",
        lines: [
          { dataKey: "calls", stroke: "#6366F1" },
          { dataKey: "messages", stroke: "#34D399" },
        ],
      },
    },
    {
      type: "bar",
      data: generateContestData(),
      config: {
        title: "Contest Participation",
        xAxis: "contest",
        yAxisRight: true,
        bars: [
          { dataKey: "participants", fill: "#6366F1" },
          { dataKey: "engagement", fill: "#34D399" },
        ],
      },
    },
  ];

  return (
    <div className="chart-grid">
      {chartConfigs.map((chart, index) => (
        <div key={index} className="chart-grid__item">
          <Chart {...chart} />
        </div>
      ))}
    </div>
  );
}
