import React, { useState } from "react";
import styles from "../management.module.css";

const ProcessPayment = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const paymentTable = [
    {
      name: "ABCD",
      email: "abcd@gmail.com",
      amount: "$1500",
      paymentMethod: {
        bank: "Bank",
        wallet: "Wallet",
      },
      SubscriptionType: {
        free: "Free",
        basic: "Basic",
        premium: "Premium",
      },
      status: {
        failed: "Failed",
        pending: "Pending",
        success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
    {
      name: "EFGH",
      email: "efgh@gmail.com",
      amount: "$1000",
      paymentMethod: {
        bank: "Bank",
        wallet: "Wallet",
      },
      SubscriptionType: {
        free: "Free",
        basic: "Basic",
        premium: "Premium",
      },
      status: {
        failed: "Failed",
        pending: "Pending",
        success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
  ];

  const filteredData = paymentTable.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.amount.toLowerCase().includes(query) ||
      Object.values(item.status).some((status) =>
        status.toLowerCase().includes(query)
      ) ||
      Object.values(item.paymentMethod).some((method) =>
        method.toLowerCase().includes(query)
      ) ||
      Object.values(item.SubscriptionType).some((type) =>
        type.toLowerCase().includes(query)
      ) ||
      Object.values(item.action).some((act) =>
        act.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Search payment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Email</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Payment Method</th>
              <th className={styles.tableHeaderCell}>Subscription Type</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.name}</td>
                  <td className={styles.tableCell}>{item.email}</td>
                  <td className={styles.tableCell}>{item.amount}</td>
                  <td className={styles.tableCell}>
                    {Object.values(item.paymentMethod).join(", ")}
                  </td>
                  <td className={styles.tableCell}>
                    {Object.values(item.SubscriptionType).join(", ")}
                  </td>
                  <td className={styles.tableCell}>
                    {Object.values(item.status).join(", ")}
                  </td>
                  <td className={styles.tableCell}>
                    {Object.values(item.action).join(", ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles.tableCell} colSpan="7" style={{ textAlign: "center" }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessPayment;
