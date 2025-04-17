"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell, ComposedChart, Area
} from "recharts";
import { useState } from "react";
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyzeLoginSecurityMetrics = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
    const [selectedRegion, setSelectedRegion] = useState("All");

    // Mock data - Replace with actual API data
    const securityData = {
        loginAttempts: {
            hourly: [
                { hour: "00:00", success: 850, failure: 45, firstTry: 780 },
                { hour: "06:00", success: 920, failure: 52, firstTry: 850 },
                { hour: "12:00", success: 1200, failure: 65, firstTry: 1100 },
                { hour: "18:00", success: 980, failure: 48, firstTry: 900 }
            ],
            failureReasons: [
                { reason: "Wrong Password", count: 150 },
                { reason: "Invalid Username", count: 80 },
                { reason: "Account Locked", count: 45 },
                { reason: "Expired Session", count: 35 }
            ]
        },
        authMethods: {
            distribution: [
                { method: "Password", users: 5500 },
                { method: "Biometric", users: 3200 },
                { method: "PIN", users: 1800 },
                { method: "2FA", users: 2500 }
            ],
            twoFactorStats: [
                { type: "SMS", users: 1500, successRate: 98 },
                { type: "Email", users: 800, successRate: 95 },
                { type: "Authenticator App", users: 200, successRate: 99 }
            ]
        },
        passwordResets: {
            daily: [
                { day: "Mon", count: 85, selfService: 65 },
                { day: "Tue", count: 92, selfService: 70 },
                { day: "Wed", count: 78, selfService: 60 },
                { day: "Thu", count: 88, selfService: 68 },
                { day: "Fri", count: 95, selfService: 75 }
            ],
            methods: [
                { method: "Email Link", count: 250 },
                { method: "SMS Code", count: 150 },
                { method: "Security Questions", count: 100 }
            ]
        },
        accountLockouts: {
            trend: [
                { hour: "00:00", count: 12 },
                { hour: "06:00", count: 15 },
                { hour: "12:00", count: 22 },
                { hour: "18:00", count: 18 }
            ],
            duration: [
                { period: "< 1 hour", count: 35 },
                { period: "1-3 hours", count: 25 },
                { period: "3-12 hours", count: 15 },
                { period: "12-24 hours", count: 8 }
            ]
        }
    };

    const timeRanges = ["24h", "7d", "30d", "90d"];
    const regions = ["All", "North America", "Europe", "Asia", "Others"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Login & Security Analytics</h1>

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
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="filter-select"
                    >
                        {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </div>

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Login Success Rate</h3>
                        <p className="success">{Math.round((securityData.loginAttempts.hourly.reduce((acc, curr) => acc + curr.success, 0) /
                            (securityData.loginAttempts.hourly.reduce((acc, curr) => acc + curr.success + curr.failure, 0))) * 100)}%</p>
                    </div>
                    <div className="metric-card">
                        <h3>First Try Success</h3>
                        <p>{Math.round((securityData.loginAttempts.hourly.reduce((acc, curr) => acc + curr.firstTry, 0) /
                            securityData.loginAttempts.hourly.reduce((acc, curr) => acc + curr.success, 0)) * 100)}%</p>
                    </div>
                    <div className="metric-card">
                        <h3>2FA Adoption</h3>
                        <p>{Math.round((securityData.authMethods.distribution.find(m => m.method === "2FA").users /
                            securityData.authMethods.distribution.reduce((acc, curr) => acc + curr.users, 0)) * 100)}%</p>
                    </div>
                    <div className="metric-card">
                        <h3>Active Lockouts</h3>
                        <p className="warning">{securityData.accountLockouts.trend.reduce((acc, curr) => acc + curr.count, 0)}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Login Success vs Failure */}
                    <div className="chart-card">
                        <h2>Login Success vs Failure</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={securityData.loginAttempts.hourly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="success" fill="#82ca9d" name="Successful Logins" />
                                <Bar dataKey="failure" fill="#ff8042" name="Failed Attempts" />
                                <Line type="monotone" dataKey="firstTry" stroke="#8884d8" name="First Try Success" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Authentication Methods */}
                    <div className="chart-card">
                        <h2>Authentication Methods Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={securityData.authMethods.distribution}
                                    dataKey="users"
                                    nameKey="method"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {securityData.authMethods.distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* 2FA Performance */}
                    <div className="chart-card">
                        <h2>2FA Performance by Type</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={securityData.authMethods.twoFactorStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="users" fill="#8884d8" name="Users" yAxisId="left" />
                                <Line type="monotone" dataKey="successRate" stroke="#82ca9d" name="Success Rate %" yAxisId="right" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Password Reset Trends */}
                    <div className="chart-card">
                        <h2>Password Reset Trends</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={securityData.passwordResets.daily} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Total Resets" />
                                <Line type="monotone" dataKey="selfService" stroke="#82ca9d" name="Self-Service" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Account Lockouts */}
                    <div className="chart-card">
                        <h2>Account Lockouts Duration</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={securityData.accountLockouts.duration} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#ff8042" name="Locked Accounts" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AnalyzeLoginSecurityMetrics;