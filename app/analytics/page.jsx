"use client";
import { AdminLayout } from "../components/layout/admin-layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./style.css";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const weeklyEngagementData = [
  { name: "Mon", users: 500, points: 200 },
  { name: "Tue", users: 400, points: 300 },
  { name: "Wed", users: 600, points: 250 },
  { name: "Thu", users: 700, points: 400 },
  { name: "Fri", users: 800, points: 500 },
  { name: "Sat", users: 650, points: 350 },
  { name: "Sun", users: 700, points: 450 },
];

const monthlyReferralsData = [
  { name: "Jan", referrals: 30 },
  { name: "Feb", referrals: 25 },
  { name: "Mar", referrals: 40 },
  { name: "Apr", referrals: 35 },
  { name: "May", referrals: 50 },
  { name: "Jun", referrals: 60 },
  { name: "Jul", referrals: 55 },
  { name: "Aug", referrals: 45 },
  { name: "Sep", referrals: 50 },
  { name: "Oct", referrals: 65 },
  { name: "Nov", referrals: 70 },
  { name: "Dec", referrals: 80 },
];

const supportMetricsData = [
  { name: "Support Requests", value: 40 },
  { name: "Bug Reports", value: 30 },
  { name: "Feature Suggestions", value: 20 },
  { name: "Tutorial Usage", value: 10 },
];

const radarChartData = [
  { metric: "Login Security", value: 90 },
  { metric: "Session Stability", value: 85 },
  { metric: "Notifications", value: 75 },
  { metric: "Integration Costs", value: 65 },
];

const groupUsageData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const deviceSessionData = [
  { name: "Mobile", sessions: 600 },
  { name: "Desktop", sessions: 400 },
  { name: "Tablet", sessions: 200 },
];

const notificationEngagementData = [
  { name: "Email", engagement: 300 },
  { name: "Push", engagement: 200 },
  { name: "SMS", engagement: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const metricsOverview = {
  totalPoints: 25000,
  pointsPurchased: 15000,
  pointsWithdrawn: 8000,
  avgSubscriptionTime: "45 days",
};

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [countries, setCountries] = useState([]);

  // Fetch countries from an external API
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

  // Generate all years from a starting year to the current year
  const generateAllYears = () => {
    const startYear = 1900; // Starting year
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const years = generateAllYears(); // Generate all years

  // Generate months dynamically
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleExport = () => {
    const data = {
      weeklyEngagement: weeklyEngagementData,
      monthlyReferrals: monthlyReferralsData,
      supportMetrics: supportMetricsData,
      // Add more data as needed
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>📊 Analytics & Insights</h1>
        {/* Filter section */}
        <div className="filters-section">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="All">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>

          <Button />
        </div>

        <div className="metrics-overview">
          <div className="metric-card">
            <h3>Total Points Earned</h3>
            <p>{metricsOverview.totalPoints}</p>
          </div>
          <div className="metric-card">
            <h3>Points Purchased</h3>
            <p>{metricsOverview.pointsPurchased}</p>
          </div>
          <div className="metric-card">
            <h3>Points Withdrawn</h3>
            <p>{metricsOverview.pointsWithdrawn}</p>
          </div>
          <div className="metric-card">
            <h3>Avg. Subscription Time</h3>
            <p>{metricsOverview.avgSubscriptionTime}</p>
          </div>
        </div>


        {/* filetr working end */}

        <div className="charts-grid">
          <div className="chart-card">
            <h2>📈 Weekly Engagement</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                <Line type="monotone" dataKey="points" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>📊 Monthly Referrals</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReferralsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="referrals" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>📌 Support Metrics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={supportMetricsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {supportMetricsData.map((entry, index) => (
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

          <div className="chart-card">
            <h2>🔍 System Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarChartData} outerRadius={90}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>📊 Group Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={groupUsageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {groupUsageData.map((entry, index) => (
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

          <div className="chart-card">
            <h2>📊 Device & Session Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceSessionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>📊 Notification & Alert Engagement</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={notificationEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout >
  );
};

export default Analytics;
