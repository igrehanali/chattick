"use client";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ComposedChart, Area
} from "recharts";
import { useState } from "react";
import './style.css';

const AnalyzeDeviceSessionUsage = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
    const [selectedPlatform, setSelectedPlatform] = useState("All");

    // Mock data - Replace with actual API data
    const sessionData = {
        dailyMetrics: [
            { hour: "00:00", activeSessions: 2500, avgDuration: 45 },
            { hour: "06:00", activeSessions: 3200, avgDuration: 38 },
            { hour: "12:00", activeSessions: 4800, avgDuration: 52 },
            { hour: "18:00", activeSessions: 4200, avgDuration: 48 }
        ],
        weeklyTrend: [
            { day: "Mon", sessionsPerUser: 5.2, avgDuration: 42 },
            { day: "Tue", sessionsPerUser: 5.8, avgDuration: 45 },
            { day: "Wed", sessionsPerUser: 5.5, avgDuration: 40 },
            { day: "Thu", sessionsPerUser: 5.9, avgDuration: 43 },
            { day: "Fri", sessionsPerUser: 6.1, avgDuration: 47 },
            { day: "Sat", sessionsPerUser: 4.8, avgDuration: 55 },
            { day: "Sun", sessionsPerUser: 4.5, avgDuration: 58 }
        ],
        sessionDurations: [
            { range: "< 5 min", count: 1200 },
            { range: "5-15 min", count: 2500 },
            { range: "15-30 min", count: 3200 },
            { range: "30-60 min", count: 1800 },
            { range: "> 60 min", count: 800 }
        ],
        peakHours: [
            { hour: "00-04", sessions: 1500 },
            { hour: "04-08", sessions: 2200 },
            { hour: "08-12", sessions: 4500 },
            { hour: "12-16", sessions: 4800 },
            { hour: "16-20", sessions: 4200 },
            { hour: "20-24", sessions: 2800 }
        ]
    };

    const timeRanges = ["24h", "7d", "30d", "90d"];
    const platforms = ["All", "Desktop", "Mobile", "Tablet"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Device & Session Usage Analytics</h1>

                <div className="filters-section">
                    <select
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                        className="filter-select"
                    >
                        {timeRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>

                    <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="filter-select"
                    >
                        {platforms.map(platform => (
                            <option key={platform} value={platform}>{platform}</option>
                        ))}
                    </select>
                </div>

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Avg Sessions per User</h3>
                        <p>{(sessionData.weeklyTrend.reduce((acc, curr) => acc + curr.sessionsPerUser, 0) / 7).toFixed(1)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Avg Session Duration</h3>
                        <p>{Math.round(sessionData.weeklyTrend.reduce((acc, curr) => acc + curr.avgDuration, 0) / 7)} min</p>
                    </div>
                    <div className="metric-card">
                        <h3>Active Sessions</h3>
                        <p>{sessionData.dailyMetrics[2].activeSessions.toLocaleString()}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Peak Hour Sessions</h3>
                        <p>{Math.max(...sessionData.peakHours.map(h => h.sessions)).toLocaleString()}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Daily Active Sessions */}
                    <div className="chart-card">
                        <h2>Daily Active Sessions</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={sessionData.dailyMetrics} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="activeSessions" fill="#8884d8" name="Active Sessions" yAxisId="left" />
                                <Line type="monotone" dataKey="avgDuration" stroke="#82ca9d" name="Avg Duration (min)" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Weekly Session Trends */}
                    <div className="chart-card">
                        <h2>Weekly Session Trends</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={sessionData.weeklyTrend} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sessionsPerUser" fill="#8884d8" name="Sessions per User" yAxisId="left" />
                                <Line type="monotone" dataKey="avgDuration" stroke="#82ca9d" name="Avg Duration (min)" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Session Duration Distribution */}
                    <div className="chart-card">
                        <h2>Session Duration Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sessionData.sessionDurations} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Number of Sessions" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Peak Hours Analysis */}
                    <div className="chart-card">
                        <h2>Peak Hours Analysis</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sessionData.peakHours} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sessions" fill="#82ca9d" name="Number of Sessions" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AnalyzeDeviceSessionUsage;