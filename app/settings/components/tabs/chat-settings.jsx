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
        <div className={styles.multiSelectContainer}>
          {/* Hours */}
          <select
            className={styles.input}
            value={settings.chat.messageRetention.hours || ""}
            onChange={(e) =>
              handleChange("chat", "messageRetention", {
                ...settings.chat.messageRetention,
                hours: e.target.value,
              })
            }
          >
            <option value="">Hours</option>
            <option value="1">1 Hour</option>
            <option value="6">6 Hours</option>
            <option value="12">12 Hours</option>
            <option value="24">24 Hours</option>
          </select>

          {/* Days */}
          <select
            className={styles.input}
            value={settings.chat.messageRetention.days || ""}
            onChange={(e) =>
              handleChange("chat", "messageRetention", {
                ...settings.chat.messageRetention,
                days: e.target.value,
              })
            }
          >
            <option value="">Days</option>
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>

          {/* Weeks */}
          <select
            className={styles.input}
            value={settings.chat.messageRetention.weeks || ""}
            onChange={(e) =>
              handleChange("chat", "messageRetention", {
                ...settings.chat.messageRetention,
                weeks: e.target.value,
              })
            }
          >
            <option value="">Weeks</option>
            <option value="1">1 Week</option>
            <option value="2">2 Weeks</option>
            <option value="4">4 Weeks</option>
          </select>

          {/* Months */}
          <select
            className={styles.input}
            value={settings.chat.messageRetention.months || ""}
            onChange={(e) =>
              handleChange("chat", "messageRetention", {
                ...settings.chat.messageRetention,
                months: e.target.value,
              })
            }
          >
            <option value="">Months</option>
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>

        <label className={styles.label}>Devices Allowed Per Account</label>
        <input
          className={styles.input}
          type="number"
          value={settings.chat.devicesAllowed}
          onChange={(e) =>
            handleChange("chat", "devicesAllowed", Number(e.target.value))
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
