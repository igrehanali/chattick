import React from 'react'
import styles from '../management.module.css'

const ProcessWithdrawals = () => {
  return (
    <div>
      <div className={styles.searchBar}>
        <input className={styles.Input} type="text" placeholder='Search withdrawal..' />
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Customer Info</th>
              <th className={styles.tableHeaderCell}>Amount </th>
              <th className={styles.tableHeaderCell}>Destination (Bank/Wallet)</th>
              <th className={styles.tableHeaderCell}>Status</th>
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

export default ProcessWithdrawals