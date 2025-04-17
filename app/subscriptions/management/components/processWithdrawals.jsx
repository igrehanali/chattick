import React, { useState } from 'react';
import styles from '../management.module.css';

const ProcessWithdrawals = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const withdrawalData = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      amount: '$1200',
      destination: 'Bank',
      status: 'Pending',
      action: 'Retry'
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      amount: '$800',
      destination: 'Wallet',
      status: 'Failed',
      action: 'Retry'
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      amount: '$1500',
      destination: 'Bank',
      status: 'Success',
      action: 'Retry'
    },
    {
      name: 'Emily Johnson',
      email: 'emily@example.com',
      amount: '$600',
      destination: 'Wallet',
      status: 'Pending',
      action: 'Retry'
    },
    {
      name: 'David Lee',
      email: 'david@example.com',
      amount: '$950',
      destination: 'Bank',
      status: 'Failed',
      action: 'Retry'
    }
  ];

  const filteredData = withdrawalData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.destination.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Search withdrawal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Customer Info</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Destination</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    {item.name} <br />
                    <small>{item.email}</small>
                  </td>
                  <td className={styles.tableCell}>{item.amount}</td>
                  <td className={styles.tableCell}>{item.destination}</td>
                  <td className={styles.tableCell}>{item.status}</td>
                  <td className={styles.tableCell}>{item.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles.tableCell} colSpan="5" style={{ textAlign: 'center' }}>
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

export default ProcessWithdrawals;
