"use client";

import React, { useState, useEffect } from "react";
import { adminService } from "@/lib/services/admin-service";
import "./Activity.css";
import { toast } from "react-hot-toast";

const Activity = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters
  const [filters, setFilters] = useState({
    username: "",
    action: "",
    date: "",
  });

  useEffect(() => {
    loadActivityLogs();
  }, [filters]);

  const loadActivityLogs = async () => {
    try {
      setLoading(true);
      const activityLogs = await adminService.getActivityLogs(filters);
      setLogs(activityLogs);
      setError(null);
    } catch (err) {
      setError("Failed to load activity logs");
      console.error("Error loading activity logs:", err);
      toast.error("Failed to load activity logs", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    if (timestamp.seconds) {
      // Handle Firestore Timestamp
      return new Date(timestamp.seconds * 1000).toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading activity logs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const filteredLogs = logs.filter((log) => {
    const matchUsername =
      log.username?.toLowerCase().includes(filters.username.toLowerCase()) ||
      !filters.username;
    const matchAction =
      log.action?.toLowerCase().includes(filters.action.toLowerCase()) ||
      !filters.action;
    const matchDate =
      !filters.date ||
      (log.timestamp &&
        new Date(log.timestamp.seconds * 1000).toLocaleDateString() ===
          new Date(filters.date).toLocaleDateString());
    return matchUsername && matchAction && matchDate;
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
                  <td>{formatTimestamp(log.timestamp)}</td>
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
                          toast.success(`Access revoked for ${log.username}`);
                        }
                      }}
                    >
                      Revoke Access
                    </button>
                    <button
                      className="investigate-btn"
                      onClick={() => {
                        // In production, this would open a detailed investigation view
                        toast(
                          `Investigating activity for user: ${log.username}`,
                          {
                            icon: "🔍",
                          }
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
