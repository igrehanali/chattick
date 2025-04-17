import React from 'react'
import styles from '../management.module.css'

const ProcessPayment = () => {
  const paymentDataHead = ['Customer Name', 'Withdrawal Status', 'Date Range', 'Costumer Info', 'Amount', 'Destination', 'Action']
  return (
    <div>
      <div className={styles.searchBar}>
        <input className={styles.Input} type="text" placeholder='Search payment..' />
      </div>
      <div>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Withdrawal Status</th>
              <th className={styles.tableHeaderCell}>Date Range</th>
              <th className={styles.tableHeaderCell}>Costumer Info</th>
              <th className={styles.tableHeaderCell}>Amount</th>
              <th className={styles.tableHeaderCell}>Destination</th>
              <th className={styles.tableHeaderCell}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProcessPayment