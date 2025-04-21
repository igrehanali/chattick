import React, { useState } from "react";
import styles from "../management.module.css";

const ProcessPayment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // ----> Payment Data <----
  const paymentTable = [
    {
      HDID: 'TXN910',
      name: "ABCD",
      email: "abcd@gmail.com",
      amount: "$1500",
      date: new Date(),
      paymentMethod: "Bank",
      subscriptionType: "Basic",
      status: "Pending",
      action: "Active",
    },
    {
      HDID: 'TXN678',
      name: "EFGH",
      email: "efgh@gmail.com",
      amount: "$1000",
      date: new Date(),
      paymentMethod: "Wallet",
      subscriptionType: "Premium",
      status: "Successful",
      action: "Blocked",
    },
    {
      HDID: 'TXN456',
      name: "IJKL",
      email: "IJKL@gmail.com",
      amount: "$500",
      date: new Date(),
      paymentMethod: "Bank",
      subscriptionType: "Basic",
      status: "Pending",
      action: "Active",
    },
    {
      HDID: 'TXN123',
      name: "LMNO",
      email: "LMNO@gmail.com",
      amount: "$7000",
      date: new Date(),
      paymentMethod: "Wallet",
      subscriptionType: "Premium",
      status: "Successful",
      action: "Blocked",
    },
  ];

  // ----> SearchBar Filter Functionality <----
  const filteredData = paymentTable.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.HDID.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.amount.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.paymentMethod.toLowerCase().includes(query) ||
      item.subscriptionType.toLowerCase().includes(query) ||
      item.action.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* ----> Search Bar  <---- */}
      <div className={styles.searchBar}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Search payment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* ----> Payment Process Table <---- */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {/* ----> Table Head <---- */}
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>HDID</th>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Email</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Date</th>
              <th className={styles.tableHeaderCell}>Payment Method</th>
              <th className={styles.tableHeaderCell}>Subscription Type</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          {/* ----> Table Body <---- */}
          <tbody className={styles.tableBody}>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.HDID}</td>
                  <td className={styles.tableCell}>{item.name}</td>
                  <td className={styles.tableCell}>{item.email}</td>
                  <td className={styles.tableCell}>{item.amount}</td>
                  <td className={styles.tableCell}>{item.date.toLocaleString()}</td>
                  <td className={styles.tableCell}>{item.paymentMethod}</td>
                  <td className={styles.tableCell}>{item.subscriptionType}</td>
                  <td className={styles.tableCell}>{item.status}</td>
                  <td className={styles.tableCell}>{item.action}</td>
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
