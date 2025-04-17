"use client";

import React from "react";
import styles from "../system-settings.module.css";

export default function PaymentSettings({ settings, handleChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>💰 Payment Integrations</h3>
      </div>
      <div className={styles.cardContent}>
        <label className={styles.label}>Payment Gateway</label>
        <select
          className={styles.input}
          value={settings.payments.gateway}
          onChange={(e) =>
            handleChange("payments", "gateway", e.target.value)
          }
        >
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
          <option value="square">Square</option>
        </select>

        <label className={styles.label}>SMS Provider</label>
        <select
          className={styles.input}
          value={settings.payments.smsProvider}
          onChange={(e) =>
            handleChange("payments", "smsProvider", e.target.value)
          }
        >
          <option value="twilio">Twilio</option>
          <option value="messagebird">MessageBird</option>
          <option value="vonage">Vonage</option>
        </select>

        <label className={styles.label}>Webhook URL</label>
        <input
          className={styles.input}
          type="text"
          value={settings.payments.webhookUrl}
          onChange={(e) =>
            handleChange("payments", "webhookUrl", e.target.value)
          }
        />

        <label className={styles.label}>Payment Processing Fee (%)</label>
        <input
          className={styles.input}
          type="number"
          step="0.1"
          value={settings.payments.paymentFee}
          onChange={(e) =>
            handleChange("payments", "paymentFee", Number(e.target.value))
          }
        />
      </div>
    </div>
  );
}