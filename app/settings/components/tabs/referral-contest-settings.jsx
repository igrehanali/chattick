"use client";

import React from "react";
import styles from "../system-settings.module.css";

export default function ReferralContestSettings({ settings, handleChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>🎯 Referral & Contests</h3>
      </div>
      <div className={styles.cardContent}>
        <label className={styles.label}>Contest Entries Allowed</label>
        <input
          className={styles.input}
          type="number"
          value={settings.referralContest.contestEntries}
          onChange={(e) =>
            handleChange(
              "referralContest",
              "contestEntries",
              Number(e.target.value)
            )
          }
        />

        <label className={styles.label}>Prize Pool Service Fee (%)</label>
        <input
          className={styles.input}
          type="number"
          step="0.1"
          value={settings.referralContest.prizePoolFee}
          onChange={(e) =>
            handleChange(
              "referralContest",
              "prizePoolFee",
              Number(e.target.value)
            )
          }
        />
      </div>
    </div>
  );
}
