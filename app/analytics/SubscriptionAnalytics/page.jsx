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
import "./style.css";

// Add this constant

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";

// Add this constant
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const SubscriptionAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [countries, setCountries] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("All");

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

  // Mock data - Replace with actual API data
  const subscriptionData = {
    newSignups: [
      { month: "Jan", count: 120 },
      { month: "Feb", count: 150 },
      { month: "Mar", count: 180 },
      { month: "Apr", count: 135 },
      { month: "May", count: 165 },
    ],
    renewalRates: [
      { month: "Jan", rate: 85 },
      { month: "Feb", rate: 88 },
      { month: "Mar", rate: 92 },
      { month: "Apr", rate: 87 },
      { month: "May", rate: 90 },
    ],
    planPopularity: [
      { name: "Basic", subscribers: 450 },
      { name: "Premium", subscribers: 300 },
      { name: "Enterprise", subscribers: 150 },
    ],
    churnRate: [
      { month: "Jan", cancellations: 20 },
      { month: "Feb", cancellations: 15 },
      { month: "Mar", cancellations: 18 },
      { month: "Apr", cancellations: 12 },
      { month: "May", cancellations: 16 },
    ],
    averageDuration: [
      { month: "Jan", basic: 8.5, premium: 12.3, enterprise: 15.7 },
      { month: "Feb", basic: 9.2, premium: 11.8, enterprise: 16.1 },
      { month: "Mar", basic: 8.8, premium: 12.5, enterprise: 15.9 },
      { month: "Apr", basic: 9.5, premium: 12.8, enterprise: 16.3 },
      { month: "May", basic: 9.1, premium: 12.2, enterprise: 16.0 },
    ],
  };

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
  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>Subscription Analytics</h1>

        {/* Filters */}
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

          <Button>Export pdf🗃️</Button>
        </div>

        <div className="charts-grid">
          {/* New Sign-ups Chart */}
          <div className="chart-card">
            <h2>New Sign-ups</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subscriptionData.newSignups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Renewal Rates Chart */}
          <div className="chart-card">
            <h2>Renewal Rates</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subscriptionData.renewalRates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#82ca9d"
                  name="Renewal Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Plan Popularity Chart */}
          <div className="chart-card">
            <h2>Plan Popularity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData.planPopularity}
                  dataKey="subscribers"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {subscriptionData.planPopularity.map((entry, index) => (
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

          {/* Churn Rate Chart */}
          <div className="chart-card">
            <h2>Subscription Cancellations</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subscriptionData.churnRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="cancellations"
                  fill="#ff7300"
                  name="Cancellations"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Average Subscription Duration Chart */}
          <div className="chart-card">
            <h2>Average Subscription Duration (Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subscriptionData.averageDuration}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="basic"
                  stroke="#8884d8"
                  name="Basic Plan"
                />
                <Line
                  type="monotone"
                  dataKey="premium"
                  stroke="#82ca9d"
                  name="Premium Plan"
                />
                <Line
                  type="monotone"
                  dataKey="enterprise"
                  stroke="#ffc658"
                  name="Enterprise Plan"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubscriptionAnalytics;
