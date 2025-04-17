"use client"
import React, { useState, useEffect } from 'react';
import styles from './RewardModal.module.css';
import { Button } from "@/app/components/ui/button";

export default function RewardModal({ isOpen, onClose, reward, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Gift',
        points: '',
        available: '',
    });

    useEffect(() => {
        if (reward) {
            setFormData({
                name: reward.name,
                type: reward.type,
                points: reward.points,
                available: reward.available,
            });
        }
    }, [reward]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                    <h2 className={styles.modalTitle}>
                        {reward ? 'Edit Reward' : 'Add New Reward'}
                    </h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="Gift">Gift</option>
                                <option value="Feature">Feature</option>
                                <option value="Subscription">Subscription</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="points">Points Required</label>
                            <input
                                type="number"
                                id="points"
                                name="points"
                                value={formData.points}
                                onChange={handleChange}
                                required
                                min="1"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="available">Available Quantity</label>
                            <input
                                type="number"
                                id="available"
                                name="available"
                                value={formData.available}
                                onChange={handleChange}
                                required
                                min="0"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.modalActions}>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {reward ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}