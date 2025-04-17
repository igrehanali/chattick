"use client";
import { useState, useEffect } from "react";
import styles from "./SubscriptionTierForm.module.css";
import { Plus, X } from "lucide-react";

export default function SubscriptionTierForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    startDateTime: "",
    endDateTime: "",
    purchasePrice: "",
    currency: "USD",
    renewalPoints: "",
    features: [],
    limits: {
      withdrawals: {
        perDay: "",
        perMonth: "",
      },
      points: {
        monthlyAccumulation: "",
        totalAccumulation: "",
        purchaseLimit: "",
      },
      planPoints: "",
      referralBonus: "",
      groups: "",
      contacts: "",
      messages: "",
      voiceCallDuration: "",
      videoCallDuration: "",
    },
    newFeature: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddFeature = () => {
    if (formData.newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, prev.newFeature.trim()],
        newFeature: "",
      }));
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subscriptionData = {
        ...formData,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await onSubmit(subscriptionData);
    } catch (error) {
      console.error("Error submitting subscription form:", error);
      throw new Error(`Failed to submit subscription form: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Start Date & Time</label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>End Date & Time</label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Purchase Price</label>
          <div className={styles.priceInput}>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Renewal Points</label>
          <input
            type="number"
            name="renewalPoints"
            value={formData.renewalPoints}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Withdrawal Limits</h3>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Per Day</label>
            <input
              type="number"
              name="limits.withdrawals.perDay"
              value={formData.limits.withdrawals.perDay}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Per Month</label>
            <input
              type="number"
              name="limits.withdrawals.perMonth"
              value={formData.limits.withdrawals.perMonth}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Points Limits</h3>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Monthly Accumulation</label>
            <input
              type="number"
              name="limits.points.monthlyAccumulation"
              value={formData.limits.points.monthlyAccumulation}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Total Accumulation</label>
            <input
              type="number"
              name="limits.points.totalAccumulation"
              value={formData.limits.points.totalAccumulation}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Purchase Limit</label>
            <input
              type="number"
              name="limits.points.purchaseLimit"
              value={formData.limits.points.purchaseLimit}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Other Limits</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Plan Points</label>
            <input
              type="number"
              name="limits.planPoints"
              value={formData.limits.planPoints}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Referral Bonus Points</label>
            <input
              type="number"
              name="limits.referralBonus"
              value={formData.limits.referralBonus}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Max Groups</label>
            <input
              type="number"
              name="limits.groups"
              value={formData.limits.groups}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Max Contacts</label>
            <input
              type="number"
              name="limits.contacts"
              value={formData.limits.contacts}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Max Messages</label>
            <input
              type="number"
              name="limits.messages"
              value={formData.limits.messages}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Voice Call Duration (minutes)</label>
            <input
              type="number"
              name="limits.voiceCallDuration"
              value={formData.limits.voiceCallDuration}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Video Call Duration (minutes)</label>
            <input
              type="number"
              name="limits.videoCallDuration"
              value={formData.limits.videoCallDuration}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Features</h3>
        <div className={styles.featureInput}>
          <input
            type="text"
            name="newFeature"
            value={formData.newFeature}
            onChange={handleChange}
            placeholder="Add a feature..."
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className={styles.addFeatureButton}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <ul className={styles.featureList}>
          {formData.features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              {feature}
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className={styles.removeFeatureButton}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {initialData ? "Update Subscription" : "Create Subscription"}
        </button>
      </div>
    </form>
  );
}
