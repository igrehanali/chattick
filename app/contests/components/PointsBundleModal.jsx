"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import styles from './PointsBundleModal.module.css';

export default function PointsBundleModal({ isOpen, onClose, bundle, onSave }) {
    const [formData, setFormData] = useState({
        points: '',
        price: '',
        currency: 'USD'
    });

    useEffect(() => {
        if (bundle) {
            setFormData({
                points: bundle.points,
                price: bundle.price,
                currency: bundle.currency
            });
        }
    }, [bundle]);

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
                        {bundle ? 'Edit Points Bundle' : 'Add New Points Bundle'}
                    </h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="points">Points</label>
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
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0.01"
                                step="0.01"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="currency">Currency</label>
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className={styles.select}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="PKR">PKR</option>
                            </select>
                        </div>

                        <div className={styles.modalActions}>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {bundle ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}