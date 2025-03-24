"use client";

import { AdminLayout } from "@/app/components/layout/admin-layout";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./styles.css";

const PaymentAnalytics = () => {
  return (
    <AdminLayout>
      <div className="payment-analytics">
        <div className="filters">
          <div className="filter-group">
            <select className="filter-select">
              <option value="global">Global</option>
              <option value="us">United States</option>
              <option value="eu">Europe</option>
              <option value="asia">Asia</option>
            </select>
            <select className="filter-select">
              <option value="all">All Plans</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div className="date-range">
            <input type="date" className="date-input" />
            <span>to</span>
            <input type="date" className="date-input" />
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <h3>Total Revenue</h3>
            <p className="metric-value">$128,450</p>
            <span className="metric-trend positive">+12.5%</span>
          </div>
          <div className="metric-card">
            <h3>Operating Costs</h3>
            <p className="metric-value">$45,230</p>
            <span className="metric-trend negative">+8.3%</span>
          </div>
          <div className="metric-card">
            <h3>Net Profit</h3>
            <p className="metric-value">$83,220</p>
            <span className="metric-trend positive">+15.2%</span>
          </div>
          <div className="metric-card">
            <h3>Refunds</h3>
            <p className="metric-value">$2,340</p>
            <span className="metric-trend neutral">+0.8%</span>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-container revenue-chart">
            <h3>Revenue by Region</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { region: "US", revenue: 80000 },
                  { region: "EU", revenue: 65000 },
                  { region: "Asia", revenue: 45000 },
                  { region: "Other", revenue: 30000 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container profit-chart">
            <h3>Monthly Profit Margin</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { month: "Jan", margin: 30 },
                  { month: "Feb", margin: 45 },
                  { month: "Mar", margin: 60 },
                  { month: "Apr", margin: 55 },
                  { month: "May", margin: 65 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="margin" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentAnalytics;
