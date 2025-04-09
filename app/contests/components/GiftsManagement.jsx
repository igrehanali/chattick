import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import styles from "./GiftsManagement.module.css";
import GiftModal from "./GiftModal";
import ConfirmDialog from "./ConfirmDialog";
import { contestService } from "@/lib/services/contest-service";
import { toast } from "react-hot-toast";

export default function GiftsManagement() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGifts = async () => {
      try {
        setLoading(true);
        const giftsData = await contestService.getAllGifts();
        setGifts(giftsData);
      } catch (error) {
        console.error("Error loading gifts:", error);
        toast.error("Failed to load gifts");
      } finally {
        setLoading(false);
      }
    };
    loadGifts();
  }, []);

  const [activeTab, setActiveTab] = useState("gif");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGift, setCurrentGift] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({});

  const handleAddGift = () => {
    setCurrentGift(null);
    setIsModalOpen(true);
  };

  const handleEditGift = (gift) => {
    setCurrentGift(gift);
    setIsModalOpen(true);
  };

  const handleDeleteGift = (id) => {
    setConfirmConfig({
      title: "Delete Gift",
      message: "Are you sure you want to delete this gift?",
      onConfirm: async () => {
        const loadingToast = toast.loading("Deleting gift...");
        try {
          await contestService.deleteGift(id);
          setGifts(gifts.filter((gift) => gift.id !== id));
          setShowConfirm(false);
          toast.success("Gift deleted successfully", { id: loadingToast });
        } catch (error) {
          console.error("Error deleting gift:", error);
          toast.error("Failed to delete gift", { id: loadingToast });
        }
      },
    });
    setShowConfirm(true);
  };

  const handleToggleStatus = async (id) => {
    const gift = gifts.find((g) => g.id === id);
    const newStatus = gift.status === "active" ? "inactive" : "active";
    const loadingToast = toast.loading(
      `${newStatus === "active" ? "Activating" : "Deactivating"} gift...`
    );

    try {
      await contestService.updateGift(id, { ...gift, status: newStatus });
      setGifts(
        gifts.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
      );
      toast.success(
        `Gift ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`,
        { id: loadingToast }
      );
    } catch (error) {
      console.error("Error updating gift status:", error);
      toast.error(
        `Failed to ${newStatus === "active" ? "activate" : "deactivate"} gift`,
        { id: loadingToast }
      );
    }
  };

  const filteredGifts = gifts.filter((gift) => gift.type === activeTab);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading gifts...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gifts Management</h2>
        <Button onClick={handleAddGift}>
          <FiPlus className={styles.buttonIcon} />
          Add New Gift
        </Button>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "gif" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("gif")}
        >
          GIF Gifts
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "subscription" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("subscription")}
        >
          Subscription Plans
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Name</th>
              <th className={styles.tableHeaderCell}>Description</th>
              <th className={styles.tableHeaderCell}>Cost Points</th>
              <th className={styles.tableHeaderCell}>Reward Points</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredGifts.map((gift) => (
              <tr key={gift.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{gift.name}</td>
                <td className={styles.tableCell}>{gift.description}</td>
                <td className={styles.tableCell}>{gift.costPoints}</td>
                <td className={styles.tableCell}>{gift.rewardPoints}</td>
                <td className={styles.tableCell}>
                  <button
                    onClick={() => handleToggleStatus(gift.id)}
                    className={`${styles.statusButton} ${
                      gift.status === "active" ? styles.active : styles.inactive
                    }`}
                  >
                    {gift.status === "active" ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleEditGift(gift)}
                      className={`${styles.actionButton} ${styles.editButton}`}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteGift(gift.id)}
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
        <GiftModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          gift={currentGift}
          giftType={activeTab}
          onSave={async (formData) => {
            const loadingToast = toast.loading(
              currentGift ? "Updating gift..." : "Creating gift..."
            );
            try {
              if (currentGift) {
                const updatedGift = await contestService.updateGift(
                  currentGift.id,
                  { ...formData, type: activeTab }
                );
                setGifts(
                  gifts.map((gift) =>
                    gift.id === currentGift.id ? updatedGift : gift
                  )
                );
                toast.success("Gift updated successfully", {
                  id: loadingToast,
                });
              } else {
                const newGift = await contestService.createGift({
                  ...formData,
                  type: activeTab,
                  status: "active",
                });
                setGifts([...gifts, newGift]);
                toast.success("Gift created successfully", {
                  id: loadingToast,
                });
              }
              setIsModalOpen(false);
            } catch (error) {
              console.error("Error saving gift:", error);
              toast.error(
                `Failed to ${currentGift ? "update" : "create"} gift`,
                { id: loadingToast }
              );
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
