"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/auth-context";
import {
  LayoutDashboard, Users, MessageSquare, CreditCard, Trophy,
  HelpCircle, Settings, Bell, Palette, ShieldAlert,
  BarChart, UserCog, Menu, X, LogOut,
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
  {
    name: "Analytics & Insights",
    href: "/analytics",
    icon: BarChart,
    submenu: [
      { name: "Subscription", href: "/analytics/SubscriptionAnalytics" },
      { name: "Renewals", href: "/analytics/RenewalAnalytics" },
      { name: "Call/Message", href: "/analytics/ViewCallMessageUsage" },
      { name: "Contest Gifts", href: "/analytics/ViewContextParticipationGifts" },
      { name: "Contest Finance", href: "/analytics/ViewPaymentFinancial" },
      { name: "Referral Points", href: "/analytics/ViewReferralPoints" },
      { name: "Support Metrics", href: "/analytics/AnalyzeSupportRequestsMetrics" },
      { name: "Bug Metrics", href: "/analytics/AnalyzeBugReportsMetrics" },
      { name: "Feature Ideas", href: "/analytics/AnalyzeFeatureSuggestions" },
      { name: "Tutorials", href: "/analytics/AnalyzeTutorialsUsage" },
      { name: "Group Usage", href: "/analytics/AnalyzeGroupUsage" },
      { name: "Login Security", href: "/analytics/AnalyzeLoginSecurityMetrics" },
      { name: "Device Sessions", href: "/analytics/AnalyzeDeviceSessionUsage" },
      { name: "Notifications", href: "/analytics/AnalyzeNotificationAlert" },
      { name: "Marketing Emails", href: "/analytics/ManageMarketingEmailsAlerts" },
    ],

  },
  { name: "Admin & Super Admin Management", href: "/admin", icon: UserCog },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const { logout } = useAuth();

  // Initialize expandedItems based on current path
  const [expandedItems, setExpandedItems] = useState(() => {
    return navigation
      .filter(item =>
        item.submenu?.some(subItem => pathname.startsWith(subItem.href))
      )
      .map(item => item.name);
  });

  // Only close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);

    // Keep submenu open if current path matches
    const parentItem = navigation.find(item =>
      item.submenu?.some(subItem => pathname.startsWith(subItem.href))
    );

    if (parentItem && !expandedItems.includes(parentItem.name)) {
      setExpandedItems(prev => [...prev, parentItem.name]);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleSubmenu = (itemName) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.mobileMenuButton}
      >
        {isOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
      </button>

      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>Admin Panel</span>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navList}>
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const isExpanded = expandedItems.includes(item.name);

              return (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        toggleSubmenu(item.name);
                      }
                    }}
                  >
                    <item.icon
                      className={`${styles.navItemIcon} ${isActive ? styles.navItemIconActive : ""}`}
                      aria-hidden="true"
                    />
                    {item.name}
                    {item.submenu && (
                      <span className={styles.submenuToggle}>
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    )}
                  </Link>

                  {item.submenu && isExpanded && (
                    <div className={styles.submenu}>
                      {item.submenu.map((subItem) => {
                        const isSubItemActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`${styles.submenuItem} ${isSubItemActive ? styles.submenuItemActive : ""}`}
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
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