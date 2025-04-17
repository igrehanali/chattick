"use client";

import React from "react";
import styles from "../system-settings.module.css";

export default function UserLimitsSettings({ settings, handleChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>👥 User Limits</h3>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.userLimits.multiplePaymentMethodsAllowed}
              onChange={(e) =>
                handleChange(
                  "userLimits",
                  "multiplePaymentMethodsAllowed",
                  e.target.checked
                )
              }
            />
            Allow Multiple Payment Methods
          </label>
        </div>
      </div>
    </div>
  );
}
