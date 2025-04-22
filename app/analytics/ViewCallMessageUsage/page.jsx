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
} from "recharts";
import { useState, useEffect } from "react";
import { callsAndMsg } from "@/app/dashboard/utils/metrics";
import "./style.css";
import { MetricCard } from "@/app/dashboard/components/MetricCard";

const ViewCallMessageUsage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [countries, setCountries] = useState([]);
  const [chartHeight, setChartHeight] = useState(300);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setChartHeight(window.innerWidth <= 768 ? 260 : 300);
    }
  }, []);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  // Mock data - Replace with actual API data
  const usageData = {
    callStats: {
      totalCalls: [
        { month: "Jan", audio: 1500, video: 800 },
        { month: "Feb", audio: 1800, video: 950 },
        { month: "Mar", audio: 1650, video: 875 },
      ],
      averageDuration: [
        { month: "Jan", audioDuration: 15, videoDuration: 25 },
        { month: "Feb", audioDuration: 18, videoDuration: 28 },
        { month: "Mar", audioDuration: 16, videoDuration: 26 },
      ],
      peakHours: [
        { hour: "00-04", calls: 150 },
        { hour: "04-08", calls: 280 },
        { hour: "08-12", calls: 850 },
        { hour: "12-16", calls: 920 },
        { hour: "16-20", calls: 780 },
        { hour: "20-24", calls: 450 },
      ],
    },
    messageStats: {
      totalMessages: [
        { month: "Jan", count: 25000 },
        { month: "Feb", count: 28000 },
        { month: "Mar", count: 26500 },
      ],
      messageTypes: [
        { type: "Text", count: 15000 },
        { type: "Image", count: 5000 },
        { type: "Video", count: 3000 },
        { type: "Audio", count: 2000 },
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
  const planTypes = ["All", "Basic", "Premium", "Enterprise"];

  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>Call & Message Usage Analytics</h1>
        {/* ----> Selectors <---- */}
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
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="filter-select"
          >
            {planTypes.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>

        {/* ---> View Call Usage Data IN Chart Grid <---- */}
        <div className="Detail_grid">
          {callsAndMsg.map((metric) => (
            <MetricCard key={metric.name} {...metric} />
          ))}
        </div>

        <div className="charts-grid">
          {/* Total Calls Chart */}
          <div className="chart-card">
            <h2>Total Calls</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData.callStats.totalCalls}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="audio" fill="#8884d8" name="Audio Calls" />
                <Bar dataKey="video" fill="#82ca9d" name="Video Calls" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Average Call Duration */}
          <div className="chart-card">
            <h2>Average Call Duration (minutes)</h2>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={usageData.callStats.averageDuration}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="audioDuration"
                  stroke="#8884d8"
                  name="Audio Duration"
                />
                <Line
                  type="monotone"
                  dataKey="videoDuration"
                  stroke="#82ca9d"
                  name="Video Duration"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Peak Traffic Hours */}
          <div className="chart-card">
            <h2>Peak Traffic Hours</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData.callStats.peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calls" fill="#8884d8" name="Number of Calls" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Total Messages */}
          <div className="chart-card">
            <h2>Total Messages</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData.messageStats.totalMessages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  name="Messages"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Message Types Distribution */}
          <div className="chart-card">
            <h2>Message Types Distribution</h2>
            <ResponsiveContainer
              width="100%"
              height={window.innerWidth <= 768 ? 270 : 300}
            >
              <PieChart>
                <Pie
                  data={usageData.messageStats.messageTypes}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {usageData.messageStats.messageTypes.map((entry, index) => (
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

export default ViewCallMessageUsage;
