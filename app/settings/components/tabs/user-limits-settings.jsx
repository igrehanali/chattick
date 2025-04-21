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
        {/* <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.userLimits.AllowMaximumNumberOfGroups}
              onChange={(e) =>
                handleChange(
                  "userLimits",
                  "AllowMaximumNumberOfGroups",
                  e.target.checked
                )
              }
            />
            Allow Maximum number of groups
          </label>
        </div>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.userLimits.AllowMaximumNumberOfContacts}
              onChange={(e) =>
                handleChange(
                  "userLimits",
                  "AllowMaximumNumberOfContacts",
                  e.target.checked
                )
              }
            />
            Allow Maximum number of Contacts
          </label>
        </div>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.userLimits.AllowMaximumNumberOfContestEntries}
              onChange={(e) =>
                handleChange(
                  "userLimits",
                  "AllowMaximumNumberOfContestEntries",
                  e.target.checked
                )
              }
            />
            Allow Maximum number of contest entries
          </label>
        </div> */}
      </div>
    </div>
  );
}
