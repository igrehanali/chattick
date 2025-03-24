"use client";

import { useState } from "react";
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
import SubscriptionTierForm from "./components/SubscriptionTierForm";

import { AdminLayout } from "../components/layout/admin-layout";

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTierForm, setShowTierForm] = useState(false);
  const [editingTier, setEditingTier] = useState(null);
  const itemsPerPage = 10;

  const stats = [
    {
      label: "Total Revenue",
      value: "$12,345",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Active Subscriptions",
      value: "1,234",
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Processing Payments",
      value: "56",
      icon: <CreditCard className="w-5 h-5 text-purple-500" />,
    },
    {
      label: "Pending Refunds",
      value: "23",
      icon: <RefreshCcw className="w-5 h-5 text-yellow-500" />,
    },
  ];

  const plans = [
    {
      name: "Basic Plan",
      price: "$9.99/mo",
      features: [
        "Up to 5 users",
        "10GB storage",
        "Basic support",
        "Basic analytics",
      ],
    },
    {
      name: "Pro Plan",
      price: "$19.99/mo",
      features: [
        "Up to 10 users",
        "50GB storage",
        "Priority support",
        "Advanced analytics",
      ],
    },
    {
      name: "Enterprise Plan",
      price: "$49.99/mo",
      features: [
        "Unlimited users",
        "500GB storage",
        "24/7 support",
        "Custom analytics",
      ],
    },
  ];

  const userSubscriptions = [
    {
      id: "1",
      userId: "U001",
      customer: "John Doe",
      plan: "Pro Plan",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      status: "active",
      autoRenew: true,
    },
    {
      id: "2",
      userId: "U002",
      customer: "Jane Smith",
      plan: "Enterprise Plan",
      startDate: "2024-01-14",
      endDate: "2025-01-14",
      status: "active",
      autoRenew: true,
    },
    {
      id: "3",
      userId: "U003",
      customer: "Bob Johnson",
      plan: "Basic Plan",
      startDate: "2024-01-13",
      endDate: "2024-07-13",
      status: "expired",
      autoRenew: false,
    },
  ];

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

  const handleChangePlan = (userId) => {
    // Implement plan change logic
    console.log("Change plan for user:", userId);
  };

  const handleCancelRenewal = (userId) => {
    // Implement cancel renewal logic
    console.log("Cancel renewal for user:", userId);
  };

  const handleRenewPlan = (userId) => {
    // Implement renew plan logic
    console.log("Renew plan for user:", userId);
  };

  const handleCreateTier = () => {
    setEditingTier(null);
    setShowTierForm(true);
  };

  const handleEditTier = (tier) => {
    setEditingTier(tier);
    setShowTierForm(true);
  };

  const handleSubmitTier = (tierData) => {
    console.log("Submitting tier:", tierData);
    // Here you would typically make an API call to save the tier
    setShowTierForm(false);
    setEditingTier(null);
  };

  const handleDeactivateTier = (tierId) => {
    console.log("Deactivating tier:", tierId);
    // Here you would typically make an API call to deactivate the tier
  };

  const handlePublishTier = (tierId) => {
    console.log("Publishing tier:", tierId);
    // Here you would typically make an API call to publish the tier
  };

  return (
    <AdminLayout>
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
            <button onClick={handleCreateTier} className={styles.createButton}>
              <Plus className="w-4 h-4" />
              Create New Tier
            </button>
          </div>
          <div className={styles.plansGrid}>
            {plans.map((plan, index) => (
              <div key={index} className={styles.planCard}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>{plan.price}</div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.planFeature}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
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
          <div className={styles.filterGroup}>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={styles.filterSelect}
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Months</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">All Plans</option>
              {plans.map((plan) => (
                <option key={plan.name} value={plan.name}>{plan.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.searchBar}>
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.filterContainer}>
            <Filter className="w-5 h-5 text-gray-400" />
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
                  <td className={styles.tableCell}>{subscription.customer}</td>
                  <td className={styles.tableCell}>{subscription.plan}</td>
                  <td className={styles.tableCell}>{subscription.startDate}</td>
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
    </AdminLayout>
  );
}
