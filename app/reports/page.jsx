"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, Check, Edit2, Trash2, Plus } from "lucide-react";
import styles from "./page.module.css";
import { AdminLayout } from "../components/layout/admin-layout";
import { Button } from "../components/ui/button";

const initialReportCategories = [
  { id: 1, name: "Harassment" },
  { id: 2, name: "Spam" },
  { id: 3, name: "Bug Report" },
  { id: 4, name: "Inappropriate Content" },
];

const initialReportedChats = [
  {
    id: 1,
    reportingUserHDID: "HD123",
    reportedUserHDID: "HD456",
    category: "Harassment",
    chatLog: "This user has been sending threatening messages.",
    timestamp: "2024-01-20T10:30:00Z",
    status: "pending",
    actionHistory: [],
  },
  {
    id: 2,
    reportingUserHDID: "HD789",
    reportedUserHDID: "HD101",
    category: "Spam",
    chatLog:
      "User keeps sending promotional links and unsolicited advertisements.",
    timestamp: "2024-01-20T11:45:00Z",
    status: "pending",
    actionHistory: [],
  },
  {
    id: 3,
    reportingUserHDID: "HD202",
    reportedUserHDID: "HD303",
    category: "Inappropriate Content",
    chatLog: "This user shared explicit content in a public chat room.",
    timestamp: "2024-01-20T12:15:00Z",
    status: "resolved",
    actionHistory: ["User received warning on 2024-01-20T12:30:00Z"],
    action: "warning",
  },
  {
    id: 4,
    reportingUserHDID: "HD404",
    reportedUserHDID: "HD505",
    category: "Bug Report",
    chatLog:
      "Chat messages are not being delivered and showing error code 500.",
    timestamp: "2024-01-20T13:20:00Z",
    status: "pending",
    actionHistory: [],
  },
  {
    id: 5,
    reportingUserHDID: "HD606",
    reportedUserHDID: "HD707",
    category: "Harassment",
    chatLog: "User is making discriminatory remarks and using hate speech.",
    timestamp: "2024-01-20T14:00:00Z",
    status: "resolved",
    actionHistory: ["User blocked on 2024-01-20T14:30:00Z"],
    action: "block",
  },
];

export default function ReportsPage() {
  const [reportCategories, setReportCategories] = useState(
    initialReportCategories
  );
  const [reportedChats, setReportedChats] = useState(initialReportedChats);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: newCategoryName.trim(),
      };
      setReportCategories([...reportCategories, newCategory]);
      setNewCategoryName("");
      // TODO: API call to save new category
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  const handleUpdateCategory = () => {
    if (newCategoryName.trim() && editingCategory) {
      setReportCategories(
        reportCategories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: newCategoryName.trim() }
            : cat
        )
      );
      setEditingCategory(null);
      setNewCategoryName("");
      // TODO: API call to update category
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setReportCategories(
      reportCategories.filter((cat) => cat.id !== categoryId)
    );
    // TODO: API call to delete category
  };

  const handleResolveReport = (reportId, action) => {
    setReportedChats(
      reportedChats.map((report) =>
        report.id === reportId
          ? { ...report, status: "resolved", action }
          : report
      )
    );
    // TODO: API call to update report status and action
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <section className={styles.categorySection}>
          <h2>Report Categories</h2>
          <div className={styles.categoryForm}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className={styles.input}
            />
            {editingCategory ? (
              <button onClick={handleUpdateCategory} className={styles.button}>
                Update Category
              </button>
            ) : (
              <Button onClick={handleAddCategory}>
                <Plus size={16} /> Add Category
              </Button>
            )}
          </div>
          <div className={styles.categoriesList}>
            {reportCategories.map((category) => (
              <div key={category.id} className={styles.categoryItem}>
                <span>{category.name}</span>
                <div className={styles.categoryActions}>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className={styles.iconButton}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className={styles.iconButton}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.reportsSection}>
          <h2>Reported Chats</h2>
          <div className={styles.tableContainer}>
            <table className={styles.reportsTable}>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Reporting HDID</th>
                  <th>Reported HDID</th>
                  <th>Chat Log</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportedChats.map((report) => (
                  <tr
                    key={report.id}
                    className={
                      report.status === "resolved" ? styles.resolvedRow : ""
                    }
                  >
                    <td>
                      {report.status === "resolved" ? (
                        <div className={styles.resolvedStatus}>
                          <Check className={styles.checkIcon} />
                          <span>Resolved</span>
                        </div>
                      ) : (
                        <AlertTriangle className={styles.alertIcon} />
                      )}
                    </td>
                    <td>{report.category}</td>
                    <td>{report.reportingUserHDID}</td>
                    <td>{report.reportedUserHDID}</td>
                    <td className={styles.chatLogCell}>{report.chatLog}</td>
                    <td>{new Date(report.timestamp).toLocaleString()}</td>
                    <td>
                      {report.status === "pending" ? (
                        <div className={styles.tableActions}>
                          <button
                            onClick={() =>
                              handleResolveReport(report.id, "warning")
                            }
                            className={`${styles.actionButton} ${styles.warningButton}`}
                            title="Issue Warning"
                          >
                            Warn
                          </button>
                          <button
                            onClick={() =>
                              handleResolveReport(report.id, "restrict")
                            }
                            className={`${styles.actionButton} ${styles.restrictButton}`}
                            title="Restrict User"
                          >
                            Restrict
                          </button>
                          <button
                            onClick={() =>
                              handleResolveReport(report.id, "block")
                            }
                            className={`${styles.actionButton} ${styles.blockButton}`}
                            title="Block User"
                          >
                            Block
                          </button>
                          <button
                            onClick={() =>
                              handleResolveReport(report.id, "dismiss")
                            }
                            className={`${styles.actionButton} ${styles.dismissButton}`}
                            title="Dismiss Report"
                          >
                            Dismiss
                          </button>
                        </div>
                      ) : (
                        <span className={styles.actionTaken}>
                          Action: {report.action}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
