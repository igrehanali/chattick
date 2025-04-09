"use client";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Trophy, Users, Gift, CreditCard } from "lucide-react";
import styles from "./page.module.css";
import ContestsList from "./components/ContestsList";
import ContestantsList from "./components/ContestantsList";
import RewardsList from "./components/RewardsList";
import CreditsList from "./components/CreditsList";
import GiftsManagement from "./components/GiftsManagement";
import PointsBundleManagement from "./components/PointsBundleManagement";
import { adminService } from "@/lib/services/admin-service";

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("contests");
  const [admin, setAdmin] = useState();
  const [adminRole, setAdminRole] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const userData = JSON.parse(userStr);
        const response = await adminService.getAdminById(userData.id);
        setAdmin(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      if (admin?.roleId) {
        try {
          const response = await adminService.getRoleById(admin.roleId);
          setAdminRole(response);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchRole();
  }, [admin]);

  const hasManageUsersPermission = adminRole?.permissions?.find(
    (permission) =>
      permission.featureTitle === "Contests" &&
      permission.types.includes("read")
  );

  const canUpdateUsers = adminRole?.permissions?.find(
    (permission) =>
      permission.featureTitle === "Contests" &&
      permission.types.includes("update")
  );

  const canWriteUsers = adminRole?.permissions?.find(
    (permission) =>
      permission.featureTitle === "Contests" &&
      permission.types.includes("write")
  );

  const tabs = [
    { id: "contests", label: "Contests", icon: Trophy },
    { id: "contestants", label: "Contestants", icon: Users },
    { id: "gifts", label: "Gifts Management", icon: Gift },
    { id: "points", label: "Points Bundles", icon: CreditCard },
    { id: "rewards", label: "Rewards History", icon: Gift },
  ];

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
      {hasManageUsersPermission ? (
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Contests & Rewards Management</h2>
          </div>

          {/* ✅ Using button styles instead of old tab styles */}
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.button} ${
                  activeTab === tab.id ? styles.activeButton : ""
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
      ) : (
        <div className={styles.header}>
          <h2 className={styles.title}>Access Denied</h2>
          <p>You do not have permission to access this section</p>
        </div>
      )}
    </AdminLayout>
  );
}
