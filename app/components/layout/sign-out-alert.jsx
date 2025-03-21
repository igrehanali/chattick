"use client";

import React from "react";
import styles from "./sign-out-alert.module.css";

export function SignOutAlert({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2 className={styles.title}>Are you sure you want to sign out?</h2>
          <p className={styles.description}>
            You will be redirected to the login page.
          </p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${styles.button} ${styles.confirmButton}`}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
