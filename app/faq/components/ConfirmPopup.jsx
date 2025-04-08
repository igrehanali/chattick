"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../page.module.css";
import { Button } from "../../components/ui/button";

export default function ConfirmPopup({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  variant,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <Button variant="outline" onClick={onCancel}>
            {cancelText || "Cancel"}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmText || "Confirm"}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
