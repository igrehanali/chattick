"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/auth-context";
import { SignOutAlert } from "./sign-out-alert";
import styles from "./sidebar.module.css";
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
  Mail,
  FileText,
  Globe,
  Briefcase,
  FileSearch,
  Database,
  Eye,
  Server,
  Monitor,
  HardDrive,
  FolderOpen,
  Calendar,
  LineChart,
  UserCheck,
  Award,
  Phone,
  Book,
  Lock,
  UserCircle,
  UsersRound,
  MapPin,
  TurtleIcon,
  FileQuestionIcon,
  BookIcon,
  SettingsIcon,
  MessageCircle,
} from "lucide-react";
import { adminService } from "@/lib/services/admin-service";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  // User Section
  {
    name: "User Management",
    href: "/users",
    icon: UserCircle,
    submenu: [
      { name: "Users", href: "/users", icon: UsersRound },
      { name: "User Location", href: "/userManagement", icon: MapPin },
    ],
  },

  // Monetization Section
  {
    name: "Subscription & Payments",
    href: "/subscriptions",
    icon: CreditCard,
    submenu: [
      { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
      {
        name: "Payment Management",
        href: "/subscriptions/management",
        icon: FileText,
      },
    ],
  },

  // Engagement
  { name: "Contests & Rewards", href: "/contests", icon: Trophy },
  {
    name: "Surveys & FAQs",
    href: "/faqs",
    icon: HelpCircle,
    submenu: [
      { name: "Surveys & FAQs", href: "/faq", icon: FileQuestionIcon },
      { name: "Tutorials", href: "/tutorials", icon: BookIcon },
    ],
  },

  // Support + Config
  { name: "Support & Tickets", href: "/support", icon: MessageSquare },
  {
    name: "System Settings",
    href: "/settings",
    icon: Settings,
    submenu: [
      { name: "System Settings", href: "/settings", icon: SettingsIcon },
      { name: "Chat setting", href: "/settings/chat", icon: MessageCircle },
    ],
  },

  // ----> Marketing Emails 
  { name: "Marketing Emails", href: "/ManageMarketingEmailsAlerts", icon: MessageSquare },

  // Analytics — deep dive last
  {
    name: "Analytics & Insights",
    href: "/analytics",
    icon: BarChart,
    submenu: [
      {
        name: "Subscription",
        href: "/analytics/SubscriptionAnalytics",
        icon: FileText,
      },
      {
        name: "Payment & Financial",
        href: "/analytics/payment",
        icon: Briefcase,
      },
      { name: "Renewals", href: "/analytics/RenewalAnalytics", icon: Calendar },
      {
        name: "Call/Message",
        href: "/analytics/ViewCallMessageUsage",
        icon: Phone,
      },
      {
        name: "Contest Gifts",
        href: "/analytics/ViewContextParticipationGifts",
        icon: Award,
      },
      {
        name: "Contest Finance",
        href: "/analytics/ViewPaymentFinancial",
        icon: Database,
      },
      {
        name: "Referral Points",
        href: "/analytics/ViewReferralPoints",
        icon: Users,
      },
      {
        name: "Support Metrics",
        href: "/analytics/AnalyzeSupportRequestsMetrics",
        icon: FileSearch,
      },
      {
        name: "Bug Metrics",
        href: "/analytics/AnalyzeBugReportsMetrics",
        icon: ShieldAlert,
      },
      {
        name: "Feature Ideas",
        href: "/analytics/AnalyzeFeatureSuggestions",
        icon: Globe,
      },
      {
        name: "Tutorials",
        href: "/analytics/AnalyzeTutorialsUsage",
        icon: Book,
      },
      {
        name: "Group Usage",
        href: "/analytics/AnalyzeGroupUsage",
        icon: Users,
      },
      {
        name: "Login Security",
        href: "/analytics/AnalyzeLoginSecurityMetrics",
        icon: Lock,
      },
      {
        name: "Device Sessions",
        href: "/analytics/AnalyzeDeviceSessionUsage",
        icon: Monitor,
      },
      {
        name: "Notifications",
        href: "/analytics/AnalyzeNotificationAlert",
        icon: Bell,
      },
    ],
  },

  // Admin Controls
  { name: "Admin & Super Admin Management", href: "/admin", icon: UserCog },

  // Visuals + Alerts
  { name: "Themes & Customization", href: "/themes", icon: Palette },
  { name: "Notifications & Policies", href: "/notifications", icon: Bell },

  // Reports last
  { name: "Reports & Moderation", href: "/reports", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutAlert, setShowSignOutAlert] = useState(false);
  const { logout } = useAuth();
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
      permission.featureTitle === "Analytics" &&
      permission.types.includes("read")
  );

  // Initialize expandedItems based on current path
  const [expandedItems, setExpandedItems] = useState(() => {
    return navigation
      .filter((item) =>
        item.submenu?.some((subItem) => pathname.startsWith(subItem.href))
      )
      .map((item) => item.name);
  });

  // Only close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);

    // Keep submenu open if current path matches
    const parentItem = navigation.find((item) =>
      item.submenu?.some((subItem) => pathname.startsWith(subItem.href))
    );

    if (parentItem && !expandedItems.includes(parentItem.name)) {
      setExpandedItems((prev) => [...prev, parentItem.name]);
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

  useEffect(() => {
    const sidebar = document.querySelector(`.${styles.sidebar}`);
    const savedScroll = sessionStorage.getItem("sidebar-scroll");
    if (sidebar && savedScroll) {
      sidebar.scrollTop = parseInt(savedScroll, 10);
    }
  }, []);

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
        {isOpen ? (
          <X className={styles.menuIcon} />
        ) : (
          <Menu className={styles.menuIcon} />
        )}
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <div className={styles.header}>
          <span className={styles.headerTitle}>CHATTICK 💬</span>
        </div>
        {/* hfhgf */}
        <nav className={styles.nav}>
          <div className={styles.navList}>
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const isExpanded = expandedItems.includes(item.name);

              if (
                item.name === "Analytics & Insights" &&
                !hasManageUsersPermission
              ) {
                return null;
              }

              return (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${
                      isActive ? styles.navItemActive : ""
                    }`}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        toggleSubmenu(item.name);
                      }
                    }}
                  >
                    <item.icon
                      className={`${styles.navItemIcon} ${
                        isActive ? styles.navItemIconActive : ""
                      }`}
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
                            className={`${styles.submenuItem} ${
                              isSubItemActive ? styles.submenuItemActive : ""
                            }`}
                          >
                            <subItem.icon
                              className={styles.navItemIcon}
                              aria-hidden="true"
                            />
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
