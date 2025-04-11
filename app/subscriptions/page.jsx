"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import {
  CreditCard,
  DollarSign,
  Users,
  RefreshCcw,
  Search,
  Filter,
  X,
  Plus,
} from "lucide-react";
import { subscriptionService } from "@/lib/services/subscription-service";
import { toastService } from "@/lib/services/toast-service";
import SubscriptionTierForm from "./components/SubscriptionTierForm";

import { AdminLayout } from "../components/layout/admin-layout";
import { adminService } from "@/lib/services/admin-service";

export default function SubscriptionsPage() {
  const [admin, setAdmin] = useState();
  const [adminRole, setAdminRole] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTierForm, setShowTierForm] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [plans, setPlans] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [stats, setStats] = useState([
    {
      label: "Total Revenue",
      value: "$0",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Active Subscriptions",
      value: "0",
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Processing Payments",
      value: "0",
      icon: <CreditCard className="w-5 h-5 text-purple-500" />,
    },
    {
      label: "Pending Refunds",
      value: "0",
      icon: <RefreshCcw className="w-5 h-5 text-yellow-500" />,
    },
  ]);

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

  useEffect(() => {
    const calculateStats = () => {
      const totalRevenue = userSubscriptions.reduce((acc, sub) => {
        const price = parseFloat(sub.purchasePrice || 0);
        return acc + price;
      }, 0);

      const activeCount = userSubscriptions.filter(
        (sub) => sub.status === "active"
      ).length;
      const processingCount = userSubscriptions.filter(
        (sub) => sub.status === "processing"
      ).length;
      const pendingRefunds = userSubscriptions.filter(
        (sub) => sub.status === "refund_pending"
      ).length;

      setStats([
        {
          label: "Total Revenue",
          value: `$${totalRevenue.toFixed(2)}`,
          icon: <DollarSign className="w-5 h-5 text-green-500" />,
        },
        {
          label: "Active Subscriptions",
          value: activeCount.toString(),
          icon: <Users className="w-5 h-5 text-blue-500" />,
        },
        {
          label: "Processing Payments",
          value: processingCount.toString(),
          icon: <CreditCard className="w-5 h-5 text-purple-500" />,
        },
        {
          label: "Pending Refunds",
          value: pendingRefunds.toString(),
          icon: <RefreshCcw className="w-5 h-5 text-yellow-500" />,
        },
      ]);
    };

    calculateStats();
  }, [userSubscriptions]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const subscriptionPlans =
          await subscriptionService.getAllSubscriptions();
        const activePlans = subscriptionPlans.filter(
          (plan) => plan.status === "active"
        );
        setPlans(activePlans);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        toastService.error("Failed to fetch subscription plans");
      }
    };

    fetchPlans();
  }, []);

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

  const years = ["2023", "2024", "2025"];
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
  ];
  const countries = ["USA", "Canada", "UK"];
  const selectedPlan = "";

  const itemsPerPage = 10;

  const filteredSubscriptions = userSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);

  const handleChangePlan = async (subscriptionId) => {
    const loadingToast = toastService.loading("Updating subscription plan...");
    try {
      const updatedSubscription = await subscriptionService.updateSubscription(
        subscriptionId,
        {
          plan: selectedPlan || "Basic Plan",
          status: "active",
          autoRenew: true,
        }
      );
      toastService.dismiss(loadingToast);
      toastService.success("Subscription plan updated successfully");
      // Refresh subscriptions
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setUserSubscriptions(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(`Failed to update plan: ${error.message}`);
    }
  };

  const handleCancelRenewal = async (subscriptionId) => {
    const loadingToast = toastService.loading(
      "Canceling subscription renewal..."
    );
    try {
      await subscriptionService.cancelSubscriptionRenewal(subscriptionId);
      toastService.dismiss(loadingToast);
      toastService.success("Subscription renewal canceled");
      // Refresh subscriptions
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setUserSubscriptions(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(`Failed to cancel renewal: ${error.message}`);
    }
  };

  const handleRenewPlan = async (subscriptionId) => {
    const loadingToast = toastService.loading("Renewing subscription...");
    try {
      await subscriptionService.renewSubscription(subscriptionId, {
        startDate: new Date().toISOString(),
        endDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString(),
        status: "active",
      });
      toastService.dismiss(loadingToast);
      toastService.success("Subscription renewed successfully");
      // Refresh subscriptions
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setUserSubscriptions(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(`Failed to renew subscription: ${error.message}`);
    }
  };

  const handleCreateTier = () => {
    setEditingTier(null);
    setShowTierForm(true);
  };

  const handleEditTier = (tier) => {
    setEditingTier(tier);
    setShowTierForm(true);
  };

  const handleSubmitTier = async (tierData) => {
    const loadingToast = toastService.loading("Creating subscription tier...");
    try {
      await subscriptionService.createSubscription({
        ...tierData,
        createdAt: new Date().toISOString(),
        status: "active",
      });
      toastService.dismiss(loadingToast);
      toastService.success("Subscription tier created successfully");
      setShowTierForm(false);
      setEditingTier(null);
      // Refresh plans
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setPlans(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(
        `Failed to create subscription tier: ${error.message}`
      );
    }
  };

  const handleDeactivateTier = async (tierId) => {
    const loadingToast = toastService.loading(
      "Deactivating subscription tier..."
    );
    try {
      await subscriptionService.updateSubscription(tierId, {
        status: "inactive",
        deactivatedAt: new Date().toISOString(),
      });
      toastService.dismiss(loadingToast);
      toastService.success("Subscription tier deactivated successfully");
      // Refresh plans
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setPlans(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(`Failed to deactivate tier: ${error.message}`);
    }
  };

  const handlePublishTier = async (tierId) => {
    const loadingToast = toastService.loading(
      "Publishing subscription tier..."
    );
    try {
      await subscriptionService.updateSubscription(tierId, {
        status: "active",
        publishedAt: new Date().toISOString(),
      });
      toastService.dismiss(loadingToast);
      toastService.success("Subscription tier published successfully");
      // Refresh plans
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setPlans(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(`Failed to publish tier: ${error.message}`);
    }
  };

  return (
    <AdminLayout>
      {hasManageUsersPermission ? (
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Subscription Management</h1>
          </header>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statsCard}>
                <div className={styles.statsHeader}>
                  <span className={styles.statsLabel}>{stat.label}</span>
                  {stat.icon}
                </div>
                <div className={styles.statsValue}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div className={styles.plansContainer}>
            <div className={styles.plansHeader}>
              <h2>Subscription Plans</h2>
              {canWriteUsers && (
                <button
                  onClick={handleCreateTier}
                  className={styles.createButton}
                >
                  <Plus className="w-4 h-4" />
                  Create New Tier
                </button>
              )}
            </div>
            <div className={styles.plansGrid}>
              {plans.map((plan, index) => (
                <div key={index} className={styles.planCard}>
                  <h3 className={styles.planName}>{plan.title}</h3>
                  <div className={styles.planPrice}>€{plan.purchasePrice}</div>
                  <p>Status: {plan.status}</p>
                  <p>
                    Duration:{" "}
                    {new Date(plan.startDateTime).toLocaleDateString()} →{" "}
                    {new Date(plan.endDateTime).toLocaleDateString()}
                  </p>

                  <ul className={styles.planStats}>
                    <li>Contacts: {plan.contacts}</li>
                    <li>Messages: {plan.messages}</li>
                    <li>Voice Call Duration: {plan.voiceCallDuration} mins</li>
                    <li>Video Call Duration: {plan.videoCallDuration} mins</li>
                  </ul>

                  {plan.features && plan.features.length > 0 && (
                    <div>
                      <h4>Features:</h4>
                      <ul className={styles.planFeatures}>
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className={styles.planFeature}>
                            <span>✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {canUpdateUsers && (
                    <div className={styles.planActions}>
                      <button
                        onClick={() => handleEditTier(plan)}
                        className={styles.actionButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeactivateTier(index)}
                        className={`${styles.actionButton} ${styles.deactivateButton}`}
                      >
                        Deactivate
                      </button>
                      <button
                        onClick={() => handlePublishTier(index)}
                        className={`${styles.actionButton} ${styles.publishButton}`}
                      >
                        Publish
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {showTierForm && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <button
                  onClick={() => setShowTierForm(false)}
                  className={styles.closeButton}
                >
                  <X className="w-4 h-4" />
                </button>
                <h2>
                  {editingTier
                    ? "Edit Subscription Tier"
                    : "Create Subscription Tier"}
                </h2>
                <SubscriptionTierForm
                  onSubmit={handleSubmitTier}
                  initialData={editingTier}
                />
              </div>
            </div>
          )}

          <div className={styles.filterContainer}>
            <input
              type="text"
              placeholder="Search subscriptions..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={styles.filterGroup}>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={styles.filterSelect}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Plans</option>
                {plans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>User HDID</th>
                  <th className={styles.tableHeaderCell}>Customer</th>
                  <th className={styles.tableHeaderCell}>Plan</th>
                  <th className={styles.tableHeaderCell}>Start Date</th>
                  <th className={styles.tableHeaderCell}>End Date</th>
                  <th className={styles.tableHeaderCell}>Status</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {paginatedSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{subscription.userId}</td>
                    <td className={styles.tableCell}>
                      {subscription.customer}
                    </td>
                    <td className={styles.tableCell}>{subscription.plan}</td>
                    <td className={styles.tableCell}>
                      {subscription.startDate}
                    </td>
                    <td className={styles.tableCell}>{subscription.endDate}</td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.badge} ${
                          subscription.status === "active"
                            ? styles.badgeSuccess
                            : styles.badgeError
                        }`}
                      >
                        {subscription.status}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button
                          onClick={() => handleChangePlan(subscription.userId)}
                          className={styles.actionButton}
                        >
                          Change Plan
                        </button>
                        {subscription.status === "active" && (
                          <button
                            onClick={() =>
                              handleCancelRenewal(subscription.userId)
                            }
                            className={`${styles.actionButton} ${styles.cancelButton}`}
                          >
                            Cancel Renewal
                          </button>
                        )}
                        {subscription.status === "expired" && (
                          <button
                            onClick={() => handleRenewPlan(subscription.userId)}
                            className={`${styles.actionButton} ${styles.renewButton}`}
                          >
                            Renew Plan
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                <span className={styles.pageInfo}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <h2 className={styles.title}>Access Denied</h2>
          <p>You do not have permission to access this section.</p>
        </div>
      )}
    </AdminLayout>
  );
}
