"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell, ComposedChart, Area
} from "recharts";
import { useState, useEffect } from "react";
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyzeGroupUsage = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [selectedPlan, setSelectedPlan] = useState("All");

    // Mock data - Replace with actual API data
    const groupData = {
        monthlyMetrics: [
            { month: "Jan", newGroups: 250, totalMessages: 15000, groupMessages: 9000 },
            { month: "Feb", newGroups: 280, totalMessages: 16500, groupMessages: 10200 },
            { month: "Mar", newGroups: 265, totalMessages: 16000, groupMessages: 9800 }
        ],
        groupSizeDistribution: [
            { size: "2-5", count: 450 },
            { size: "6-10", count: 320 },
            { size: "11-20", count: 180 },
            { size: "21-50", count: 90 },
            { size: "50+", count: 30 }
        ],
        activityMetrics: {
            monthly: [
                { month: "Jan", active: 850, inactive: 150 },
                { month: "Feb", active: 920, inactive: 180 },
                { month: "Mar", active: 880, inactive: 170 }
            ],
            bySubscription: [
                { plan: "Basic", activeGroups: 450, avgSize: 8 },
                { plan: "Premium", activeGroups: 680, avgSize: 12 },
                { plan: "Enterprise", activeGroups: 320, avgSize: 25 }
            ]
        },
        regionalData: [
            { region: "North America", groups: 580, avgMsgPerDay: 45 },
            { region: "Europe", groups: 420, avgMsgPerDay: 38 },
            { region: "Asia", groups: 350, avgMsgPerDay: 42 },
            { region: "Others", groups: 220, avgMsgPerDay: 35 }
        ],
        messageTypeBreakdown: [
            { month: "Jan", oneToOne: 6000, group: 9000 },
            { month: "Feb", oneToOne: 6300, group: 10200 },
            { month: "Mar", oneToOne: 6200, group: 9800 }
        ]
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
    const regions = ["All", "North America", "Europe", "Asia", "Others"];
    const plans = ["All", "Basic", "Premium", "Enterprise"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Group Usage Analytics</h1>

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
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="filter-select"
                    >
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
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
                        <h3>Total Groups</h3>
                        <p>{groupData.groupSizeDistribution.reduce((acc, curr) => acc + curr.count, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Active Groups</h3>
                        <p className="active">{groupData.activityMetrics.monthly[2].active}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Avg Group Size</h3>
                        <p>{Math.round(groupData.activityMetrics.bySubscription.reduce((acc, curr) => acc + curr.avgSize, 0) / 3)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Group Message %</h3>
                        <p>{Math.round((groupData.messageTypeBreakdown[2].group /
                            (groupData.messageTypeBreakdown[2].group + groupData.messageTypeBreakdown[2].oneToOne)) * 100)}%</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Monthly Group Creation & Messages */}
                    <div className="chart-card">
                        <h2>Monthly Group Creation & Messages</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={groupData.monthlyMetrics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="newGroups" fill="#8884d8" name="New Groups" yAxisId="left" />
                                <Line type="monotone" dataKey="groupMessages" stroke="#82ca9d" name="Group Messages" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Group Size Distribution */}
                    <div className="chart-card">
                        <h2>Group Size Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={groupData.groupSizeDistribution}
                                    dataKey="count"
                                    nameKey="size"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {groupData.groupSizeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Active vs Inactive Groups */}
                    <div className="chart-card">
                        <h2>Active vs Inactive Groups</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={groupData.activityMetrics.monthly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="active" stackId="a" fill="#82ca9d" name="Active Groups" />
                                <Bar dataKey="inactive" stackId="a" fill="#ff8042" name="Inactive Groups" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Regional Distribution */}
                    <div className="chart-card">
                        <h2>Regional Group Activity</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={groupData.regionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="region" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="groups" fill="#8884d8" name="Total Groups" yAxisId="left" />
                                <Line type="monotone" dataKey="avgMsgPerDay" stroke="#82ca9d" name="Avg Messages/Day" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Message Type Comparison */}
                    <div className="chart-card">
                        <h2>Group vs One-to-One Messages</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={groupData.messageTypeBreakdown} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="oneToOne" fill="#8884d8" name="One-to-One Messages" />
                                <Bar dataKey="group" fill="#82ca9d" name="Group Messages" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AnalyzeGroupUsage;