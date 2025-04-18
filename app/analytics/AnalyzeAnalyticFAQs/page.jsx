"use client";

import { AdminLayout } from '@/app/components/layout/admin-layout'
import React, { useState, useEffect } from 'react'
import './style.css'
import { MetricCard } from '@/app/dashboard/components/MetricCard';
import { FaqsData } from '@/app/dashboard/utils/metrics';

function AnalyzeAnalyticFAQs() {

  const AnalyticsData = [
    {
      id: 1,
      title: "How to reset password?",
      views: 320,
      likes: 45,
      dislikes: 3,
      avgTime: "00:54",
      expanded: 150,
      lastAccessed: "2025-04-17",
    },
    {
      id: 2,
      title: "How to change email address?",
      views: 270,
      likes: 30,
      dislikes: 2,
      avgTime: "05:29",
      expanded: 120,
      lastAccessed: "2025-04-16",
    },
    {
      id: 3,
      title: "How to the video Work?",
      views: 730,
      likes: 130,
      dislikes: 127,
      avgTime: "03:01",
      expanded: 200,
      lastAccessed: "2025-04-19",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(AnalyticsData);

  

  useEffect(() => {
    const filtered = AnalyticsData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  return (
    <AdminLayout>
      <div className="analytics-container">
        <h1>Analytic FAQs</h1>

        <div className='FAQ_Cards'>
          {FaqsData.map((metric) => (
            <MetricCard key={metric.name} {...metric} />
          ))}
        </div>

        <div className='searchBar'>
          <input type="text"
            placeholder='Search FAQs..'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='tableContainer'>
          <table className='table'>
            {/* ----> Table Head <---- */}
            <thead className='tableHeader'>
              <tr>
                <th className='tableHeaderCell'>Post Title</th>
                <th className='tableHeaderCell'>Views</th>
                <th className='tableHeaderCell'>Likes</th>
                <th className='tableHeaderCell'>Dislikes</th>
                <th className='tableHeaderCell'>Avg. Time</th>
                <th className='tableHeaderCell'>Expanded</th>
                <th className='tableHeaderCell'>Last Accessed</th>
              </tr>
            </thead>
            {/* ----> Table Body <---- */}
            <tbody className='tableBody'>
              {filteredData.map((faq) => (
                <tr key={faq.id} className='tablerow'>
                  <td className='tableCell'>{faq.title}</td>
                  <td className='tableCell'>{faq.views}</td>
                  <td className='tableCell'>{faq.likes}</td>
                  <td className='tableCell'>{faq.dislikes}</td>
                  <td className='tableCell'>{faq.avgTime}</td>
                  <td className='tableCell'>{faq.expanded}</td>
                  <td className='tableCell'>{faq.lastAccessed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  )
}

export default AnalyzeAnalyticFAQs