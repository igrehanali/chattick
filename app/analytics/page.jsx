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

const Analytics = () => {
  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>📊 Analytics & Insights</h1>

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
    </AdminLayout>
  );
};

export default Analytics;
