"use client";

import { AdminLayout } from "@/app/components/layout/admin-layout";
import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from "recharts";
import "./styles.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PaymentAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [selectedPlan, setSelectedPlan] = useState("all");

  const analyticsData = {
    revenue: {
      monthly: [
        { month: "Jan", basic: 25000, pro: 45000, enterprise: 80000, total: 150000 },
        { month: "Feb", basic: 28000, pro: 48000, enterprise: 85000, total: 161000 },
        { month: "Mar", basic: 30000, pro: 50000, enterprise: 90000, total: 170000 }
      ],
      byRegion: [
        { region: "US", basic: 40000, pro: 60000, enterprise: 100000 },
        { region: "EU", basic: 35000, pro: 55000, enterprise: 90000 },
        { region: "Asia", basic: 30000, pro: 50000, enterprise: 80000 }
      ]
    },
    costs: {
      operational: [
        {
          month: "Jan",
          messaging: 5000,
          sms: 3000,
          storage: 2000,
          hosting: 4000,
          calls: 3000,
          total: 17000
        },
        {
          month: "Feb",
          messaging: 5500,
          sms: 3200,
          storage: 2100,
          hosting: 4100,
          calls: 3300,
          total: 18200
        }
      ],
      byService: {
        messaging: { basic: 3000, pro: 5000, enterprise: 8000 },
        storage: { basic: 1000, pro: 2000, enterprise: 4000 },
        hosting: { basic: 2000, pro: 3000, enterprise: 6000 }
      }
    },
    refunds: {
      monthly: [
        {
          month: "Jan",
          amount: 1200,
          reasons: {
            technical: 500,
            billing: 300,
            service: 400
          }
        },
        {
          month: "Feb",
          amount: 1400,
          reasons: {
            technical: 600,
            billing: 400,
            service: 400
          }
        }
      ],
      byPlan: {
        basic: 800,
        pro: 1200,
        enterprise: 600
      }
    },
    metrics: {
      monthlyGrowth: [
        { month: "Jan", revenue: 12.5, users: 15.2, costs: 8.3 },
        { month: "Feb", revenue: 13.2, users: 16.1, costs: 8.8 },
        { month: "Mar", revenue: 14.1, users: 16.8, costs: 9.2 }
      ],
      profitMargin: [
        { month: "Jan", margin: 65.2 },
        { month: "Feb", margin: 66.8 },
        { month: "Mar", margin: 67.5 }
      ]
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <AdminLayout>
      <div className="payment-analytics">
        <h1>Payment Analytics</h1>

        <div className="filters">
          <div className="filter-group">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="filter-select"
            >
              {generateYears().map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="filter-select"
            >
              <option value="">All Months</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="filter-select"
            >
              <option value="global">Global</option>
              <option value="us">United States</option>
              <option value="eu">Europe</option>
              <option value="asia">Asia</option>
            </select>

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Total Revenue</h3>
            <p className="metric-value">$128,450</p>
            <span className="metric-trend positive">+12.5%</span>
            <div className="metric-breakdown">
              <span>Subscriptions: $120,450</span>
              <span>Other: $8,000</span>
            </div>
          </div>
          <div className="metric-card">
            <h3>Operating Costs</h3>
            <p className="metric-value">$45,230</p>
            <span className="metric-trend negative">+8.3%</span>
            <div className="metric-breakdown">
              <span>Infrastructure: $25,230</span>
              <span>Services: $20,000</span>
            </div>
          </div>
          <div className="metric-card">
            <h3>Net Profit</h3>
            <p className="metric-value">$83,220</p>
            <span className="metric-trend positive">+15.2%</span>
            <div className="metric-breakdown">
              <span>Margin: 64.8%</span>
            </div>
          </div>
          <div className="metric-card">
            <h3>Refunds</h3>
            <p className="metric-value">$2,340</p>
            <span className="metric-trend neutral">+0.8%</span>
            <div className="metric-breakdown">
              <span>Total Cases: 45</span>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container">
            <h3>Revenue by Plan Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.revenue.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="basic" fill="#8884d8" name="Basic" />
                <Bar dataKey="pro" fill="#82ca9d" name="Pro" />
                <Bar dataKey="enterprise" fill="#ffc658" name="Enterprise" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Operating Costs Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.costs.operational}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="messaging" fill="#8884d8" />
                <Bar dataKey="sms" fill="#82ca9d" />
                <Bar dataKey="storage" fill="#ffc658" />
                <Bar dataKey="hosting" fill="#ff8042" />
                <Bar dataKey="calls" fill="#a4de6c" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Profit Margin Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.metrics.profitMargin}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="margin" stroke="#82ca9d" name="Profit Margin %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Refund Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Technical", value: analyticsData.refunds.monthly[0].reasons.technical },
                    { name: "Billing", value: analyticsData.refunds.monthly[0].reasons.billing },
                    { name: "Service", value: analyticsData.refunds.monthly[0].reasons.service }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="detailed-metrics">
          <h3>Monthly Performance Breakdown</h3>
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Costs</th>
                <th>Net Profit</th>
                <th>Margin</th>
                <th>Refunds</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.revenue.monthly.map((item, index) => (
                <tr key={index}>
                  <td>{item.month}</td>
                  <td>${item.total.toLocaleString()}</td>
                  <td>${analyticsData.costs.operational[index]?.total.toLocaleString()}</td>
                  <td>${(item.total - (analyticsData.costs.operational[index]?.total || 0)).toLocaleString()}</td>
                  <td>{analyticsData.metrics.profitMargin[index].margin}%</td>
                  <td>${analyticsData.refunds.monthly[index]?.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentAnalytics;
