"use client";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell
} from "recharts";
import { useState, useEffect } from "react";
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyzeSupportRequestsMetrics = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedPlan, setSelectedPlan] = useState("All");
    const [selectedSeverity, setSelectedSeverity] = useState("All");

    // Mock data - Replace with actual API data
    const supportData = {
        ticketTrends: [
            { month: "Jan", created: 250, resolved: 230 },
            { month: "Feb", created: 280, resolved: 265 },
            { month: "Mar", created: 260, resolved: 255 }
        ],
        resolutionTime: [
            { month: "Jan", avgHours: 24 },
            { month: "Feb", avgHours: 22 },
            { month: "Mar", avgHours: 20 }
        ],
        categoryDistribution: [
            { category: "Technical", count: 450 },
            { category: "Billing", count: 280 },
            { category: "Account", count: 220 },
            { category: "Feature Request", count: 150 },
            { category: "Other", count: 100 }
        ],
        severityBreakdown: [
            { month: "Jan", low: 100, medium: 100, high: 50 },
            { month: "Feb", low: 120, medium: 110, high: 50 },
            { month: "Mar", low: 110, medium: 105, high: 45 }
        ]
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
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
    const severityLevels = ["All", "Low", "Medium", "High"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Support Requests Analytics</h1>

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
                        {planTypes.map(plan => (
                            <option key={plan} value={plan}>{plan}</option>
                        ))}
                    </select>

                    <select
                        value={selectedSeverity}
                        onChange={(e) => setSelectedSeverity(e.target.value)}
                        className="filter-select"
                    >
                        {severityLevels.map(severity => (
                            <option key={severity} value={severity}>{severity}</option>
                        ))}
                    </select>
                </div>

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Total Tickets</h3>
                        <p>{supportData.ticketTrends.reduce((acc, curr) => acc + curr.created, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Resolved Tickets</h3>
                        <p>{supportData.ticketTrends.reduce((acc, curr) => acc + curr.resolved, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Avg Resolution Time</h3>
                        <p>{Math.round(supportData.resolutionTime.reduce((acc, curr) => acc + curr.avgHours, 0) / 3)} hours</p>
                    </div>
                    <div className="metric-card">
                        <h3>Resolution Rate</h3>
                        <p>{Math.round((supportData.ticketTrends.reduce((acc, curr) => acc + curr.resolved, 0) /
                            supportData.ticketTrends.reduce((acc, curr) => acc + curr.created, 0)) * 100)}%</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Ticket Creation vs Resolution */}
                    <div className="chart-card">
                        <h2>Ticket Creation vs Resolution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={supportData.ticketTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="created" stroke="#8884d8" name="Created Tickets" />
                                <Line type="monotone" dataKey="resolved" stroke="#82ca9d" name="Resolved Tickets" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Average Resolution Time */}
                    <div className="chart-card">
                        <h2>Average Resolution Time (Hours)</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={supportData.resolutionTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avgHours" fill="#8884d8" name="Average Hours" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Ticket Categories Distribution */}
                    <div className="chart-card">
                        <h2>Ticket Categories Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={supportData.categoryDistribution}
                                    dataKey="count"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {supportData.categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Tickets by Severity */}
                    <div className="chart-card">
                        <h2>Tickets by Severity</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={supportData.severityBreakdown} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="low" stackId="a" fill="#82ca9d" name="Low" />
                                <Bar dataKey="medium" stackId="a" fill="#8884d8" name="Medium" />
                                <Bar dataKey="high" stackId="a" fill="#ff7300" name="High" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AnalyzeSupportRequestsMetrics;