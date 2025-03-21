"use client";

import { useState } from "react";
import styles from "../page.module.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SurveyAnalytics({ surveyId, onClose }) {
  // Mock data - replace with actual API call
  const responseOverTime = [
    { date: "2024-01-01", responses: 10 },
    { date: "2024-01-02", responses: 15 },
    { date: "2024-01-03", responses: 8 },
    { date: "2024-01-04", responses: 20 },
    { date: "2024-01-05", responses: 12 },
  ];

  const questionDistribution = [
    { answer: "Very Satisfied", count: 45 },
    { answer: "Satisfied", count: 30 },
    { answer: "Neutral", count: 15 },
    { answer: "Dissatisfied", count: 10 },
  ];

  const completionStats = [
    { name: "Completed", value: 80 },
    { name: "Abandoned", value: 20 },
  ];

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h2>Survey Analytics</h2>
      </div>

      <div className={styles.analyticsGrid}>
        <div className={styles.analyticsCard}>
          <h3>Response Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="responses"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.analyticsCard}>
          <h3>Answer Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={questionDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="answer" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.analyticsCard}>
          <h3>Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {completionStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
