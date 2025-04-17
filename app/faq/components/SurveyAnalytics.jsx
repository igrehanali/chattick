"use client";

import { useState, useEffect } from "react";
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
import { surveyService } from "@/lib/services/survey-service";
import { toast } from "react-hot-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function SurveyAnalytics({ surveyId, onClose }) {
  const [analytics, setAnalytics] = useState({
    responseOverTime: [],
    questionDistribution: [],
    completionStats: [],
  });

  useEffect(() => {
    loadAnalytics();
  }, [surveyId]);

  const loadAnalytics = async () => {
    try {
      const data = await surveyService.getSurveyAnalytics(surveyId);
      setAnalytics({
        responseOverTime: data.responseOverTime,
        questionDistribution: data.questionDistribution,
        completionStats: data.completionStats,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast.error("Failed to load survey analytics");
    }
  };

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
