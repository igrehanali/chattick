import React from "react";
import styles from "../management.module.css";

const ProcessPayment = () => {
  const paymentDataHead = [
    "Customer Name",
    "Withdrawal Status",
    "Date Range",
    "Costumer Info",
    "Amount",
    "Destination",
    "Action",
  ];
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
        Success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
    {
      name: "EFGH",
      email: "EFGH@gmail.com",
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
        Success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
    {
      name: "IJKL",
      email: "IJKL@gmail.com",
      amount: "$500",
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
        Success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
    {
      name: "MNOP",
      email: "MNOP@gmail.com",
      amount: "$700",
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
        Success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
    {
      name: "QRST",
      email: "QRST@gmail.com",
      amount: `$${900}`,
      paymentMethod: "Bank",
      SubscriptionType: {
        free: "Free",
        basic: "Basic",
        premium: "Premium",
      },
      status: {
        failed: "Failed",
        pending: "Pending",
        Success: "Successful",
      },
      action: {
        active: "Active",
        block: "Blocked",
      },
    },
  ];
  const filterPaymentTable = paymentTable.filter((item) => {
    const amount = parseInt(item.amount.replace("$", ""));
    return (
      amount <= 1000 &&
      (item.paymentMethod === "Bank" || item.paymentMethod.bank === "Bank")
    );
  });
  return (
    <div>
      <div className={styles.searchBar}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Search payment.."
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
            {filterPaymentTable.map((payment, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>{payment.name}</td>
                <td className={styles.tableCell}>{payment.email}</td>
                <td className={styles.tableCell}>{payment.amount}</td>
                <td className={styles.tableCell}>
                  {payment.paymentMethod === "Bank"
                    ? "Bank"
                    : payment.paymentMethod.bank}
                </td>
                <td className={styles.tableCell}>
                  {payment.SubscriptionType.basic}
                </td>
                <td className={styles.tableCell}>{payment.status.pending}</td>
                <td className={styles.tableCell}>{payment.action.active}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessPayment;
