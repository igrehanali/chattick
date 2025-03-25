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
      profilePic: "/avatars/default.png",
      email: "john@example.com",
      location: "United States",
      contest: "Summer Photo Contest",
      submissionDate: "2024-02-15",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "/avatars/default.png",
      email: "jane@example.com",
      location: "Canada",
      contest: "Summer Photo Contest",
      submissionDate: "2024-02-14",
      status: "Approved",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContestants = contestants.filter((contestant) =>
    contestant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contestant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contestant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contestant.contest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add these handler functions
  const handleApprove = (id) => {
    setContestants(
      contestants.map((c) =>
        c.id === id ? { ...c, status: "Approved" } : c
      )
    );
  };

  const handleDisapprove = (id) => {
    setContestants(
      contestants.map((c) =>
        c.id === id ? { ...c, status: "Disapproved" } : c
      )
    );
  };

  const handleSuspend = (id) => {
    setContestants(
      contestants.map((c) =>
        c.id === id ? { ...c, status: "Suspended" } : c
      )
    );
  };

  // Update the table structure
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
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contest</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContestants.map((contestant) => (
              <tr key={contestant.id}>
                <td>
                  <img
                    src={contestant.profilePic}
                    alt={contestant.name}
                    className={styles.profilePic}
                  />
                </td>
                <td>{contestant.name}</td>
                <td>{contestant.email}</td>
                <td>{contestant.location}</td>
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
                      disabled={contestant.status === "Approved" || contestant.status === "Suspended"}
                    >
                      <CheckCircle className={styles.actionIcon} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDisapprove(contestant.id)}
                      disabled={contestant.status === "Disapproved" || contestant.status === "Suspended"}
                    >
                      <XCircle className={styles.actionIcon} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuspend(contestant.id)}
                      disabled={contestant.status === "Suspended"}
                    >
                      Block
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