"use client";
import { AdminLayout } from "../components/layout/admin-layout";
import styles from "./admin-tabs.module.css";
import { useState } from "react";
import {
  Users,
  ShieldCheck,
  Shield,
  ActivitySquare,
  UserCog,
  Lock,
  MonitorCog,
} from "lucide-react";

import AccountsTab from "./components/accounts";
import RolesTab from "./components/roles";
import SecurityTab from "./components/security";
import ActivityTab from "./components/activity";
import SuperAdminTab from "./components/super";
import AccountSecurityTab from "./components/account-security";
import Integrations from "./components/integrations";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  const tabs = [
    { id: "accounts", label: "Admin Accounts", icon: Users },
    { id: "roles", label: "Roles & Permissions", icon: ShieldCheck },
    { id: "security", label: "Security Policies", icon: Shield },
    { id: "activity", label: "Activity & Audit Logs", icon: ActivitySquare },
    { id: "super", label: "Super Admin", icon: UserCog },
    { id: "account-security", label: "Account Security", icon: Lock },
    {
      id: "System Integrations & Management",
      label: "System Integrations & Management",
      icon: MonitorCog,
    },
  ];

  return (
    <AdminLayout>
      <div className={styles.adminContainer}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Section */}
        <main className={styles.content}>
          <div
            className={styles.tabPanel}
            style={{ display: activeTab === "accounts" ? "block" : "none" }}
          >
            <AccountsTab />
          </div>
          <div
            className={styles.tabPanel}
            style={{ display: activeTab === "roles" ? "block" : "none" }}
          >
            <RolesTab />
          </div>
          <div
            className={styles.tabPanel}
            style={{ display: activeTab === "security" ? "block" : "none" }}
          >
            <SecurityTab />
          </div>
          <div
            className={styles.tabPanel}
            style={{ display: activeTab === "activity" ? "block" : "none" }}
          >
            <ActivityTab />
          </div>
          <div
            className={styles.tabPanel}
            style={{ display: activeTab === "super" ? "block" : "none" }}
          >
            <SuperAdminTab />
          </div>
          <div
            className={styles.tabPanel}
            style={{
              display: activeTab === "account-security" ? "block" : "none",
            }}
          >
            <AccountSecurityTab />
          </div>
          <div
            className={styles.tabPanel}
            style={{
              display:
                activeTab === "System Integrations & Management"
                  ? "block"
                  : "none",
            }}
          >
            <Integrations />
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
