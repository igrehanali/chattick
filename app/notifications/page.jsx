"use client";

import React, { useState } from "react";
import styles from "./notifications.module.css";
import toast from "react-hot-toast";
import { AdminLayout } from "../components/layout/admin-layout";
import { Button } from "../components/ui/button";
export default function NotificationsPage() {
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [about, setAbout] = useState("");
  const [activeTab, setActiveTab] = useState("terms");
  const handleSave = async (content) => {
    try {
      toast.success("Users have been successfully notified.", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to update content", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Legal & Company Information</h1>

        <div className={styles.tabs}>
          <div className={styles.tabsList}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "terms" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("terms")}
            >
              Terms & Conditions
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "privacy" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy Policy
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "about" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("about")}
            >
              About Us
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "terms" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>Terms & Conditions</h2>
                <p>Terms & Conditions</p>
                <Button
                  className={styles.saveButton}
                  onClick={() => handleSave(terms)}
                >
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>Privacy Policy</h2>
                <p>Privacy Policy</p>
                <Button
                  className={styles.saveButton}
                  onClick={() => handleSave(privacy)}
                >
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === "about" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>About Us</h2>
                <p>About Us</p>
                <Button
                  className={styles.saveButton}
                  onClick={() => handleSave(about)}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
