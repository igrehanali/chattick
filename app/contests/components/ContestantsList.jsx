"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, CheckCircle, XCircle } from "lucide-react";
import styles from "../page.module.css";

export default function ContestantsList() {
  const [contestants, setContestants] = useState([
    {
      id: 1,
      name: "John Doe",
      contest: "Summer Photo Contest",
      submissionDate: "2024-02-15",
      status: "Reject",
    },
    {
      id: 2,
      name: "Jane Smith",
      contest: "Summer Photo Contest",
      submissionDate: "2024-02-14",
      status: "Approved",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContestants = contestants.filter((contestant) =>
    contestant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id) => {
    setContestants(
      contestants.map((c) =>
        c.id === id ? { ...c, status: "Approved" } : c
      )
    );
  };

  const handleReject = (id) => {
    setContestants(
      contestants.map((c) =>
        c.id === id ? { ...c, status: "Rejected" } : c
      )
    );
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          {/* <Search className={styles.searchIcon} /> */}
          <input
            type="text"
            placeholder="Search contestants..."
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
              <th>Name</th>
              <th>Contest</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContestants.map((contestant) => (
              <tr key={contestant.id}>
                <td>{contestant.name}</td>
                <td>{contestant.contest}</td>
                <td>{contestant.submissionDate}</td>
                <td>
                  <span
                    className={`${styles.status} ${styles[contestant.status.toLowerCase()]}`}
                  >
                    {contestant.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApprove(contestant.id)}
                      disabled={contestant.status === "Approved"}
                    >
                      <CheckCircle className={styles.actionIcon} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReject(contestant.id)}
                      disabled={contestant.status === "Rejected"}
                    >
                      <XCircle className={styles.actionIcon} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}