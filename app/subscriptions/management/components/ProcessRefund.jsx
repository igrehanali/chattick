import React from 'react'
import styles from '../management.module.css'

const ProcessRefund = () => {
  return (
    <div>
      <div className={styles.searchBar}>
        <input className={styles.Input} type="text" placeholder='Search...' />
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

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProcessRefund