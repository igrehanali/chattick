"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import './style.css';

const RenewalAnalytics = () => {
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
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const planTypes = ["All", "Basic", "Premium", "Enterprise"];

    // Mock data - Replace with actual API data
    const renewalData = {
        renewalTrends: [
            { month: "Jan", renewed: 85, expired: 15, autoRenewal: 65 },
            { month: "Feb", renewed: 90, expired: 10, autoRenewal: 70 },
            { month: "Mar", renewed: 88, expired: 12, autoRenewal: 68 },
        ],
        planWiseRenewal: [
            { plan: "Basic", renewalRate: 75, churnRate: 25 },
            { plan: "Premium", renewalRate: 85, churnRate: 15 },
            { plan: "Enterprise", renewalRate: 95, churnRate: 5 },
        ],
        earlyRenewalStats: [
            { month: "Jan", early: 20, onTime: 65, late: 15 },
            { month: "Feb", early: 25, onTime: 60, late: 15 },
            { month: "Mar", early: 22, onTime: 63, late: 15 },
        ],
        renewalRevenue: [
            { month: "Jan", basic: 5000, premium: 15000, enterprise: 25000 },
            { month: "Feb", basic: 5500, premium: 16000, enterprise: 26000 },
            { month: "Mar", basic: 5200, premium: 15500, enterprise: 25500 },
        ]
    };




    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Renewal Analytics</h1>

                <div className="filters-section">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>

                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((month) => (
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
                </div>

                <div className="charts-grid">
                    <div className="chart-card">
                        <h2>Renewal vs Expiration Trends</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={renewalData.renewalTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="renewed" fill="#82ca9d" name="Renewed" />
                                <Bar dataKey="expired" fill="#ff7300" name="Expired" />
                                <Bar dataKey="autoRenewal" fill="#8884d8" name="Auto-Renewal" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h2>Plan-wise Renewal Performance</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={renewalData.planWiseRenewal}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="plan" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="renewalRate" fill="#82ca9d" name="Renewal Rate %" />
                                <Bar dataKey="churnRate" fill="#ff7300" name="Churn Rate %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h2>Renewal Timing Analysis</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={renewalData.earlyRenewalStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="early" fill="#82ca9d" name="Early Renewal" />
                                <Bar dataKey="onTime" fill="#8884d8" name="On-time Renewal" />
                                <Bar dataKey="late" fill="#ff7300" name="Late Renewal" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-card">
                        <h2>Renewal Revenue by Plan</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={renewalData.renewalRevenue}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="basic" stroke="#8884d8" name="Basic Plan" />
                                <Line type="monotone" dataKey="premium" stroke="#82ca9d" name="Premium Plan" />
                                <Line type="monotone" dataKey="enterprise" stroke="#ffc658" name="Enterprise Plan" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default RenewalAnalytics;