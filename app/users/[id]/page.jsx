"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import {
  Users as UsersIcon,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  LogIn,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import styles from "./user-details.module.css";

export default function UserDetailsPage({ params }) {
  const [status, setStatus] = useState("Active");

  const toggleStatus = () => {
    setStatus((prevStatus) => (prevStatus === "Active" ? "Blocked" : "Active"));
  };

  const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    joinedDate: "2024-01-15",
    lastLogin: "2024-01-20 14:30",
    phoneNumber: "+1 234 567 890",
    department: "Sales",
    location: "New York",
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>User Details</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.profile}>
            <div className={styles.avatarLarge}>
              <UsersIcon className={styles.avatarIcon} />
            </div>
            <h3 className={styles.userName}>{user.name}</h3>
            <span className={styles.userRole}>{user.role}</span>
          </div>

          <div className={styles.detailsGrid}>
            <DetailItem
              icon={<Mail size={16} />}
              label="Email"
              value={user.email}
            />
            <DetailItem
              icon={
                status === "Active" ? (
                  <ShieldCheck size={16} color="green" />
                ) : (
                  <ShieldX size={16} color="red" />
                )
              }
              label="Status"
              value={status}
              extra={
                <button
                  className={`${styles.statusButton} ${
                    styles[status.toLowerCase()]
                  }`}
                  onClick={toggleStatus}
                >
                  {status === "Active" ? "Block User" : "Unblock User"}
                </button>
              }
            />
            <DetailItem
              icon={<Phone size={16} />}
              label="Phone Number"
              value={user.phoneNumber}
            />
            <DetailItem
              icon={<Briefcase size={16} />}
              label="Department"
              value={user.department}
            />
            <DetailItem
              icon={<MapPin size={16} />}
              label="Location"
              value={user.location}
            />
            <DetailItem
              icon={<Calendar size={16} />}
              label="Joined Date"
              value={user.joinedDate}
            />
            <DetailItem
              icon={<LogIn size={16} />}
              label="Last Login"
              value={user.lastLogin}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function DetailItem({ icon, label, value, extra }) {
  return (
    <div className={styles.detailItem}>
      <div className={styles.detailLabel}>
        {icon} <span>{label}</span>
      </div>
      <div className={styles.detailValue}>{value}</div>
      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  );
}
