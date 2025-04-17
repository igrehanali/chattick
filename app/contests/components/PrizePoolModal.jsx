"use client";
import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import styles from './PrizePoolModal.module.css';

export default function PrizePoolModal({ isOpen, onClose, onSave, existingRanges }) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        minParticipants: '',
        maxParticipants: '',
        prizePool: '',
        numberOfWinners: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value, 10)
        }));
    };

    const validateRange = () => {
        const overlap = existingRanges.some(range =>
            (formData.minParticipants >= range.minParticipants && formData.minParticipants <= range.maxParticipants) ||
            (formData.maxParticipants >= range.minParticipants && formData.maxParticipants <= range.maxParticipants)
        );

        if (overlap) {
            throw new Error('This range overlaps with an existing range');
        }

        if (formData.minParticipants >= formData.maxParticipants) {
            throw new Error('Maximum participants must be greater than minimum participants');
        }

        if (formData.numberOfWinners > formData.maxParticipants) {
            throw new Error('Number of winners cannot exceed maximum participants');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            validateRange();
            onSave(formData);
            setFormData({
                minParticipants: '',
                maxParticipants: '',
                prizePool: '',
                numberOfWinners: ''
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>Add Prize Pool Range</h2>
                        <button className={styles.closeButton} onClick={onClose}>×</button>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Minimum Participants</label>
                            <input
                                type="number"
                                name="minParticipants"
                                value={formData.minParticipants}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Maximum Participants</label>
                            <input
                                type="number"
                                name="maxParticipants"
                                value={formData.maxParticipants}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Prize Pool (Points)</label>
                            <input
                                type="number"
                                name="prizePool"
                                value={formData.prizePool}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Number of Winners</label>
                            <input
                                type="number"
                                name="numberOfWinners"
                                value={formData.numberOfWinners}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>

                        <div className={styles.formActions}>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Add Range
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}