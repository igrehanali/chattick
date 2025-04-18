"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, Check, Edit2, Trash2, Plus } from "lucide-react";
import styles from "./page.module.css";
import { AdminLayout } from "../components/layout/admin-layout";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";

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
    chatLog: [
      {
        id: 1,
        sender: "HD456",
        message: "I will find you and make you regret this!",
        timestamp: "2024-01-20T10:25:00Z",
      },
      {
        id: 2,
        sender: "HD456",
        message: "You can't hide from me forever!",
        timestamp: "2024-01-20T10:28:00Z",
      },
    ],
    timestamp: "2024-01-20T10:30:00Z",
    status: "pending",
    actionHistory: [],
  },
  {
    id: 2,
    reportingUserHDID: "HD789",
    reportedUserHDID: "HD101",
    category: "Spam",
    chatLog: [
      {
        id: 1,
        sender: "HD101",
        message: "Buy now! Limited time offer: www.spam-link.com",
        timestamp: "2024-01-20T11:40:00Z",
      },
      {
        id: 2,
        sender: "HD101",
        message: "Don't miss out! Click here: www.another-spam.com",
        timestamp: "2024-01-20T11:42:00Z",
      },
    ],
    timestamp: "2024-01-20T11:45:00Z",
    status: "pending",
    actionHistory: [],
  },
  {
    id: 3,
    reportingUserHDID: "HD202",
    reportedUserHDID: "HD303",
    category: "Inappropriate Content",
    chatLog: [
      {
        id: 1,
        sender: "HD303",
        message: "[Explicit content removed]",
        timestamp: "2024-01-20T12:10:00Z",
      },
    ],
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
    chatLog: [
      {
        id: 1,
        sender: "HD505",
        message: "Error 500: Message failed to send",
        timestamp: "2024-01-20T13:15:00Z",
      },
      {
        id: 2,
        sender: "HD505",
        message: "System: Message delivery failed",
        timestamp: "2024-01-20T13:18:00Z",
      },
    ],
    timestamp: "2024-01-20T13:20:00Z",
    status: "pending",
    actionHistory: [],
  },
  {
    id: 5,
    reportingUserHDID: "HD606",
    reportedUserHDID: "HD707",
    category: "Harassment",
    chatLog: [
      {
        id: 1,
        sender: "HD707",
        message: "[Hate speech content removed]",
        timestamp: "2024-01-20T13:55:00Z",
      },
      {
        id: 2,
        sender: "HD707",
        message: "[Discriminatory content removed]",
        timestamp: "2024-01-20T13:58:00Z",
      },
    ],
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

  const [selectedChatLog, setSelectedChatLog] = useState(null);

  const handleViewChatLog = (report) => {
    setSelectedChatLog(report);
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
                  <th>Report ID</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Reporter ID</th>
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
                    <td>{report.id}</td>
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
                    <td className={styles.chatLogCell}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewChatLog(report)}
                        className={styles.viewLogButton}
                      >
                        View Log
                      </Button>
                    </td>
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
      {selectedChatLog && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedChatLog(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Chat Log Details</h3>
              <button
                onClick={() => setSelectedChatLog(null)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.chatLogInfo}>
                <div>
                  <strong>Report ID:</strong> {selectedChatLog?.id}
                </div>
                <div>
                  <strong>Category:</strong> {selectedChatLog?.category}
                </div>
                <div>
                  <strong>Reporter ID:</strong>{" "}
                  {selectedChatLog?.reportingUserHDID}
                </div>
                <div>
                  <strong>Reported User:</strong>{" "}
                  {selectedChatLog?.reportedUserHDID}
                </div>
                <div>
                  <strong>Timestamp:</strong>{" "}
                  {selectedChatLog &&
                    new Date(selectedChatLog.timestamp).toLocaleString()}
                </div>
              </div>
              <div className={styles.chatLogContent}>
                <h4>Reported Messages:</h4>
                <div className={styles.messageList}>
                  {selectedChatLog?.chatLog.map((message) => (
                    <div key={message.id} className={styles.messageItem}>
                      <div className={styles.messageHeader}>
                        <span className={styles.messageSender}>
                          {message.sender}
                        </span>
                        <span className={styles.messageTime}>
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className={styles.messageText}>
                        {message.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {selectedChatLog?.actionHistory.length > 0 && (
                <div className={styles.actionHistory}>
                  <h4>Action History:</h4>
                  <ul>
                    {selectedChatLog.actionHistory.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
