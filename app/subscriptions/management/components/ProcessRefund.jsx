import React, { useState } from 'react'
import styles from '../management.module.css'

const ProcessRefund = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const refundData = [
    {
      customer: {
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

  const filteredRefunds = refundData.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.customer.name.toLowerCase().includes(query) ||
      item.customer.email.toLowerCase().includes(query) ||
      item.reason.toLowerCase().includes(query) ||
      item.subscriptionStatus.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Customer</th>
              <th className={styles.tableHeaderCell}>Payment Date</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Reason</th>
              <th className={styles.tableHeaderCell}>Subscription status</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredRefunds.length > 0 ? (
              filteredRefunds.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
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