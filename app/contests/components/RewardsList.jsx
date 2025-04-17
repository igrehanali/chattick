"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "../page.module.css";
import RewardModal from "./RewardModal";
import ConfirmDialog from "./ConfirmDialog";
import { rewardsService } from "@/lib/services/rewards-service";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function RewardsList() {
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const rewardsData = await rewardsService.getAllRewards();
      setRewards(rewardsData);
    } catch (error) {
      toast.error("Failed to load rewards");
      console.error("Error loading rewards:", error);
    } finally {
      setLoading(false);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({});

  const handleAddReward = () => {
    setCurrentReward(null);
    setIsModalOpen(true);
  };

  const handleEditReward = (reward) => {
    setCurrentReward(reward);
    setIsModalOpen(true);
  };

  const handleDeleteReward = (id) => {
    setConfirmConfig({
      title: "Delete Reward",
      message: "Are you sure you want to delete this reward?",
      onConfirm: async () => {
        try {
          await rewardsService.deleteReward(id);
          setRewards(rewards.filter((reward) => reward.id !== id));
          toast.success("Reward deleted successfully");
          setShowConfirm(false);
        } catch (error) {
          toast.error("Failed to delete reward");
          console.error("Error deleting reward:", error);
        }
      },
    });
    setShowConfirm(true);
  };

  const handleToggleStatus = async (id) => {
    try {
      const reward = rewards.find((r) => r.id === id);
      const newStatus = reward.status === "active" ? "inactive" : "active";
      await rewardsService.toggleRewardStatus(id, newStatus);
      setRewards(
        rewards.map((reward) =>
          reward.id === id ? { ...reward, status: newStatus } : reward
        )
      );
      toast.success(
        `Reward ${
          newStatus === "active" ? "activated" : "deactivated"
        } successfully`
      );
    } catch (error) {
      toast.error("Failed to update reward status");
      console.error("Error updating reward status:", error);
    }
  };

  const handleSaveReward = async (formData) => {
    const loadingToast = toast.loading(
      currentReward ? "Updating reward..." : "Creating reward..."
    );
    try {
      if (currentReward) {
        const updatedReward = await rewardsService.updateReward(
          currentReward.id,
          formData
        );
        setRewards(
          rewards.map((reward) =>
            reward.id === currentReward.id ? updatedReward : reward
          )
        );
      } else {
        const newReward = await rewardsService.createReward(formData);
        setRewards([...rewards, newReward]);
      }
      setIsModalOpen(false);
      toast.success(
        currentReward
          ? "Reward updated successfully"
          : "Reward created successfully",
        { id: loadingToast }
      );
    } catch (error) {
      console.error("Error saving reward:", error);
      toast.error(
        currentReward ? "Failed to update reward" : "Failed to create reward",
        { id: loadingToast }
      );
    }
  };

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search rewards..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddReward}>
          <Plus className={styles.buttonIcon} />
          Add Reward
        </Button>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.loadingSpinner} />
          <p>Loading rewards, please wait...</p>
        </div>
      ) : filteredRewards.length === 0 ? (
        <p className={styles.noRewardsMessage}>No rewards found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Points Required</th>
                <th>Available</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRewards.map((reward) => (
                <tr key={reward.id}>
                  <td>{reward.name}</td>
                  <td>{reward.type}</td>
                  <td>{reward.points}</td>
                  <td>{reward.available}</td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(reward.id)}
                      className={`${styles.statusButton} ${
                        reward.status === "active"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {reward.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditReward(reward)}
                      >
                        <Edit className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReward(reward.id)}
                      >
                        <Trash2 className={styles.actionIcon} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <RewardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reward={currentReward}
          onSave={handleSaveReward}
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
