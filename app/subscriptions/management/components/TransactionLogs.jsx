import React, { useState } from 'react'
import styles from "../management.module.css";
import { Button } from '@/app/components/ui/button';

const TransactionLogs = () => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ----> Transaction Data <----
  const logs = [
    {
      id: `TXN${Math.floor(Math.random() * 10000)}`,
      type: "Withdrawal",
      customer: "John Doe",
      status: "Success",
      amount: "$250.00",
      performedBy: "Staff",
      timestamp: "2025-04-18 10:32 AM",
      trace: "TXN started > Verification passed > Amount debited",
      logs: ["Event: Withdraw initiated", "Retry: 0", "Error: None"],
      notes: "Processed successfully without issues.",
    },
    {
      id: `TXN${Math.floor(Math.random() * 10000)}`,
      type: "Deposit",
      customer: "Jane Smith",
      status: "Failed",
      amount: "$500.00",
      performedBy: "Customer",
      timestamp: "2025-04-18 09:21 AM",
      trace: "TXN started > Verification failed",
      logs: ["Event: Deposit initiated", "Retry: 1", "Error: Card declined"],
      notes: "Card expired. Customer notified.",
    },
    {
      id: `TXN${Math.floor(Math.random() * 10000)}`,
      type: "Transfer",
      customer: "Alice Lee",
      status: "Pending",
      amount: "$1000.00",
      performedBy: "Auto",
      timestamp: "2025-04-18 11:45 AM",
      trace: "TXN started > Awaiting bank response",
      logs: ["Event: Transfer pending", "Retry: 0", "Error: None"],
      notes: "Auto-processing. Review after 24h.",
    },
  ];

  // ----> Search Filter <----
  const filteredLogs = logs.filter((log) => {
    const search = searchTerm.toLowerCase();
    return (
      log.id.toLowerCase().includes(search) ||
      log.type.toLowerCase().includes(search) ||
      log.customer.toLowerCase().includes(search) ||
      log.status.toLowerCase().includes(search) ||
      log.amount.toLowerCase().includes(search) ||
      log.performedBy.toLowerCase().includes(search)
    );
  });

  // ----> Status Control function <----
  const getStatusClass = (status) => {
    if (status === "Success") return styles.successBadge;
    if (status === "Failed") return styles.failedBadge;
    if (status === "Pending") return styles.pendingBadge;
    return "";
  };

  return (
    <div>
      {/* ----> Search Bar <---- */}
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.Input}
          placeholder="Search Transaction Logs..."
        />
      </div>

      {/* ----> Transaction Logs Table <---- */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>

          {/* ----> Table Head <---- */}
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Transaction ID</th>
              <th className={styles.tableHeaderCell}>Type</th>
              <th className={styles.tableHeaderCell}>Customer</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Performed By</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>

          {/* ----> Table Body <---- */}
          <tbody className={styles.tableBody}>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{log.id}</td>
                  <td className={styles.tableCell}>{log.type}</td>
                  <td className={styles.tableCell}>{log.customer}</td>
                  <td>
                    <span className={getStatusClass(log.status)}>{log.status}</span>
                  </td>
                  <td className={styles.tableCell}>{log.amount}</td>
                  <td className={styles.tableCell}>{log.performedBy}</td>
                  <td className={styles.tableCell}>
                    <Button
                      className={styles.viewBtn}
                      onClick={() => setSelectedLog(log)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles.tableCell} colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ----> View Detail Popup Modal  <---- */}
      {selectedLog && (
        <div className={styles.modalOverlay} onClick={() => setSelectedLog(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Transaction Details - {selectedLog.id}</h2>
            <p><strong>Type:</strong> {selectedLog.type}</p>
            <p><strong>Customer:</strong> {selectedLog.customer}</p>
            <p><strong>Timestamp:</strong> {selectedLog.timestamp}</p>
            <p><strong>Trace:</strong> {selectedLog.trace}</p>
            <p ><strong>System Logs:</strong></p>
            <ul className={styles.systemLogs}>
              {selectedLog.logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
            <p><strong>Staff Notes:</strong> {selectedLog.notes}</p>
            <Button className={styles.closeBtn} onClick={() => setSelectedLog(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionLogs