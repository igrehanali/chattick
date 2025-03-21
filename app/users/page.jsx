"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Button } from "@/app/components/ui/button";
import { Users as UsersIcon, Plus, Search, Lock, MapPin } from "lucide-react";
import Link from "next/link";
import styles from "./users.module.css";

const initialUsers = [
  {
    hdid: "HD001",
    subscriptionStatus: "Active",
    activePlan: "Premium",
    subscriptionStartDate: "2024-02-01",
    subscriptionEndDate: "2025-02-01",
    joinDate: "2024-01-15",
    pointsBalanceEncrypted: "********",
    failedTransactions: 0,
  },
  {
    hdid: "HD002",
    subscriptionStatus: "Active",
    activePlan: "Basic",
    subscriptionStartDate: "2024-03-05",
    subscriptionEndDate: "2025-03-05",
    joinDate: "2024-01-10",
    pointsBalanceEncrypted: "********",
    failedTransactions: 2,
  },
  {
    hdid: "HD003",
    subscriptionStatus: "Blocked",
    activePlan: "Standard",
    subscriptionStartDate: "2024-01-20",
    subscriptionEndDate: "2025-01-20",
    joinDate: "2024-01-20",
    pointsBalanceEncrypted: "********",
    failedTransactions: 1,
  },
  {
    hdid: "HD004",
    subscriptionStatus: "Active",
    activePlan: "Premium",
    subscriptionStartDate: "2024-02-10",
    subscriptionEndDate: "2025-02-10",
    joinDate: "2024-01-12",
    pointsBalanceEncrypted: "********",
    failedTransactions: 0,
  },
  {
    hdid: "HD005",
    subscriptionStatus: "Blocked",
    activePlan: "Basic",
    subscriptionStartDate: "2023-12-15",
    subscriptionEndDate: "2024-12-15",
    joinDate: "2024-01-08",
    pointsBalanceEncrypted: "********",
    failedTransactions: 3,
  },
  {
    hdid: "HD006",
    subscriptionStatus: "Active",
    activePlan: "Standard",
    subscriptionStartDate: "2024-03-01",
    subscriptionEndDate: "2025-03-01",
    joinDate: "2024-01-18",
    pointsBalanceEncrypted: "********",
    failedTransactions: 0,
  },
  {
    hdid: "HD007",
    subscriptionStatus: "Active",
    activePlan: "Premium",
    subscriptionStartDate: "2024-01-25",
    subscriptionEndDate: "2025-01-25",
    joinDate: "2024-01-22",
    pointsBalanceEncrypted: "********",
    failedTransactions: 1,
  },
  {
    hdid: "HD008",
    subscriptionStatus: "Active",
    activePlan: "Standard",
    subscriptionStartDate: "2024-02-05",
    subscriptionEndDate: "2025-02-05",
    joinDate: "2024-01-05",
    pointsBalanceEncrypted: "********",
    failedTransactions: 0,
  },
  {
    hdid: "HD009",
    subscriptionStatus: "Blocked",
    activePlan: "Basic",
    subscriptionStartDate: "2023-11-30",
    subscriptionEndDate: "2024-11-30",
    joinDate: "2024-01-14",
    pointsBalanceEncrypted: "********",
    failedTransactions: 4,
  },
  {
    hdid: "HD010",
    subscriptionStatus: "Active",
    activePlan: "Premium",
    subscriptionStartDate: "2024-02-15",
    subscriptionEndDate: "2025-02-15",
    joinDate: "2024-01-25",
    pointsBalanceEncrypted: "********",
    failedTransactions: 0,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBlockUser = (userId) => {
    if (window.confirm("Are you sure you want to block this user?")) {
      setUsers(
        users.map((user) =>
          user.id === userId
            ? {
                ...user,
                status: user.status === "Active" ? "Blocked" : "Active",
              }
            : user
        )
      );
    }
  };

  const handleResetPassword = (userId) => {
    if (
      window.confirm("Are you sure you want to reset this user's password?")
    ) {
      // TODO: Implement password reset API call
      alert("Password reset email has been sent to the user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.hdid.includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>Users Management</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <div className={styles.searchIcon}>
                {/* <Search className="h-4 w-4 text-gray-400" /> */}
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>HDID</th>
                  <th className={styles.tableHeaderCell}>
                    Subscription Status
                  </th>
                  <th className={styles.tableHeaderCell}>Active Plan</th>
                  <th className={styles.tableHeaderCell}>Start Date</th>
                  <th className={styles.tableHeaderCell}>End Date</th>
                  <th className={styles.tableHeaderCell}>Join Date</th>
                  <th className={styles.tableHeaderCell}>Points Balance</th>
                  <th className={styles.tableHeaderCell}>
                    Failed Transactions
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {users.map((user) => (
                  <tr key={user.hdid}>
                    <td className={styles.tableCell}>{user.hdid}</td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.status} ${
                          user.subscriptionStatus === "Blocked"
                            ? styles.blocked
                            : ""
                        }`}
                      >
                        {user.subscriptionStatus}
                      </span>
                    </td>
                    <td className={styles.tableCell}>{user.activePlan}</td>
                    <td className={styles.tableCell}>
                      {user.subscriptionStartDate}
                    </td>
                    <td className={styles.tableCell}>
                      {user.subscriptionEndDate}
                    </td>
                    <td className={styles.tableCell}>{user.joinDate}</td>
                    <td className={styles.tableCell}>
                      <span className={styles.encrypted}>
                        {user.pointsBalanceEncrypted}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      {user.failedTransactions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
