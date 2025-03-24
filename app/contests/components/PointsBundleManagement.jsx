"use client"
import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import styles from './PointsBundleManagement.module.css';
import PointsBundleModal from './PointsBundleModal';
import ConfirmDialog from './ConfirmDialog';

export default function PointsBundleManagement() {
    const [pointBundles, setPointBundles] = useState([
        { id: 1, points: 100, price: 5, currency: 'USD', status: 'active' },
        { id: 2, points: 500, price: 20, currency: 'USD', status: 'active' },
        { id: 3, points: 1000, price: 35, currency: 'USD', status: 'active' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBundle, setCurrentBundle] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({});

    const handleAddBundle = () => {
        setCurrentBundle(null);
        setIsModalOpen(true);
    };

    const handleEditBundle = (bundle) => {
        setCurrentBundle(bundle);
        setIsModalOpen(true);
    };

    const handleDeleteBundle = (id) => {
        setConfirmConfig({
            title: 'Delete Bundle',
            message: 'Are you sure you want to delete this points bundle?',
            onConfirm: () => {
                setPointBundles(pointBundles.filter(bundle => bundle.id !== id));
                setShowConfirm(false);
            }
        });
        setShowConfirm(true);
    };

    const handleToggleStatus = (id) => {
        setPointBundles(pointBundles.map(bundle =>
            bundle.id === id
                ? { ...bundle, status: bundle.status === 'active' ? 'inactive' : 'active' }
                : bundle
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Points Bundles</h2>
                <Button onClick={handleAddBundle}>
                    <FiPlus className={styles.buttonIcon} />
                    Add New Bundle
                </Button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th className={styles.tableHeaderCell}>Points</th>
                            <th className={styles.tableHeaderCell}>Price</th>
                            <th className={styles.tableHeaderCell}>Currency</th>
                            <th className={styles.tableHeaderCell}>Status</th>
                            <th className={styles.tableHeaderCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {pointBundles.map((bundle) => (
                            <tr key={bundle.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>{bundle.points}</td>
                                <td className={styles.tableCell}>{bundle.price}</td>
                                <td className={styles.tableCell}>{bundle.currency}</td>
                                <td className={styles.tableCell}>
                                    <button
                                        onClick={() => handleToggleStatus(bundle.id)}
                                        className={`${styles.statusButton} ${bundle.status === 'active' ? styles.active : styles.inactive}`}
                                    >
                                        {bundle.status === 'active' ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className={styles.tableCell}>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => handleEditBundle(bundle)}
                                            className={`${styles.actionButton} ${styles.editButton}`}
                                        >
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBundle(bundle.id)}
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <PointsBundleModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    bundle={currentBundle}
                    onSave={(formData) => {
                        if (currentBundle) {
                            setPointBundles(pointBundles.map(bundle =>
                                bundle.id === currentBundle.id ? { ...bundle, ...formData } : bundle
                            ));
                        } else {
                            setPointBundles([...pointBundles, { id: Date.now(), ...formData, status: 'active' }]);
                        }
                        setIsModalOpen(false);
                    }}
                />
            )}

            {showConfirm && (
                <ConfirmDialog
                    {...confirmConfig}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
}