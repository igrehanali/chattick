"use client";

import { AdminLayout } from '@/app/components/layout/admin-layout'
import React, { useState } from 'react'
import styles from './management.module.css'
import { Button } from '@/app/components/ui/button'

// Different Tabs
import ProcessPayment from './components/ProcessPayment';
import ProcessWithdrawals from './components/ProcessWithdrawals';
import ProcessRefund from './components/ProcessRefund';

const management = () => {
  const [activeTab, setActiveTab] = useState('process payment');

  // Manage Tabs
  const SubMenu = [
    { label: "Process Payment", value: "process payment" },
    { label: "Process Withdrawals", value: "process withdrawals" },
    { label: "process Refund", value: "process refund" },
  ];

  // Manage Page on Active Tabs
  const changeTheTab = () => {
    switch (activeTab) {
      case 'process payment':
        return <ProcessPayment />;
      case 'process withdrawals':
        return <ProcessWithdrawals />;
      case 'process refund':
        return <ProcessRefund />;
      default:
        return null;
    }
  }

  return (
    <AdminLayout>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>Payment Management</h2>
        </div>
        <div>
          {SubMenu.map((tab) => {
            return <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              onClick={() => setActiveTab(tab.value)}>{tab.label}</Button>
          })}
        </div>
        <div className={styles.tabs}>
          {changeTheTab()}
        </div>
      </div>
    </AdminLayout>
  )
}

export default management