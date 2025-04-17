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

const ViewPaymentFinancial = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedPlan, setSelectedPlan] = useState("All");
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
    const financialData = {
        revenue: {
            monthly: [
                { month: "Jan", basic: 50000, premium: 75000, enterprise: 100000 },
                { month: "Feb", basic: 55000, premium: 80000, enterprise: 110000 },
                { month: "Mar", basic: 52000, premium: 78000, enterprise: 105000 }
            ],
            totalRevenue: 705000
        },
        costs: {
            breakdown: [
                { month: "Jan", messaging: 5000, sms: 3000, storage: 2000, hosting: 4000, calls: 6000 },
                { month: "Feb", messaging: 5500, sms: 3200, storage: 2100, hosting: 4100, calls: 6200 },
                { month: "Mar", messaging: 5200, sms: 3100, storage: 2050, hosting: 4050, calls: 6100 }
            ],
            totalCosts: 56600
        },
        profitMetrics: {
            monthly: [
                { month: "Jan", revenue: 225000, costs: 20000, profit: 205000, margin: 91 },
                { month: "Feb", revenue: 245000, costs: 21100, profit: 223900, margin: 91.4 },
                { month: "Mar", revenue: 235000, costs: 20500, profit: 214500, margin: 91.3 }
            ]
        },
        refunds: {
            monthly: [
                { month: "Jan", count: 25, amount: 2500 },
                { month: "Feb", count: 22, amount: 2200 },
                { month: "Mar", count: 24, amount: 2400 }
            ],
            byReason: [
                { reason: "Technical Issues", count: 30 },
                { reason: "Service Dissatisfaction", count: 20 },
                { reason: "Accidental Purchase", count: 15 },
                { reason: "Other", count: 6 }
            ]
        },
        withdrawalPayouts: [
            { month: "Jan", amount: 180000 },
            { month: "Feb", amount: 195000 },
            { month: "Mar", amount: 188000 }
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

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Payment & Financial Analytics</h1>

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

                <div className="metrics-summary">
                    <div className="metric-card">
                        <h3>Total Revenue</h3>
                        <p>${financialData.revenue.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Total Costs</h3>
                        <p>${financialData.costs.totalCosts.toLocaleString()}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Net Profit</h3>
                        <p>${(financialData.revenue.totalRevenue - financialData.costs.totalCosts).toLocaleString()}</p>
                    </div>
                    <div className="metric-card">
                        <h3>Profit Margin</h3>
                        <p>{((1 - financialData.costs.totalCosts / financialData.revenue.totalRevenue) * 100).toFixed(1)}%</p>
                    </div>
                </div>

                <div className="charts-grid">
                    {/* Revenue by Plan Type */}
                    <div className="chart-card">
                        <h2>Revenue by Plan Type</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialData.revenue.monthly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="basic" fill="#8884d8" name="Basic Plan" />
                                <Bar dataKey="premium" fill="#82ca9d" name="Premium Plan" />
                                <Bar dataKey="enterprise" fill="#ffc658" name="Enterprise Plan" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Operating Costs Breakdown */}
                    <div className="chart-card">
                        <h2>Operating Costs Breakdown</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialData.costs.breakdown} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="messaging" stackId="a" fill="#8884d8" name="Messaging" />
                                <Bar dataKey="sms" stackId="a" fill="#82ca9d" name="SMS" />
                                <Bar dataKey="storage" stackId="a" fill="#ffc658" name="Storage" />
                                <Bar dataKey="hosting" stackId="a" fill="#ff7300" name="Hosting" />
                                <Bar dataKey="calls" stackId="a" fill="#a4de6c" name="Calls" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Profit Metrics */}
                    <div className="chart-card">
                        <h2>Profit Metrics</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={financialData.profitMetrics.monthly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" yAxisId="left" />
                                <Bar dataKey="costs" fill="#82ca9d" name="Costs" yAxisId="left" />
                                <Line type="monotone" dataKey="margin" stroke="#ff7300" name="Profit Margin %" yAxisId="right" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Refunds Analysis */}
                    <div className="chart-card">
                        <h2>Refunds Analysis</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={financialData.refunds.byReason}
                                    dataKey="count"
                                    nameKey="reason"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {financialData.refunds.byReason.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Withdrawal Payouts */}
                    <div className="chart-card">
                        <h2>Withdrawal Payouts</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialData.withdrawalPayouts} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill="#8884d8" name="Payout Amount" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ViewPaymentFinancial;