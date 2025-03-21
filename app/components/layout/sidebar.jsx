"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/auth-context";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  CreditCard,
  Trophy,
  HelpCircle,
  Settings,
  Bell,
  Palette,
  ShieldAlert,
  BarChart,
  UserCog,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { SignOutAlert } from "./sign-out-alert";
import styles from "./sidebar.module.css";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Support & Tickets", href: "/support", icon: MessageSquare },
  { name: "Subscription & Payments", href: "/subscriptions", icon: CreditCard },
  { name: "Contests & Rewards", href: "/contests", icon: Trophy },
  { name: "Surveys & FAQs", href: "/faq", icon: HelpCircle },
  { name: "System Settings", href: "/settings", icon: Settings },
  { name: "Notifications & Policies", href: "/notifications", icon: Bell },
  { name: "Themes & Customization", href: "/themes", icon: Palette },
  { name: "Reports & Moderation", href: "/reports", icon: ShieldAlert },
  { name: "Analytics & Insights", href: "/analytics", icon: BarChart },
  { name: "Admin & Super Admin Management", href: "/admin", icon: UserCog },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const { logout } = useAuth();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.mobileMenuButton}
      >
        {isOpen ? (
          <X className={styles.menuIcon} />
        ) : (
          <Menu className={styles.menuIcon} />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <div className={styles.header}>
          <span className={styles.headerTitle}>Admin Panel</span>
        </div>
        <nav className={styles.nav}>
          <div className={styles.navList}>
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                >
                  <item.icon
                    className={`${styles.navItemIcon} ${
                      isActive ? styles.navItemIconActive : ""
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className={styles.footer}>
          <button
            className={styles.signOutButton}
            onClick={() => setShowSignOutAlert(true)}
          >
            <LogOut className={styles.navItemIcon} />
            Sign out
          </button>
          <SignOutAlert
            isOpen={showSignOutAlert}
            onClose={() => setShowSignOutAlert(false)}
            onConfirm={logout}
          />
        </div>
      </div>
    </>
  );
}
