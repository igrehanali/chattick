"use client";
import React, { useState } from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Trophy, Users, Gift, CreditCard } from "lucide-react";
import styles from "./page.module.css";
import ContestsList from "./components/ContestsList";
import ContestantsList from "./components/ContestantsList";
import RewardsList from "./components/RewardsList";
import CreditsList from "./components/CreditsList";
import GiftsManagement from "./components/GiftsManagement";
import PointsBundleManagement from "./components/PointsBundleManagement";


export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("contests");

  // Update the tabs array
  const tabs = [
    { id: "contests", label: "Contests", icon: Trophy },
    { id: "contestants", label: "Contestants", icon: Users },
    { id: "gifts", label: "Gifts Management", icon: Gift },
    { id: "points", label: "Points Bundles", icon: CreditCard },
    { id: "rewards", label: "Rewards History", icon: Gift },
  ];

  // Update the renderContent function
  const renderContent = () => {
    switch (activeTab) {
      case "contests":
        return <ContestsList />;
      case "contestants":
        return <ContestantsList />;
      case "gifts":
        return <GiftsManagement />;
      case "points":
        return <PointsBundleManagement />;
      case "rewards":
        return <RewardsList />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className={styles.header}>
          <h2 className={styles.title}>Contests & Rewards Management</h2>
        </div>

        {/* ✅ Using button styles instead of old tab styles */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.button} ${activeTab === tab.id ? styles.activeButton : ""
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className={styles.buttonIcon} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>{renderContent()}</div>
      </div>
    </AdminLayout>
  );
}
