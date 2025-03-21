"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "../page.module.css";

export default function RewardsList() {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Premium Subscription",
      type: "Gift",
      points: 1000,
      available: 50,
    },
    {
      id: 2,
      name: "Profile Boost",
      type: "Feature",
      points: 500,
      available: 100,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteReward = (id) => {
    if (window.confirm("Are you sure you want to delete this reward?")) {
      setRewards(rewards.filter((reward) => reward.id !== id));
    }
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          {/* <Search className={styles.searchIcon} /> */}
          <input
            type="text"
            placeholder="Search rewards..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
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
                  <div className={styles.actions}>
                    <Button variant="ghost" size="sm">
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
    </div>
  );
}
