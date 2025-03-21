"use client";

import { useState } from "react";
import styles from "./FAQModal.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FAQAnalytics({ faqs, categories }) {
  const [timeRange, setTimeRange] = useState("week");

  // Mock analytics data - In a real application, this would come from an API
  const analyticsData = [
    { name: "Account", views: 120, helpfulRating: 85, unhelpfulRating: 15 },
    { name: "Billing", views: 90, helpfulRating: 75, unhelpfulRating: 25 },
    {
      name: "Technical Support",
      views: 150,
      helpfulRating: 90,
      unhelpfulRating: 10,
    },
  ];

  const mostViewedFAQs = [
    { question: "How do I reset my password?", views: 50 },
    { question: "What payment methods do you accept?", views: 35 },
    { question: "How can I contact technical support?", views: 45 },
  ];

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <h2 className={styles.analyticsTitle}>FAQ Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={styles.timeRangeSelect}
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className={styles.analyticsGrid}>
        <div className={styles.analyticsCard}>
          <h3>Total Views</h3>
          <p className={styles.analyticsValue}>
            {analyticsData.reduce((sum, item) => sum + item.views, 0)}
          </p>
        </div>
        <div className={styles.analyticsCard}>
          <h3>Average Helpful Rating</h3>
          <p className={styles.analyticsValue}>
            {Math.round(
              analyticsData.reduce((sum, item) => sum + item.helpfulRating, 0) /
                analyticsData.length
            )}
            %
          </p>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h3>Views by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#8884d8" name="Views" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.mostViewedSection}>
        <h3>Most Viewed FAQs</h3>
        <div className={styles.mostViewedList}>
          {mostViewedFAQs.map((faq, index) => (
            <div key={index} className={styles.mostViewedItem}>
              <span className={styles.mostViewedQuestion}>{faq.question}</span>
              <span className={styles.mostViewedViews}>{faq.views} views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
