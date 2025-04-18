"use client";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Area,
} from "recharts";
import { useState } from "react";
import "./style.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const AnalyzeTutorialsUsage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock data - Replace with actual API data
  const tutorialData = {
    overallMetrics: {
      monthly: [
        { month: "Jan", started: 850, completed: 680, avgTimeMin: 12 },
        { month: "Feb", started: 920, completed: 750, avgTimeMin: 11 },
        { month: "Mar", started: 880, completed: 710, avgTimeMin: 13 },
      ],
    },
    popularTutorials: [
      {
        name: "How to Subscribe",
        views: 450,
        completionRate: 85,
        avgTimeMin: 8,
      },
      {
        name: "Setting Up Profile",
        views: 380,
        completionRate: 92,
        avgTimeMin: 6,
      },
      {
        name: "Creating Group Chat",
        views: 320,
        completionRate: 78,
        avgTimeMin: 10,
      },
      {
        name: "Payment Methods",
        views: 290,
        completionRate: 88,
        avgTimeMin: 7,
      },
      {
        name: "Privacy Settings",
        views: 260,
        completionRate: 95,
        avgTimeMin: 5,
      },
    ],
    stepCompletion: {
      "How to Subscribe": [
        { step: "Step 1", completed: 450, skipped: 0 },
        { step: "Step 2", completed: 435, skipped: 15 },
        { step: "Step 3", completed: 410, skipped: 25 },
        { step: "Step 4", completed: 382, skipped: 28 },
      ],
    },
    categoryMetrics: [
      { category: "Account Setup", tutorials: 5, avgCompletionRate: 88 },
      { category: "Chat Features", tutorials: 8, avgCompletionRate: 75 },
      { category: "Payments", tutorials: 4, avgCompletionRate: 82 },
      { category: "Privacy", tutorials: 3, avgCompletionRate: 90 },
      { category: "Advanced Features", tutorials: 6, avgCompletionRate: 65 },
    ],
    exitPoints: [
      { point: "Introduction", count: 50 },
      { point: "Middle Steps", count: 120 },
      { point: "Final Step", count: 30 },
      { point: "Configuration", count: 70 },
    ],
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const categories = [
    "All",
    "Account Setup",
    "Chat Features",
    "Payments",
    "Privacy",
    "Advanced Features",
  ];

  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>Tutorials Usage Analytics</h1>

        <div className="filters-section">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="filter-select"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="filter-select"
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="metrics-summary">
          <div className="metric-card">
            <h3>Total Tutorial Views</h3>
            <p>
              {tutorialData.overallMetrics.monthly.reduce(
                (acc, curr) => acc + curr.started,
                0
              )}
            </p>
          </div>
          <div className="metric-card">
            <h3>Average Completion Rate</h3>
            <p>
              {Math.round(
                (tutorialData.overallMetrics.monthly.reduce(
                  (acc, curr) => acc + curr.completed,
                  0
                ) /
                  tutorialData.overallMetrics.monthly.reduce(
                    (acc, curr) => acc + curr.started,
                    0
                  )) *
                  100
              )}
              %
            </p>
          </div>
          <div className="metric-card">
            <h3>Avg Time Spent</h3>
            <p>
              {Math.round(
                tutorialData.overallMetrics.monthly.reduce(
                  (acc, curr) => acc + curr.avgTimeMin,
                  0
                ) / 3
              )}{" "}
              min
            </p>
          </div>
          <div className="metric-card">
            <h3>Most Popular</h3>
            <p>{tutorialData.popularTutorials[0].name}</p>
          </div>
        </div>

        <div className="charts-grid">
          {/* Monthly Usage Trends */}
          <div className="chart-card">
            <h2>Monthly Usage Trends</h2>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={tutorialData.overallMetrics.monthly}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="started"
                  fill="#8884d8"
                  name="Started"
                  yAxisId="left"
                />
                <Bar
                  dataKey="completed"
                  fill="#82ca9d"
                  name="Completed"
                  yAxisId="left"
                />
                <Line
                  type="monotone"
                  dataKey="avgTimeMin"
                  stroke="#ff7300"
                  name="Avg Time (min)"
                  yAxisId="right"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Popular Tutorials */}
          <div className="chart-card">
            <h2>Popular Tutorials</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tutorialData.popularTutorials}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar
                  dataKey="completionRate"
                  fill="#82ca9d"
                  name="Completion Rate %"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Step Completion Analysis */}
          <div className="chart-card">
            <h2>Step Completion Analysis - Subscribe Tutorial</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tutorialData.stepCompletion["How to Subscribe"]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="completed"
                  stackId="a"
                  fill="#82ca9d"
                  name="Completed"
                />
                <Bar
                  dataKey="skipped"
                  stackId="a"
                  fill="#ff8042"
                  name="Skipped"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance */}
          <div className="chart-card">
            <h2>Category Performance</h2>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={tutorialData.categoryMetrics}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="tutorials"
                  fill="#8884d8"
                  name="Number of Tutorials"
                  yAxisId="left"
                />
                <Line
                  type="monotone"
                  dataKey="avgCompletionRate"
                  stroke="#82ca9d"
                  name="Avg Completion Rate %"
                  yAxisId="right"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Exit Points Analysis */}
          <div className="chart-card">
            <h2>Exit Points Analysis</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <Pie
                  data={tutorialData.exitPoints}
                  dataKey="count"
                  nameKey="point"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  label
                >
                  {tutorialData.exitPoints.map((entry, index) => (
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
    </AdminLayout>
  );
};

export default AnalyzeTutorialsUsage;
