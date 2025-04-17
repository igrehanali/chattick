"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ComposedChart, Area
} from "recharts";
import { useState, useEffect } from "react";
import './style.css';

const ViewReferralPoints = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                const countryNames = data.map(country => country.name.common).sort();
                setCountries(countryNames);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    // Mock data - Replace with actual API data
    const analyticsData = {
        referralMetrics: {
            monthlyJoins: [
                { month: "Jan", users: 150, bonusCost: 1500 },
                { month: "Feb", users: 180, bonusCost: 1800 },
                { month: "Mar", users: 165, bonusCost: 1650 }
            ],
            averageReferrals: [
                { month: "Jan", average: 2.5 },
                { month: "Feb", average: 2.8 },
                { month: "Mar", average: 2.6 }
            ]
        },
        pointsMetrics: {
            transactions: [
                { month: "Jan", purchased: 5000, redeemed: 3500 },
                { month: "Feb", purchased: 5500, redeemed: 4000 },
                { month: "Mar", purchased: 5200, redeemed: 3800 }
            ],
            withdrawals: [
                { month: "Jan", amount: 2500 },
                { month: "Feb", amount: 2800 },
                { month: "Mar", amount: 2600 }
            ]
        }
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

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Referral & Points Analytics</h1>

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
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="filter-select"
                    >
                        <option value="All">All Countries</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Total Referred Users</h3>
                        <p>{analyticsData.referralMetrics.monthlyJoins.reduce((acc, curr) => acc + curr.users, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Bonus Cost</h3>
                        <p>${analyticsData.referralMetrics.monthlyJoins.reduce((acc, curr) => acc + curr.bonusCost, 0)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Avg Referrals/User</h3>
                        <p>{(analyticsData.referralMetrics.averageReferrals.reduce((acc, curr) => acc + curr.average, 0) / 3).toFixed(1)}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Points Purchased</h3>
                        <p>{analyticsData.pointsMetrics.transactions.reduce((acc, curr) => acc + curr.purchased, 0)}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Referral Joins & Costs */}
                    <div className="chart-card">
                        <h2>Referral Joins & Bonus Costs</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={analyticsData.referralMetrics.monthlyJoins} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="users" fill="#8884d8" name="Referred Users" yAxisId="left" />
                                <Line type="monotone" dataKey="bonusCost" stroke="#82ca9d" name="Bonus Cost ($)" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Average Referrals per User */}
                    <div className="chart-card">
                        <h2>Average Referrals per User</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analyticsData.referralMetrics.averageReferrals} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="average" stroke="#8884d8" name="Avg Referrals" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Points Transactions */}
                    <div className="chart-card">
                        <h2>Points Transactions</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData.pointsMetrics.transactions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="purchased" fill="#8884d8" name="Points Purchased" />
                                <Bar dataKey="redeemed" fill="#82ca9d" name="Points Redeemed" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Points Withdrawals */}
                    <div className="chart-card">
                        <h2>Points Withdrawal Amounts</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData.pointsMetrics.withdrawals} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#8884d8" name="Withdrawal Amount ($)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ViewReferralPoints;