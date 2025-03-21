"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Plus, Minus, History, Trophy } from "lucide-react";
import styles from "../page.module.css";

export default function CreditsList() {
  const [credits, setCredits] = useState([
    {
      id: 1,
      hdid: "HD123456",
      user: "John Doe",
      credits: 100,
      lastUpdated: "2024-02-15",
      status: "Active",
      pointLogs: [
        {
          id: 1,
          type: "add",
          amount: 50,
          reason: "Contest Winner",
          date: "2024-02-15",
        },
        {
          id: 2,
          type: "deduct",
          amount: 20,
          reason: "Contest Entry",
          date: "2024-02-14",
        },
      ],
      contestLogs: [
        {
          id: 1,
          contestName: "Spring Contest",
          status: "Completed",
          result: "Winner",
          date: "2024-02-15",
        },
        {
          id: 2,
          contestName: "Winter Contest",
          status: "Cancelled",
          result: "-",
          date: "2024-02-10",
        },
      ],
    },
    {
      id: 2,
      hdid: "HD789012",
      user: "Jane Smith",
      credits: 50,
      lastUpdated: "2024-02-14",
      status: "Active",
      pointLogs: [
        {
          id: 1,
          type: "add",
          amount: 30,
          reason: "Contest Runner-up",
          date: "2024-02-14",
        },
        {
          id: 2,
          type: "deduct",
          amount: 10,
          reason: "Contest Entry",
          date: "2024-02-13",
        },
      ],
      contestLogs: [
        {
          id: 1,
          contestName: "Spring Contest",
          status: "Completed",
          result: "Runner-up",
          date: "2024-02-14",
        },
      ],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPointModal, setShowPointModal] = useState(false);
  const [pointAction, setPointAction] = useState({
    type: "add",
    amount: 0,
    reason: "",
  });

  const filteredCredits = credits.filter(
    (credit) =>
      credit.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      credit.hdid.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePointAction = (user, type) => {
    setSelectedUser(user);
    setPointAction({ ...pointAction, type });
    setShowPointModal(true);
  };

  const handlePointSubmit = () => {
    // Here you would implement the actual point modification logic
    setShowPointModal(false);
    setSelectedUser(null);
    setPointAction({ type: "add", amount: 0, reason: "" });
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          {/* <Search className={styles.searchIcon} /> */}
          <input
            type="text"
            placeholder="Search credits..."
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
              <th>Credits</th>
              <th>Last Updated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCredits.map((credit) => (
              <React.Fragment key={credit.id}>
                <tr>
                  <td>{credit.hdid}</td>
                  <td>{credit.user}</td>
                  <td>{credit.credits}</td>
                  <td>{credit.lastUpdated}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[credit.status.toLowerCase()]
                      }`}
                    >
                      {credit.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePointAction(credit, "add")}
                        title="Add Points"
                      >
                        <Plus className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePointAction(credit, "deduct")}
                        title="Deduct Points"
                      >
                        <Minus className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(credit)}
                        title="View History"
                      >
                        <History className={styles.actionIcon} />
                      </Button>
                    </div>
                  </td>
                </tr>
                {selectedUser?.id === credit.id && (
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
                              {credit.pointLogs.map((log) => (
                                <tr key={log.id}>
                                  <td>{log.date}</td>
                                  <td>
                                    <span className={styles[log.type]}>
                                      {log.type === "add" ? "+" : "-"}
                                      {log.amount}
                                    </span>
                                  </td>
                                  <td>{log.amount}</td>
                                  <td>{log.reason}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className={styles.detailsSection}>
                          <h4>Contest Participation</h4>
                          <table className={styles.innerTable}>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Contest</th>
                                <th>Status</th>
                                <th>Result</th>
                              </tr>
                            </thead>
                            <tbody>
                              {credit.contestLogs.map((log) => (
                                <tr key={log.id}>
                                  <td>{log.date}</td>
                                  <td>{log.contestName}</td>
                                  <td>
                                    <span
                                      className={
                                        styles[log.status.toLowerCase()]
                                      }
                                    >
                                      {log.status}
                                    </span>
                                  </td>
                                  <td>{log.result}</td>
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

      {showPointModal && selectedUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>
              {pointAction.type === "add" ? "Add Points" : "Deduct Points"}
            </h3>
            <div className={styles.modalForm}>
              <input
                type="number"
                placeholder="Amount"
                value={pointAction.amount}
                onChange={(e) =>
                  setPointAction({
                    ...pointAction,
                    amount: parseInt(e.target.value),
                  })
                }
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Reason"
                value={pointAction.reason}
                onChange={(e) =>
                  setPointAction({ ...pointAction, reason: e.target.value })
                }
                className={styles.input}
              />
              <div className={styles.modalActions}>
                <Button onClick={handlePointSubmit}>Submit</Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowPointModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
