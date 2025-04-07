"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import styles from "./PointsBundleManagement.module.css";
import PointsBundleModal from "./PointsBundleModal";
import ConfirmDialog from "./ConfirmDialog";
import { contestService } from "@/lib/services/contest-service";

export default function PointsBundleManagement() {
  const [pointBundles, setPointBundles] = useState([]);

  useEffect(() => {
    const loadPointsBundles = async () => {
      try {
        const bundlesData = await contestService.getAllPointsBundles();
        setPointBundles(bundlesData);
      } catch (error) {
        console.error("Error loading points bundles:", error);
      }
    };
    loadPointsBundles();
  }, []);
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
      title: "Delete Bundle",
      message: "Are you sure you want to delete this points bundle?",
      onConfirm: async () => {
        try {
          await contestService.deletePointsBundle(id);
          setPointBundles(pointBundles.filter((bundle) => bundle.id !== id));
          setShowConfirm(false);
        } catch (error) {
          console.error("Error deleting points bundle:", error);
        }
      },
    });
    setShowConfirm(true);
  };

  const handleToggleStatus = (id) => {
    setPointBundles(
      pointBundles.map((bundle) =>
        bundle.id === id
          ? {
              ...bundle,
              status: bundle.status === "active" ? "inactive" : "active",
            }
          : bundle
      )
    );
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
                    className={`${styles.statusButton} ${
                      bundle.status === "active"
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    {bundle.status === "active" ? "Active" : "Inactive"}
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
          onSave={async (formData) => {
            try {
              if (currentBundle) {
                const updatedBundle = await contestService.updatePointsBundle(
                  currentBundle.id,
                  formData
                );
                setPointBundles(
                  pointBundles.map((bundle) =>
                    bundle.id === currentBundle.id ? updatedBundle : bundle
                  )
                );
              } else {
                const newBundle = await contestService.createPointsBundle({
                  ...formData,
                  status: "active",
                });
                setPointBundles([...pointBundles, newBundle]);
              }
              setIsModalOpen(false);
            } catch (error) {
              console.error("Error saving points bundle:", error);
            }
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
