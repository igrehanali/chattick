"use client";
import { AdminLayout } from "../../components/layout/admin-layout";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell
} from "recharts";
import { useState, useEffect } from "react";
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ContestParticipationGifts = () => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedPlan, setSelectedPlan] = useState("All");
    const [countries, setCountries] = useState([]);

    // Fetch countries
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
        contestParticipation: [
            { month: "Jan", participants: 1200, avgEntriesPerUser: 3.5 },
            { month: "Feb", participants: 1500, avgEntriesPerUser: 4.2 },
            { month: "Mar", participants: 1350, avgEntriesPerUser: 3.8 }
        ],
        countryParticipation: [
            { country: "USA", participants: 500 },
            { country: "UK", participants: 300 },
            { country: "India", participants: 450 },
            { country: "Canada", participants: 250 },
            { country: "Australia", participants: 200 }
        ],
        contestMetrics: [
            { month: "Jan", avgWinningPoints: 250, avgWinners: 15 },
            { month: "Feb", avgWinningPoints: 280, avgWinners: 18 },
            { month: "Mar", avgWinningPoints: 265, avgWinners: 16 }
        ],
        giftMetrics: {
            avgGiftsPerUser: [
                { month: "Jan", count: 4.5 },
                { month: "Feb", count: 5.2 },
                { month: "Mar", count: 4.8 }
            ],
            popularGifts: [
                { name: "Virtual Card", count: 1500 },
                { name: "Digital Sticker", count: 1200 },
                { name: "Premium Badge", count: 800 },
                { name: "Custom Emoji", count: 600 },
                { name: "Profile Frame", count: 400 }
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


    const planTypes = ["All", "Basic", "Premium", "Enterprise"];

    return (
        <AdminLayout>
            <div className="analytics-container">
                <h1>Contest Participation & Gifts Analytics</h1>

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

                <div className="charts-grid">
                    {/* Contest Participation Trends */}
                    <div className="chart-card">
                        <h2>Contest Participation Trends</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analyticsData.contestParticipation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="participants" stroke="#8884d8" name="Total Participants" />
                                <Line type="monotone" dataKey="avgEntriesPerUser" stroke="#82ca9d" name="Avg Entries/User" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Country Participation Distribution */}
                    <div className="chart-card">
                        <h2>Country Participation Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData.countryParticipation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="country" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="participants" fill="#8884d8" name="Participants" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Contest Performance Metrics */}
                    <div className="chart-card">
                        <h2>Contest Performance Metrics</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analyticsData.contestMetrics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="avgWinningPoints" stroke="#8884d8" name="Avg Winning Points" />
                                <Line type="monotone" dataKey="avgWinners" stroke="#82ca9d" name="Avg Winners" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Average Gifts per User */}
                    <div className="chart-card">
                        <h2>Average Gifts per User</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData.giftMetrics.avgGiftsPerUser} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" name="Avg Gifts/User" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Popular Gifts Distribution */}
                    <div className="chart-card">
                        <h2>Popular Gifts Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <Pie
                                    data={analyticsData.giftMetrics.popularGifts}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {analyticsData.giftMetrics.popularGifts.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default ContestParticipationGifts;