"use client";

import React, { useState, useEffect } from "react";
import styles from "./system-settings.module.css";
import { Button } from "@/app/components/ui/button";
import WithdrawalSettings from "./tabs/withdrawal-settings";
import ChatSettings from "./tabs/chat-settings";
import UserLimitsSettings from "./tabs/user-limits-settings";
import ReferralContestSettings from "./tabs/referral-contest-settings";
import PaymentSettings from "./tabs/payment-settings";
import { settingsService } from "@/lib/services/settings-service";
import toast from "react-hot-toast";

export default function SystemSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    withdrawal: {
      minPoints: 100,
      maxPoints: 10000,
      fee: 2.5,
      moneyPerPoint: {
        USD: 0.01,
        PKR: 2.5,
        EUR: 0.009,
      },
    },
    chat: {
      messageRetention: "30 days",
      devicesAllowed: 3,
      disappearingTime: "24 hours",
      exportAllowed: true,
      forwardAllowed: true,
      shareAllowed: true,
      linksAllowed: true,
      copyAllowed: true,
      maxFileSize: 10,
      allowedFileTypes: "jpg,png,pdf,doc,docx",
    },
    userLimits: {
      accountsPerUser: 1,
      multiplePaymentMethodsAllowed: false,
    },
    referralContest: {
      entriesPerContest: 5,
      prizePoolFee: 2.5,
    },
    payments: {
      gateway: "stripe",
      smsProvider: "twilio",
      webhookUrl: "",
      paymentFee: 1.5,
      withdrawalFee: 2.0,
      serviceFee: 3.0,
    },
  });

  const [activeTab, setActiveTab] = useState("withdrawal");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getSystemSettings();
      setSettings(data);
    } catch (error) {
      toast.error("Failed to load settings");
      console.error("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }));
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsList}>
        <button
          className={`${styles.tabsTrigger} ${
            activeTab === "withdrawal" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("withdrawal")}
        >
          Withdrawals & Fees
        </button>
        <button
          className={`${styles.tabsTrigger} ${
            activeTab === "chat" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("chat")}
        >
          Chat Restrictions
        </button>
        <button
          className={`${styles.tabsTrigger} ${
            activeTab === "userLimits" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("userLimits")}
        >
          User Limits
        </button>
        <button
          className={`${styles.tabsTrigger} ${
            activeTab === "referralContest" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("referralContest")}
        >
          Referral & Contests
        </button>
        <button
          className={`${styles.tabsTrigger} ${
            activeTab === "payments" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("payments")}
        >
          Payment Integrations
        </button>
      </div>

      {/* Withdrawal Settings */}
      {activeTab === "withdrawal" && (
        <WithdrawalSettings settings={settings} handleChange={handleChange} />
      )}

      {/* Chat Restrictions */}
      {activeTab === "chat" && (
        <ChatSettings settings={settings} handleChange={handleChange} />
      )}

      {/* User Limits */}
      {activeTab === "userLimits" && (
        <UserLimitsSettings settings={settings} handleChange={handleChange} />
      )}

      {/* Referral & Contest Settings */}
      {activeTab === "referralContest" && (
        <ReferralContestSettings
          settings={settings}
          handleChange={handleChange}
        />
      )}

      {/* Payment Integration Settings */}
      {activeTab === "payments" && (
        <PaymentSettings settings={settings} handleChange={handleChange} />
      )}

      {/* Save Button */}
      <div className={`${styles.flexBetween} ${styles.mt4}`}>
        <Button
          onClick={async () => {
            setIsLoading(true);
            try {
              await settingsService.updateSystemSettings(settings);
              toast.success("Settings saved successfully");
            } catch (error) {
              toast.error("Failed to save settings");
              console.error("Error saving settings:", error);
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
