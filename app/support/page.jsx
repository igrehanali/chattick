"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Button } from "@/app/components/ui/button";
import {
  MessageSquare,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { CategoryManager } from "./components/category-manager";
import styles from "./page.module.css";
import { adminService } from "@/lib/services/admin-service";

const tickets = [
  {
    id: 1,
    title: "Cannot access my account",
    status: "Open",
    priority: "High",
    user: "John Doe",
    category: "Account Issues",
    assignedTo: "Support Team A",
    createdAt: "2024-01-15 09:30",
    lastUpdate: "2024-01-15 10:15",
  },
  {
    id: 2,
    title: "Feature request: Dark mode",
    status: "In Progress",
    priority: "Medium",
    user: "Jane Smith",
    category: "Technical Support",
    assignedTo: "Support Team B",
    createdAt: "2024-01-14 15:20",
    lastUpdate: "2024-01-15 11:00",
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case "Open":
      return AlertCircle;
    case "In Progress":
      return Clock;
    case "Resolved":
      return CheckCircle2;
    default:
      return MessageSquare;
  }
};

export default function SupportPage() {
  const router = useRouter();
  const [showCategories, setShowCategories] = useState(false);
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
      permission.featureTitle === "Support" && permission.types.includes("read")
  );

  const canUpdateUsers = adminRole?.permissions?.find(
    (permission) =>
      permission.featureTitle === "Support" &&
      permission.types.includes("update")
  );

  const canWriteUsers = adminRole?.permissions?.find(
    (permission) =>
      permission.featureTitle === "Support" &&
      permission.types.includes("write")
  );

  if (!hasManageUsersPermission) {
    return (
      <AdminLayout>
        <div className={styles.header}>
          <h2 className={styles.title}>Access Denied</h2>
          <p>You do not have permission to access this section</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Support Tickets</h2>
          <div className={styles.headerButtons}>
            <Button onClick={() => setShowCategories(!showCategories)}>
              <MessageSquare className={styles.buttonIcon} />
              Manage Categories
            </Button>
          </div>
        </div>

        {showCategories && <CategoryManager />}

        <div className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Total Tickets</div>
              <MessageSquare className={styles.iconBlue} />
            </div>
            <div className={styles.statsValue}>24</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Open</div>
              <AlertCircle className={styles.iconYellow} />
            </div>
            <div className={styles.statsValue}>8</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>In Progress</div>
              <Clock className={styles.iconPurple} />
            </div>
            <div className={styles.statsValue}>12</div>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <div className={styles.statsLabel}>Resolved</div>
              <CheckCircle2 className={styles.iconGreen} />
            </div>
            <div className={styles.statsValue}>4</div>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchHeader}>
            <div className={styles.searchInputWrapper}>
              <div className={styles.searchInputContainer}>
                {/* <Search className={styles.searchIcon} /> */}
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Ticket</th>
                  <th className={styles.tableHeaderCell}>Category</th>
                  <th className={styles.tableHeaderCell}>Status</th>
                  <th className={styles.tableHeaderCell}>Priority</th>
                  <th className={styles.tableHeaderCell}>User</th>
                  <th className={styles.tableHeaderCell}>Assigned To</th>
                  <th className={styles.tableHeaderCell}>Created At</th>
                  <th className={styles.tableHeaderCell}>Last Update</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {tickets.map((ticket) => {
                  const StatusIcon = getStatusIcon(ticket.status);
                  return (
                    <tr
                      key={ticket.id}
                      className={styles.tableRow}
                      onClick={() => router.push(`/support/${ticket.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className={styles.tableCell}>
                        <div className={styles.titleWrapper}>
                          <div className={styles.tableCell}>{ticket.title}</div>
                        </div>
                      </td>
                      <td className={styles.tableCell}>{ticket.category}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.statusBadge}>
                          <StatusIcon className={styles.statusIcon} />
                          <span>{ticket.status}</span>
                        </div>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={styles.priorityBadge}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className={styles.tableCell}>{ticket.user}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.assignedTo}>
                          <Users className={styles.assignIcon} />
                          {ticket.assignedTo}
                        </div>
                      </td>
                      <td className={styles.tableCell}>{ticket.createdAt}</td>
                      <td className={styles.tableCell}>{ticket.lastUpdate}</td>
                      <td className={styles.tableCell}>
                        <Button
                          variant="primary"
                          size="sm"
                          className={styles.secondary}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
