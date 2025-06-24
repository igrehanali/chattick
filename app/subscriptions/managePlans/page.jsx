"use client";

import {
  CreditCard,
  DollarSign,
  Users,
  RefreshCcw,
  Search,
  Filter,
  X,
  Plus,
  ChevronDown,
  Calendar,
  Globe,
} from "lucide-react";
import { subscriptionService } from "@/lib/services/subscription-service";
import { toastService } from "@/lib/services/toast-service";
import SubscriptionTierForm from "@/app/subscriptions/components/SubscriptionTierForm";
import { adminService } from "@/lib/services/admin-service";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import React, { useEffect, useState } from "react";
import styles from "@/app/subscriptions/managePlans/managePlans.module.css";
import styles2 from "@/app/subscriptions/page.module.css";
import Loader from "@/lib/loader";
import { Button } from "@/app/components/ui/button";

const ManagePlans = () => {
  // Admin and role states
  const [admin, setAdmin] = useState();
  const [adminRole, setAdminRole] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // UI control states
  const [showTierForm, setShowTierForm] = useState(false);
  const [editingTier, setEditingTier] = useState(null);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Data states
  const [plans, setPlans] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [stats, setStats] = useState([
    {
      label: "Total Revenue",
      value: "$0",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Active Subscriptions",
      value: "0",
      icon: <Users className="w-5 h-5 text-gray-500" />,
    },
    {
      label: "Processing Payments",
      value: "0",
      icon: <CreditCard className="w-5 h-5 text-gray-600" />,
    },
    {
      label: "Pending Refunds",
      value: "0",
      icon: <RefreshCcw className="w-5 h-5 text-gray-700" />,
    },
  ]);

  // Filter options
  const years = ["2023", "2024", "2025"];
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const countries = ["USA", "Canada", "UK", "Germany", "France", "Australia"];
  const statusOptions = ["all", "active", "inactive", "draft"];

  // Fetch admin data
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const userStr = localStorage.getItem("user");
        const userData = JSON.parse(userStr);
        const response = await adminService.getAdminById(userData.id);
        setAdmin(response);
      } catch (error) {
        console.error("Error fetching users:", error);
        toastService.error("Failed to fetch admin data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch admin role
  useEffect(() => {
    const fetchRole = async () => {
      if (admin?.roleId) {
        try {
          const response = await adminService.getRoleById(admin.roleId);
          setAdminRole(response);
        } catch (err) {
          console.error(err);
          toastService.error("Failed to fetch admin role");
        }
      }
    };

    fetchRole();
  }, [admin]);

  // Calculate statistics
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
          icon: <Users className="w-5 h-5 text-gray-500" />,
        },
        {
          label: "Processing Payments",
          value: processingCount.toString(),
          icon: <CreditCard className="w-5 h-5 text-gray-600" />,
        },
        {
          label: "Pending Refunds",
          value: pendingRefunds.toString(),
          icon: <RefreshCcw className="w-5 h-5 text-gray-700" />,
        },
      ]);
    };

    calculateStats();
  }, [userSubscriptions]);

  // Fetch subscription plans
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const subscriptionPlans =
          await subscriptionService.getAllSubscriptions();
        const filteredPlans = subscriptionPlans.filter((plan) => {
          // Apply filters if they exist
          if (filterStatus !== "all" && plan.status !== filterStatus)
            return false;
          if (
            searchQuery &&
            !plan.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
            return false;
          return true;
        });
        setPlans(filteredPlans);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        toastService.error("Failed to fetch subscription plans");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [searchQuery, filterStatus]);

  // Permission checks
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

  // Filter subscriptions
  const filteredSubscriptions = userSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.userId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || sub.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle plan change
  const handleChangePlan = async (subscriptionId) => {
    if (!selectedPlan) {
      toastService.error("Please select a plan first");
      return;
    }

    const loadingToast = toastService.loading("Updating subscription plan...");
    try {
      const updatedSubscription = await subscriptionService.updateSubscription(
        subscriptionId,
        {
          plan: selectedPlan,
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

  // Handle cancel renewal
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

  // Handle renew plan
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

  // Handle create tier
  const handleCreateTier = () => {
    setEditingTier(null);
    setShowTierForm(true);
  };

  // Handle edit tier
  const handleEditTier = (tier) => {
    setEditingTier(tier);
    setShowTierForm(true);
  };

  // Handle submit tier
  const handleSubmitTier = async (tierData) => {
    // Check if we're editing an existing tier or creating a new one
    const isEditing = editingTier !== null;
    const loadingToast = toastService.loading(
      isEditing
        ? "Updating subscription tier..."
        : "Creating subscription tier..."
    );

    try {
      if (isEditing) {
        // Update existing subscription
        await subscriptionService.updateSubscription(editingTier.id, {
          ...tierData,
          updatedAt: new Date().toISOString(),
        });
        toastService.dismiss(loadingToast);
        toastService.success("Subscription tier updated successfully");
      } else {
        // Create new subscription
        await subscriptionService.createSubscription({
          ...tierData,
          createdAt: new Date().toISOString(),
          status: "active",
        });
        toastService.dismiss(loadingToast);
        toastService.success("Subscription tier created successfully");
      }

      setShowTierForm(false);
      setEditingTier(null);
      // Refresh plans
      const subscriptions = await subscriptionService.getAllSubscriptions();
      setPlans(subscriptions);
    } catch (error) {
      toastService.dismiss(loadingToast);
      toastService.error(
        `Failed to ${isEditing ? "update" : "create"} subscription tier: ${error.message
        }`
      );
    }
  };

  // Handle deactivate tier
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

  // Handle publish tier
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
      <div>
        {/* Plans Container */}
        <div className={styles2.plansContainer}>
          <div className={styles2.plansHeader}>
            <h2>Manage Plans</h2>
            {canWriteUsers && (
              <Button
                onClick={handleCreateTier}
                className={styles2.createButton}
              >
                <Plus className="w-4 h-4" />
                Create New Tier
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className={styles2.loadingContainer}>
              <Loader />
            </div>
          ) : plans.length === 0 ? (
            <div className={styles2.emptyState}>
              <p>No subscription plans found</p>
              {canWriteUsers && (
                <button
                  onClick={handleCreateTier}
                  className={styles2.createButton}
                >
                  <Plus className="w-4 h-4" />
                  Create New Tier
                </button>
              )}
            </div>
          ) : (
            <div className={styles.plansGrid}>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={styles.planCard}
                >
                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>{plan.title}</h3>
                    <div className={plan.status === "active" ? styles.planBadge : styles.inactiveBadge}>
                      {plan.status.toUpperCase()}
                    </div>
                  </div>


                  <div className={styles.planPrice}>
                    {plan.currency} - ${plan.purchasePrice}
                  </div>


                  <div className={styles.planStats}>
                    <div className={styles.planDuration}>
                      <Calendar size={16} style={{ marginRight: "5px" }} />
                      <span>
                        {new Date(plan.startDateTime).toLocaleDateString()} &rarr;{" "}
                        {new Date(plan.endDateTime).toLocaleDateString()}
                      </span>
                    </div>
                    <p>👥 Contacts: {plan.limits.contacts || 0}</p>
                    <p>💬 Messages: {plan.limits.messages || 0}</p>
                    <p>📞 Voice Call: {plan.limits.voiceCallDuration || 0} mins</p>
                    <p>🎥 Video Call: {plan.limits.videoCallDuration || 0} mins</p>
                  </div>

                  {plan.features?.length > 0 && (
                    <div className={styles.featuresContainer}>
                      <h4 >Features:</h4>
                      <ul className={styles.planFeatures}>
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className={styles.planFeature}>
                            <span className={styles.checkmark}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {canUpdateUsers && (
                    <div className={styles.planActions}>
                      <div className="flex gap-2">
                        <Button onClick={() => handleEditTier(plan)} className={`${styles.actionButton}`}>
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDeactivateTier(plan.id || index)}
                          className={`${styles.actionButton} ${styles.deactivateButton}`}
                          disabled={plan.status === "inactive"}
                        >
                          Deactivate
                        </Button>
                      </div>
                      <Button
                        variant="secondary"
                        onClick={() => handlePublishTier(plan.id || index)}
                        className={`${styles.actionButton} ${styles.publishButton}`}
                        disabled={plan.status === "active"}
                      >
                        Publish
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles2.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles2.paginationButton}
              >
                Previous
              </button>
              <span className={styles2.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles2.paginationButton}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Subscription Tier Form Modal */}
        {showTierForm && (
          <div className={styles2.modal}>
            <div className={styles2.modalContent}>
              <button
                onClick={() => setShowTierForm(false)}
                className={styles2.closeButton}
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className={styles2.modalTitle}>
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
      </div>
    </AdminLayout>
  );
};

export default ManagePlans;
