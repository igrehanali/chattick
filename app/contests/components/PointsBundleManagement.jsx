"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import styles from "./PointsBundleManagement.module.css";
import PointsBundleModal from "./PointsBundleModal";
import ConfirmDialog from "./ConfirmDialog";
import { pointsBundleService } from "@/lib/services/points-bundle-service";
import { toast } from "react-hot-toast";

export default function PointsBundleManagement() {
  const [pointBundles, setPointBundles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPointsBundles = async () => {
      try {
        setLoading(true);
        const bundlesData = await pointsBundleService.getAllPointsBundles();
        setPointBundles(bundlesData);
      } catch (error) {
        console.error("Error loading points bundles:", error);
        toast.error("Failed to load points bundles");
      } finally {
        setLoading(false);
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
        const loadingToast = toast.loading("Deleting points bundle...");
        try {
          await pointsBundleService.deletePointsBundle(id);
          setPointBundles(pointBundles.filter((bundle) => bundle.id !== id));
          setShowConfirm(false);
          toast.success("Points bundle deleted successfully", {
            id: loadingToast,
          });
        } catch (error) {
          console.error("Error deleting points bundle:", error);
          toast.error("Failed to delete points bundle", { id: loadingToast });
        }
      },
    });
    setShowConfirm(true);
  };

  const handleToggleStatus = async (id) => {
    const bundle = pointBundles.find((b) => b.id === id);
    const newStatus = bundle.status === "active" ? "inactive" : "active";
    const loadingToast = toast.loading(
      `${
        newStatus === "active" ? "Activating" : "Deactivating"
      } points bundle...`
    );

    try {
      await pointsBundleService.updatePointsBundle(id, {
        ...bundle,
        status: newStatus,
      });
      setPointBundles(
        pointBundles.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast.success(
        `Points bundle ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`,
        { id: loadingToast }
      );
    } catch (error) {
      console.error("Error updating points bundle status:", error);
      toast.error(
        `Failed to ${
          newStatus === "active" ? "activate" : "deactivate"
        } points bundle`,
        { id: loadingToast }
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading points bundles...</div>
      </div>
    );
  }
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
            const loadingToast = toast.loading(
              currentBundle
                ? "Updating points bundle..."
                : "Creating points bundle..."
            );
            try {
              if (currentBundle) {
                const updatedBundle =
                  await pointsBundleService.updatePointsBundle(
                    currentBundle.id,
                    formData
                  );
                setPointBundles(
                  pointBundles.map((bundle) =>
                    bundle.id === currentBundle.id ? updatedBundle : bundle
                  )
                );
                toast.success("Points bundle updated successfully", {
                  id: loadingToast,
                });
              } else {
                const newBundle = await pointsBundleService.createPointsBundle({
                  ...formData,
                  status: "active",
                });
                setPointBundles([...pointBundles, newBundle]);
                toast.success("Points bundle created successfully", {
                  id: loadingToast,
                });
              }
              setIsModalOpen(false);
            } catch (error) {
              console.error("Error saving points bundle:", error);
              toast.error("Failed to save points bundle", { id: loadingToast });
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
