"use client";

import React from "react";
import styles from "../system-settings.module.css";

export default function ChatSettings({ settings, handleChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>💬 Chat Restrictions</h3>
      </div>
      <div className={styles.cardContent}>
        <label className={styles.label}>Message Retention Period</label>
        <select
          className={styles.input}
          value={settings.chat.messageRetention}
          onChange={(e) =>
            handleChange("chat", "messageRetention", e.target.value)
          }
        >
          <option value="1 hour">1 Hour</option>
          <option value="12 hours">12 Hours</option>
          <option value="24 hours">24 Hours</option>
          <option value="3 days">3 Days</option>
          <option value="7 days">7 Days</option>
          <option value="14 days">14 Days</option>
          <option value="30 days">30 Days</option>
          <option value="90 days">90 Days</option>
          <option value="180 days">180 Days</option>
          <option value="365 days">365 Days</option>
        </select>

        <label className={styles.label}>Devices Allowed Per Account</label>
        <input
          className={styles.input}
          type="number"
          value={settings.chat.devicesAllowed}
          onChange={(e) =>
            handleChange("chat", "devicesAllowed", Number(e.target.value))
          }
        />

        <label className={styles.label}>Maximum File Size (MB)</label>
        <input
          className={styles.input}
          type="number"
          value={settings.chat.maxFileSize}
          onChange={(e) =>
            handleChange("chat", "maxFileSize", Number(e.target.value))
          }
        />

        <label className={styles.label}>Allowed File Types</label>
        <input
          className={styles.input}
          type="text"
          value={settings.chat.allowedFileTypes}
          onChange={(e) =>
            handleChange("chat", "allowedFileTypes", e.target.value)
          }
        />

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.chat.exportAllowed}
              onChange={(e) =>
                handleChange("chat", "exportAllowed", e.target.checked)
              }
            />
            Allow Export
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.chat.forwardAllowed}
              onChange={(e) =>
                handleChange("chat", "forwardAllowed", e.target.checked)
              }
            />
            Allow Forward
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.chat.shareAllowed}
              onChange={(e) =>
                handleChange("chat", "shareAllowed", e.target.checked)
              }
            />
            Allow Share
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.chat.linksAllowed}
              onChange={(e) =>
                handleChange("chat", "linksAllowed", e.target.checked)
              }
            />
            Allow Links
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.chat.copyAllowed}
              onChange={(e) =>
                handleChange("chat", "copyAllowed", e.target.checked)
              }
            />
            Allow Copy
          </label>
        </div>
      </div>
    </div>
  );
}
