"use client";

import React from "react";
import styles from "../system-settings.module.css";

export default function WithdrawalSettings({ settings, handleChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>💳 Withdrawals & Fees</h3>
      </div>
      <div className={styles.cardContent}>
        <label className={styles.label}>Minimum Withdrawal Points</label>
        <input
          className={styles.input}
          type="number"
          value={settings.withdrawal.minPoints}
          onChange={(e) =>
            handleChange("withdrawal", "minPoints", Number(e.target.value))
          }
        />

        <label className={styles.label}>Maximum Withdrawal Points</label>
        <input
          className={styles.input}
          type="number"
          value={settings.withdrawal.maxPoints}
          onChange={(e) =>
            handleChange("withdrawal", "maxPoints", Number(e.target.value))
          }
        />

        <label className={styles.label}>Money Value per Point</label>
        <div className={styles.inputGroup}>
          <div>
            <label className={styles.subLabel}>USD ($)</label>
            <input
              className={styles.input}
              type="number"
              step="0.001"
              value={settings.withdrawal.moneyPerPoint.USD}
              onChange={(e) =>
                handleChange("withdrawal", "moneyPerPoint", {
                  ...settings.withdrawal.moneyPerPoint,
                  USD: Number(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label className={styles.subLabel}>PKR (Rs)</label>
            <input
              className={styles.input}
              type="number"
              step="0.1"
              value={settings.withdrawal.moneyPerPoint.PKR}
              onChange={(e) =>
                handleChange("withdrawal", "moneyPerPoint", {
                  ...settings.withdrawal.moneyPerPoint,
                  PKR: Number(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label className={styles.subLabel}>EUR (€)</label>
            <input
              className={styles.input}
              type="number"
              step="0.001"
              value={settings.withdrawal.moneyPerPoint.EUR}
              onChange={(e) =>
                handleChange("withdrawal", "moneyPerPoint", {
                  ...settings.withdrawal.moneyPerPoint,
                  EUR: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <label className={styles.label}>Withdrawal Fee (%)</label>
        <input
          className={styles.input}
          type="number"
          step="0.1"
          value={settings.withdrawal.fee}
          onChange={(e) =>
            handleChange("withdrawal", "fee", Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}
