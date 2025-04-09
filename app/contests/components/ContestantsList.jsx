"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import styles from "../page.module.css";
import { contestantsService } from "@/lib/services/contestants-service";
import toast from "react-hot-toast";

export default function ContestantsList() {
  const [loading, setLoading] = useState(true);
  const [contestants, setContestants] = useState([
    {
      id: 1,
      name: "John Doe",
      profilePic: "/avatars/default.png",
      email: "john@example.com",
      location: "United States",
      contest: "Summer Photo Contest",
      submissionDate: new Date("2024-02-15").getTime(),
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "/avatars/default.png",
      email: "jane@example.com",
      location: "Canada",
      contest: "Summer Photo Contest",
      submissionDate: new Date("2024-02-14").getTime(),
      status: "Approved",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContestants = contestants.filter(
    (contestant) =>
      contestant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contestant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contestant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contestant.contest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add these handler functions
  useEffect(() => {
    loadContestants();
  }, []);

  const loadContestants = async () => {
    try {
      const contestantsData = await contestantsService.getAllContestants();
      setContestants(contestantsData);
    } catch (error) {
      toast.error("Failed to load contestants");
      console.error("Error loading contestants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const loadingToast = toast.loading("Approving contestant...");
    try {
      await contestantsService.updateContestantStatus(id, "Approved");
      setContestants(
        contestants.map((c) => (c.id === id ? { ...c, status: "Approved" } : c))
      );
      toast.success("Contestant approved successfully", { id: loadingToast });
    } catch (error) {
      console.error("Error approving contestant:", error);
      toast.error("Failed to approve contestant", { id: loadingToast });
    }
  };

  const handleDisapprove = async (id) => {
    const loadingToast = toast.loading("Disapproving contestant...");
    try {
      await contestantsService.updateContestantStatus(id, "Disapproved");
      setContestants(
        contestants.map((c) =>
          c.id === id ? { ...c, status: "Disapproved" } : c
        )
      );
      toast.success("Contestant disapproved successfully", {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Error disapproving contestant:", error);
      toast.error("Failed to disapprove contestant", { id: loadingToast });
    }
  };

  const handleSuspend = async (id) => {
    const loadingToast = toast.loading("Suspending contestant...");
    try {
      await contestantsService.updateContestantStatus(id, "Suspended");
      setContestants(
        contestants.map((c) =>
          c.id === id ? { ...c, status: "Suspended" } : c
        )
      );
      toast.success("Contestant suspended successfully", { id: loadingToast });
    } catch (error) {
      console.error("Error suspending contestant:", error);
      toast.error("Failed to suspend contestant", { id: loadingToast });
    }
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

      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.loadingSpinner} />
          <p>Loading contestants, please wait...</p>
        </div>
      ) : filteredContestants.length === 0 ? (
        <p className={styles.noContestantsMessage}>No contestants found.</p>
      ) : (
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
                  <td>
                    {new Date(contestant.submissionDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[contestant.status.toLowerCase()]
                      }`}
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
                        disabled={
                          contestant.status === "Approved" ||
                          contestant.status === "Suspended"
                        }
                      >
                        <CheckCircle className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisapprove(contestant.id)}
                        disabled={
                          contestant.status === "Disapproved" ||
                          contestant.status === "Suspended"
                        }
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
      )}
    </div>
  );
}
