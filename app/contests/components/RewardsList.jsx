"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "../page.module.css";
import RewardModal from "./RewardModal";
import ConfirmDialog from "./ConfirmDialog";
import PointsBundleModal from "./PointsBundleModal";

export default function RewardsList() {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Premium Subscription",
      type: "Gift",
      points: 1000,
      available: 50,
      status: "active"
    },
    {
      id: 2,
      name: "Profile Boost",
      type: "Feature",
      points: 500,
      available: 100,
      status: "active"
    },
  ]);
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
      title: 'Delete Reward',
      message: 'Are you sure you want to delete this reward?',
      onConfirm: () => {
        setRewards(rewards.filter(reward => reward.id !== id));
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  const handleToggleStatus = (id) => {
    setRewards(rewards.map(reward =>
      reward.id === id
        ? { ...reward, status: reward.status === 'active' ? 'inactive' : 'active' }
        : reward
    ));
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
                    className={`${styles.statusButton} ${reward.status === 'active' ? styles.active : styles.inactive}`}
                  >
                    {reward.status === 'active' ? 'Active' : 'Inactive'}
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

      {isModalOpen && (
        <RewardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reward={currentReward}
          onSave={(formData) => {
            if (currentReward) {
              setRewards(rewards.map(reward =>
                reward.id === currentReward.id ? { ...reward, ...formData } : reward
              ));
            } else {
              setRewards([...rewards, { id: Date.now(), ...formData, status: 'active' }]);
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
