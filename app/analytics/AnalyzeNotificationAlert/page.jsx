"use client";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import { useState } from "react";
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyzeNotificationAlert = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedPlan, setSelectedPlan] = useState("All");

    // Mock data - Replace with actual API data
    const notificationData = {
        monthlyOverview: [
            { month: "Jan", sent: 25000, opened: 18500, ignored: 6500 },
            { month: "Feb", sent: 28000, opened: 20000, ignored: 8000 },
            { month: "Mar", sent: 26500, opened: 19200, ignored: 7300 }
        ],
        notificationTypes: {
            distribution: [
                { type: "Subscription Reminders", sent: 8500, openRate: 78 },
                { type: "Group Invites", sent: 12000, openRate: 85 },
                { type: "Contact Requests", sent: 9500, openRate: 92 },
                { type: "Message Alerts", sent: 15000, openRate: 95 },
                { type: "System Updates", sent: 5000, openRate: 65 }
            ],
            bySubscriptionPlan: [
                { plan: "Free", sent: 15000, openRate: 70 },
                { plan: "Basic", sent: 18000, openRate: 82 },
                { plan: "Premium", sent: 12000, openRate: 88 },
                { plan: "Enterprise", sent: 8000, openRate: 95 }
            ]
        },
        hourlyDistribution: [
            { hour: "00-04", notifications: 2500 },
            { hour: "04-08", notifications: 3800 },
            { hour: "08-12", notifications: 8500 },
            { hour: "12-16", notifications: 9200 },
            { hour: "16-20", notifications: 7500 },
            { hour: "20-24", notifications: 4500 }
        ],
        deliveryMetrics: {
            success: 95.8,
            failed: 2.2,
            delayed: 2.0,
            byPlatform: [
                { platform: "iOS", delivered: 15000, failed: 300 },
                { platform: "Android", delivered: 18000, failed: 400 },
                { platform: "Web", delivered: 12000, failed: 250 }
            ]
        }
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
    const plans = ["All", "Free", "Basic", "Premium", "Enterprise"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Notification & Alert Analytics</h1>

                <div className="filters-section">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="filter-select"
                    >
                        {years.map(year => (
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
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="filter-select"
                    >
                        {plans.map(plan => (
                            <option key={plan} value={plan}>{plan}</option>
                        ))}
                    </select>
                </div>

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Total Notifications</h3>
                        <p>{notificationData.monthlyOverview.reduce((acc, curr) => acc + curr.sent, 0).toLocaleString()}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Average Open Rate</h3>
                        <p className="success">
                            {Math.round((notificationData.monthlyOverview.reduce((acc, curr) => acc + curr.opened, 0) /
                                notificationData.monthlyOverview.reduce((acc, curr) => acc + curr.sent, 0)) * 100)}%
                        </p>
                    </div>
                    <div className="metric-card">
                        <h3>Delivery Success</h3>
                        <p>{notificationData.deliveryMetrics.success}%</p>
                    </div>
                    <div className="metric-card">
                        <h3>Most Active Time</h3>
                        <p>{notificationData.hourlyDistribution.reduce((a, b) =>
                            a.notifications > b.notifications ? a : b).hour}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Monthly Notification Overview */}
                    <div className="chart-card">
                        <h2>Monthly Notification Overview</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={notificationData.monthlyOverview} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sent" fill="#8884d8" name="Sent" />
                                <Bar dataKey="opened" fill="#82ca9d" name="Opened" />
                                <Bar dataKey="ignored" fill="#ff8042" name="Ignored" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Notification Types Performance */}
                    <div className="chart-card">
                        <h2>Notification Types Performance</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={notificationData.notificationTypes.distribution}
                                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sent" fill="#8884d8" name="Sent" yAxisId="left" />
                                <Line type="monotone" dataKey="openRate" stroke="#82ca9d" name="Open Rate %" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Subscription Plan Analysis */}
                    <div className="chart-card">
                        <h2>Notification Performance by Plan</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={notificationData.notificationTypes.bySubscriptionPlan}
                                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="plan" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sent" fill="#8884d8" name="Sent" yAxisId="left" />
                                <Line type="monotone" dataKey="openRate" stroke="#82ca9d" name="Open Rate %" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Hourly Distribution */}
                    <div className="chart-card">
                        <h2>Hourly Notification Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={notificationData.hourlyDistribution}
                                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="notifications" fill="#8884d8" name="Notifications Sent" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Platform Delivery Success */}
                    <div className="chart-card">
                        <h2>Platform Delivery Success</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={notificationData.deliveryMetrics.byPlatform}
                                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="platform" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="delivered" stackId="a" fill="#82ca9d" name="Delivered" />
                                <Bar dataKey="failed" stackId="a" fill="#ff8042" name="Failed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AnalyzeNotificationAlert;