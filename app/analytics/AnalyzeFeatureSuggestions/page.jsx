"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell, ComposedChart
} from "recharts";
import { useState } from "react";
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const STATUS_COLORS = {
    Implemented: '#28a745',
    'In Progress': '#ffc107',
    'Under Review': '#17a2b8',
    Pending: '#6c757d'
};

const AnalyzeFeatureSuggestions = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Mock data - Replace with actual API data
    const suggestionsData = {
        monthlySubmissions: [
            { month: "Jan", count: 45, implemented: 15 },
            { month: "Feb", count: 52, implemented: 18 },
            { month: "Mar", count: 48, implemented: 12 }
        ],
        topSuggestions: [
            { title: "Dark Mode Support", votes: 850, comments: 120, status: "Implemented" },
            { title: "Voice Messages", votes: 720, comments: 95, status: "In Progress" },
            { title: "Group Video Calls", votes: 680, comments: 88, status: "Under Review" },
            { title: "Custom Emojis", votes: 550, comments: 75, status: "Pending" },
            { title: "Message Translation", votes: 520, comments: 70, status: "In Progress" }
        ],
        categoryMetrics: {
            distribution: [
                { category: "UI/UX", count: 85 },
                { category: "Chat Features", count: 120 },
                { category: "Payments", count: 45 },
                { category: "Security", count: 65 },
                { category: "Performance", count: 55 }
            ],
            implementationRates: [
                { category: "UI/UX", implemented: 25, total: 85 },
                { category: "Chat Features", implemented: 40, total: 120 },
                { category: "Payments", implemented: 15, total: 45 },
                { category: "Security", implemented: 30, total: 65 },
                { category: "Performance", implemented: 20, total: 55 }
            ]
        },
        statusBreakdown: [
            { status: "Implemented", count: 130 },
            { status: "In Progress", count: 85 },
            { status: "Under Review", count: 95 },
            { status: "Pending", count: 160 }
        ]
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const categories = ["All", "UI/UX", "Chat Features", "Payments", "Security", "Performance"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Feature Suggestions Analytics</h1>

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
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Total Suggestions</h3>
                        <p>{suggestionsData.monthlySubmissions.reduce((acc, curr) => acc + curr.count, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Implemented Features</h3>
                        <p className="implemented">{suggestionsData.monthlySubmissions.reduce((acc, curr) => acc + curr.implemented, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Implementation Rate</h3>
                        <p>{Math.round((suggestionsData.monthlySubmissions.reduce((acc, curr) => acc + curr.implemented, 0) /
                            suggestionsData.monthlySubmissions.reduce((acc, curr) => acc + curr.count, 0)) * 100)}%</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Votes</h3>
                        <p>{suggestionsData.topSuggestions.reduce((acc, curr) => acc + curr.votes, 0)}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Monthly Submissions Trend */}
                    <div className="chart-card">
                        <h2>Monthly Submissions & Implementations</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={suggestionsData.monthlySubmissions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Total Submissions" />
                                <Line type="monotone" dataKey="implemented" stroke="#82ca9d" name="Implemented" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top Voted Suggestions */}
                    <div className="chart-card">
                        <h2>Top Voted Suggestions</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={suggestionsData.topSuggestions} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="title" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="votes" fill="#8884d8" name="Votes">
                                    {suggestionsData.topSuggestions.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Distribution */}
                    <div className="chart-card">
                        <h2>Category Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={suggestionsData.categoryMetrics.distribution}
                                    dataKey="count"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {suggestionsData.categoryMetrics.distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Implementation Rates by Category */}
                    <div className="chart-card">
                        <h2>Implementation Rates by Category</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={suggestionsData.categoryMetrics.implementationRates} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill="#8884d8" name="Total Suggestions" />
                                <Bar dataKey="implemented" fill="#82ca9d" name="Implemented" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Status Breakdown */}
                    <div className="chart-card">
                        <h2>Status Breakdown</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={suggestionsData.statusBreakdown}
                                    dataKey="count"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {suggestionsData.statusBreakdown.map((entry) => (
                                        <Cell key={`cell-${entry.status}`} fill={STATUS_COLORS[entry.status]} />
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

export default AnalyzeFeatureSuggestions;