"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
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
} from "recharts";
import { useState } from "react";
import "./style.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const SEVERITY_COLORS = {
  Critical: "#dc3545",
  High: "#ff7300",
  Medium: "#ffc107",
  Minor: "#28a745",
};

const AnalyzeBugReportsMetrics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  // Mock data - Replace with actual API data
  const bugsData = {
    monthlyBugs: [
      { month: "Jan", total: 85, resolved: 75 },
      { month: "Feb", total: 92, resolved: 80 },
      { month: "Mar", total: 78, resolved: 65 },
    ],
    platformDistribution: {
      monthly: [
        { month: "Jan", iOS: 30, Android: 35, Web: 20 },
        { month: "Feb", iOS: 35, Android: 32, Web: 25 },
        { month: "Mar", iOS: 28, Android: 30, Web: 20 },
      ],
      total: [
        { platform: "iOS", bugs: 93 },
        { platform: "Android", bugs: 97 },
        { platform: "Web", bugs: 65 },
      ],
    },
    resolutionTime: [
      { platform: "iOS", avgDays: 3.5 },
      { platform: "Android", avgDays: 4.2 },
      { platform: "Web", avgDays: 2.8 },
    ],
    severityMetrics: {
      open: [
        { severity: "Critical", count: 5, avgDaysOpen: 1.2 },
        { severity: "High", count: 12, avgDaysOpen: 3.5 },
        { severity: "Medium", count: 25, avgDaysOpen: 5.8 },
        { severity: "Minor", count: 35, avgDaysOpen: 7.2 },
      ],
      backlog: [
        { severity: "Critical", overThreshold: 2 },
        { severity: "High", overThreshold: 8 },
        { severity: "Medium", overThreshold: 15 },
        { severity: "Minor", overThreshold: 20 },
      ],
    },
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

  const generateAllYears = () => {
    const startYear = 1900; // Starting year
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateAllYears();

  const platforms = ["All", "iOS", "Android", "Web"];

  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>Bug Reports Analytics</h1>

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
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="filter-select"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <div className="metrics-summary">
          <div className="metric-card">
            <h3>Total Bugs</h3>
            <p>
              {bugsData.monthlyBugs.reduce((acc, curr) => acc + curr.total, 0)}
            </p>
          </div>
          <div className="metric-card">
            <h3>Resolved Bugs</h3>
            <p>
              {bugsData.monthlyBugs.reduce(
                (acc, curr) => acc + curr.resolved,
                0
              )}
            </p>
          </div>
          <div className="metric-card">
            <h3>Open Critical Bugs</h3>
            <p className="critical">
              {
                bugsData.severityMetrics.open.find(
                  (s) => s.severity === "Critical"
                ).count
              }
            </p>
          </div>
          <div className="metric-card">
            <h3>Avg Resolution Time</h3>
            <p>
              {Math.round(
                bugsData.resolutionTime.reduce(
                  (acc, curr) => acc + curr.avgDays,
                  0
                ) / 3
              )}{" "}
              days
            </p>
          </div>
        </div>

        <div className="charts-grid">
          {/* Monthly Bug Trends */}
          <div className="chart-card">
            <h2>Monthly Bug Trends</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bugsData.monthlyBugs}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  name="Total Bugs"
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#82ca9d"
                  name="Resolved Bugs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Distribution */}
          <div className="chart-card">
            <h2>Platform Distribution</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bugsData.platformDistribution.monthly}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="iOS" fill="#8884d8" />
                <Bar dataKey="Android" fill="#82ca9d" />
                <Bar dataKey="Web" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Time by Platform */}
          <div className="chart-card">
            <h2>Average Resolution Time by Platform (Days)</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bugsData.resolutionTime}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgDays" fill="#8884d8" name="Average Days" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Open Bugs by Severity */}
          <div className="chart-card">
            <h2>Open Bugs by Severity</h2>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={bugsData.severityMetrics.open}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#8884d8"
                  name="Open Bugs"
                  yAxisId="left"
                />
                <Line
                  type="monotone"
                  dataKey="avgDaysOpen"
                  stroke="#ff7300"
                  name="Avg Days Open"
                  yAxisId="right"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Backlogged Issues */}
          <div className="chart-card">
            <h2>Backlogged Issues</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bugsData.severityMetrics.backlog}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="overThreshold" name="Over Threshold">
                  {bugsData.severityMetrics.backlog.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={SEVERITY_COLORS[entry.severity]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyzeBugReportsMetrics;
