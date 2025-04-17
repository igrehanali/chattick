"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Minus, History } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import styles from "../page.module.css";

export default function ContestCreditManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPointModal, setShowPointModal] = useState(false);
  const [pointAction, setPointAction] = useState({
    type: "add",
    amount: 0,
    reason: "",
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      hdid: "HD123456",
      name: "John Doe",
      points: 1000,
      lastUpdated: "2024-02-15",
      status: "Active",
      pointLogs: [
        {
          id: 1,
          type: "add",
          amount: 500,
          reason: "Contest Winner",
          date: "2024-02-15",
        },
        {
          id: 2,
          type: "deduct",
          amount: 200,
          reason: "Contest Entry",
          date: "2024-02-14",
        },
      ],
      contestLogs: [
        {
          id: 1,
          contestName: "Spring Photo Contest",
          status: "Completed",
          result: "Winner",
          date: "2024-02-15",
          pointsEarned: 500,
        },
        {
          id: 2,
          contestName: "Winter Art Contest",
          status: "Cancelled",
          result: "-",
          date: "2024-02-10",
          pointsRefunded: 200,
        },
      ],
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.hdid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePointAction = (user, type) => {
    setSelectedUser(user);
    setPointAction({ ...pointAction, type });
    setShowPointModal(true);
  };

  const handlePointSubmit = async () => {
    if (!selectedUser || !pointAction.amount || !pointAction.reason) return;

    try {
      // Here you would implement the actual point modification logic
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          const newPoints =
            pointAction.type === "add"
              ? user.points + Number(pointAction.amount)
              : user.points - Number(pointAction.amount);

          const newPointLog = {
            id: user.pointLogs.length + 1,
            type: pointAction.type,
            amount: Number(pointAction.amount),
            reason: pointAction.reason,
            date: new Date().toISOString().split("T")[0],
          };

          return {
            ...user,
            points: newPoints,
            lastUpdated: new Date().toISOString().split("T")[0],
            pointLogs: [newPointLog, ...user.pointLogs],
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setShowPointModal(false);
      setSelectedUser(null);
      setPointAction({ type: "add", amount: 0, reason: "" });
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by HDID or name..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>HDID</th>
              <th>User</th>
              <th>Points</th>
              <th>Last Updated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>{user.hdid}</td>
                  <td>{user.name}</td>
                  <td>{user.points}</td>
                  <td>{user.lastUpdated}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[user.status.toLowerCase()]
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePointAction(user, "add")}
                        title="Add Points"
                      >
                        <Plus className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePointAction(user, "deduct")}
                        title="Deduct Points"
                      >
                        <Minus className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                        title="View History"
                      >
                        <History className={styles.actionIcon} />
                      </Button>
                    </div>
                  </td>
                </tr>
                {selectedUser?.id === user.id && (
                  <tr>
                    <td colSpan="6">
                      <div className={styles.detailsPanel}>
                        <div className={styles.detailsSection}>
                          <h4>Point Logs</h4>
                          <table className={styles.innerTable}>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Reason</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.pointLogs.map((log) => (
                                <tr key={log.id}>
                                  <td>{log.date}</td>
                                  <td>{log.type}</td>
                                  <td>{log.amount}</td>
                                  <td>{log.reason}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className={styles.detailsSection}>
                          <h4>Contest Participation Logs</h4>
                          <table className={styles.innerTable}>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Contest</th>
                                <th>Status</th>
                                <th>Result</th>
                                <th>Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {user.contestLogs.map((log) => (
                                <tr key={log.id}>
                                  <td>{log.date}</td>
                                  <td>{log.contestName}</td>
                                  <td>{log.status}</td>
                                  <td>{log.result}</td>
                                  <td>
                                    {log.pointsEarned
                                      ? `+${log.pointsEarned}`
                                      : ""}
                                    {log.pointsRefunded
                                      ? `(${log.pointsRefunded} refunded)`
                                      : ""}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showPointModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>
              {pointAction.type === "add" ? "Add Points" : "Deduct Points"}
            </h3>
            <div className={styles.formGroup}>
              <label>Amount</label>
              <input
                type="number"
                value={pointAction.amount}
                onChange={(e) =>
                  setPointAction({ ...pointAction, amount: e.target.value })
                }
                min="0"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Reason</label>
              <input
                type="text"
                value={pointAction.reason}
                onChange={(e) =>
                  setPointAction({ ...pointAction, reason: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.modalActions}>
              <Button onClick={handlePointSubmit}>
                {pointAction.type === "add" ? "Add Points" : "Deduct Points"}
              </Button>
              <Button variant="ghost" onClick={() => setShowPointModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
