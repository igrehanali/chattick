"use client";

import React, { useState } from "react";
import "./Activity.css";

const Activity = () => {
  // Mock Activity Logs
  const [logs, setLogs] = useState([
    {
      id: 1,
      username: "admin_john",
      action: "User Deactivation",
      timestamp: "2025-03-17 10:30:15",
      ip: "192.168.1.10",
    },
    {
      id: 2,
      username: "admin_mary",
      action: "Subscription Override",
      timestamp: "2025-03-17 11:05:42",
      ip: "192.168.1.25",
    },
    {
      id: 3,
      username: "admin_sam",
      action: "Role Assignment",
      timestamp: "2025-03-17 12:15:30",
      ip: "192.168.1.40",
    },
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    username: "",
    action: "",
    date: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    return (
      (filters.username === "" || log.username.includes(filters.username)) &&
      (filters.action === "" || log.action.includes(filters.action)) &&
      (filters.date === "" || log.timestamp.startsWith(filters.date))
    );
  });

  return (
    <div className="activity-container">
      <div className="activity-card">
        <h2 className="activity-title">Admin Activity Logs</h2>
        <p className="activity-description">
          Track all admin actions with timestamps, IP addresses, and event
          types. Use filters to search logs.
        </p>

        {/* Filters Section */}
        <div className="filters">
          <input
            type="text"
            name="username"
            placeholder="Search by Username"
            value={filters.username}
            onChange={handleChange}
            className="filter-input"
          />
          <input
            type="text"
            name="action"
            placeholder="Search by Event Type"
            value={filters.action}
            onChange={handleChange}
            className="filter-input"
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        {/* Activity Logs Table */}
        <table className="activity-table">
          <thead>
            <tr>
              <th>Admin Username</th>
              <th>Action</th>
              <th>Timestamp</th>
              <th>IP Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.username}</td>
                  <td>{log.action}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.ip}</td>
                  <td>
                    <button
                      className="revoke-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to revoke access for ${log.username}?`
                          )
                        ) {
                          // In production, this would make an API call
                          setLogs((prevLogs) =>
                            prevLogs.filter((l) => l.id !== log.id)
                          );
                          alert(`Access revoked for ${log.username}`);
                        }
                      }}
                    >
                      Revoke Access
                    </button>
                    <button
                      className="investigate-btn"
                      onClick={() => {
                        // In production, this would open a detailed investigation view
                        alert(
                          `Investigating activity:\n\nUser: ${log.username}\nAction: ${log.action}\nTime: ${log.timestamp}\nIP: ${log.ip}`
                        );
                      }}
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
