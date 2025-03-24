"use client"
import React from 'react';
import styles from './ConfirmDialog.module.css';
import { Button } from "@/app/components/ui/button";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
    return (
        <>
            <div className={styles.overlay} onClick={onCancel} />
            <div className={styles.dialog}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.message}>{message}</p>
                    <div className={styles.actions}>
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={onConfirm}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}