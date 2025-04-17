"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { MetricCard } from "./components/MetricCard";
import { ChartGrid } from "./components/ChartGrid";
import { metrics } from "./utils/metrics";
import {
  countries,
  generatePointsData,
  generateSubscriptionTimeData,
  exportDashboardData,
} from "./utils/extendedData";
import { Download } from "lucide-react";
import "@/styles/dashboard.css";
import { Button } from "../components/ui/button";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCountry, setSelectedCountry] = useState("");
  const [mounted, setMounted] = useState(false);

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  const handleExport = () => {
    const data = exportDashboardData({
      country: selectedCountry,
      month: selectedMonth,
      year: selectedYear,
      timeRange,
    });

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AdminLayout>
        <div className="dashboard-loading">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <h2 className="dashboard__title">Dashboard Overview</h2>
        <div className="dashboard__header">
          <div className="dashboard__controls">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="dashboard__select"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="dashboard__select"
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
              className="dashboard__select"
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="dashboard__select"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>

            <Button onClick={handleExport}>
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        <div className="dashboard__metrics">
          {metrics.map((metric) => (
            <MetricCard key={metric.name} {...metric} />
          ))}
        </div>

        <ChartGrid />
      </div>
    </AdminLayout>
  );
}
