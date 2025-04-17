import React from 'react'
import styles from '../management.module.css'

const ProcessPayment = () => {
  const PaymentData = [
    {

    }
  ]
  // dhfjhg
  return (
    <div>
      <div className={styles.searchBar}>
        <input className={styles.Input} type="text" placeholder='Search payment..' />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default ProcessPayment