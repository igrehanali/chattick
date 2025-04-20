import React, { useState } from 'react'
import styles from '../management.module.css'

const ProcessRefund = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // ----> Refund Table Data <----
  const refundData = [
    {
      customer: {
        costumerID: `TXN${Math.floor(Math.random() * 10000)}`,
        name: 'Ayesha Khan',
        email: 'ayesha@example.com'
      },
      paymentDate: '2025-04-10',
      amount: '$120',
      reason: 'Subscription not activated after payment',
      subscriptionStatus: 'Failed',
      action: 'Refund Now'
    },
    {
      customer: {
        costumerID: `TXN${Math.floor(Math.random() * 10000)}`,
        name: 'Zain Ali',
        email: 'zain@example.com'
      },
      paymentDate: '2025-04-12',
      amount: '$89',
      reason: 'Duplicate payment',
      subscriptionStatus: 'Canceled',
      action: 'Refund Now'
    },
    {
      customer: {
        costumerID: `TXN${Math.floor(Math.random() * 10000)}`,
        name: 'Fatima Noor',
        email: 'fatima@example.com'
      },
      paymentDate: '2025-04-08',
      amount: '$55',
      reason: 'Subscription not triggered',
      subscriptionStatus: 'Not Activated',
      action: 'Refund Now'
    },
    {
      customer: {
        costumerID: `TXN${Math.floor(Math.random() * 10000)}`,
        name: 'Umer Shah',
        email: 'umer@example.com'
      },
      paymentDate: '2025-04-09',
      amount: '$100',
      reason: 'Technical error in processing',
      subscriptionStatus: 'Failed',
      action: 'Refunded'
    },
    {
      customer: {
        costumerID: `TXN${Math.floor(Math.random() * 10000)}`,
        name: 'Sara Javed',
        email: 'sara@example.com'
      },
      paymentDate: '2025-04-07',
      amount: '$130',
      reason: 'User reported issue with service activation',
      subscriptionStatus: 'Failed',
      action: 'Refund Now'
    }
  ];

  // ----> Search Bar Filter Functionality  <----
  const filteredRefunds = refundData.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.customer.costumerID.toLowerCase().includes(query) ||
      item.customer.name.toLowerCase().includes(query) ||
      item.customer.email.toLowerCase().includes(query) ||
      item.reason.toLowerCase().includes(query) ||
      item.subscriptionStatus.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      {/* ----> SearchBar input <---- */}
      <div className={styles.searchBar}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* ----> Refund Table <---- */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>

          {/* ----> Table Head <---- */}
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Costumer Id</th>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Payment Date</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Reason</th>
              <th className={styles.tableHeaderCell}>Subscription status</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          
          {/* ----> Table Body <---- */}
          <tbody className={styles.tableBody}>
            {filteredRefunds.length > 0 ? (
              filteredRefunds.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.customer.costumerID}</td>
                  <td className={styles.tableCell}>
                    {item.customer.name}
                    <br />
                    <small>{item.customer.email}</small>
                  </td>
                  <td className={styles.tableCell}>{item.paymentDate}</td>
                  <td className={styles.tableCell}>{item.amount}</td>
                  <td className={styles.tableCell}><small>{item.reason}</small></td>
                  <td className={styles.tableCell}>{item.subscriptionStatus}</td>
                  <td className={styles.tableCell}>{item.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles.tableCell} colSpan="6" style={{ textAlign: 'center' }}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProcessRefund