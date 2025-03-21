"use client";

import { useState } from "react";
import styles from "../page.module.css";

export default function SubscriptionTierForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      startDateTime: "",
      endDateTime: "",
      priceInCurrency: "",
      priceInPoints: "",
      features: [],
      maxWithdrawalsPerMonth: "",
      maxWithdrawalsPerDay: "",
      maxPointsPerMonth: "",
      maxTotalPoints: "",
      purchaseablePoints: "",
      pointsPerPlan: "",
      referralBonusPoints: "",
      maxGroupsPerUser: "",
      maxContactsPerUser: "",
      maxMessages: "",
      voiceCallDuration: "",
      videoCallDuration: "",
      isActive: true,
      isPublished: false,
    }
  );

  const [feature, setFeature] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const addFeature = () => {
    if (feature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature.trim()],
      }));
      setFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="startDateTime">Start Date</label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDateTime">End Date</label>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="priceInCurrency">Price (Currency)</label>
          <input
            type="number"
            id="priceInCurrency"
            name="priceInCurrency"
            value={formData.priceInCurrency}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priceInPoints">Price (Points)</label>
          <input
            type="number"
            id="priceInPoints"
            name="priceInPoints"
            value={formData.priceInPoints}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Features</label>
        <div className={styles.featureInput}>
          <input
            type="text"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="Add a feature"
          />
          <button
            type="button"
            onClick={addFeature}
            className={styles.addButton}
          >
            Add
          </button>
        </div>
        <ul className={styles.featureList}>
          {formData.features.map((feat, index) => (
            <li key={index} className={styles.featureItem}>
              {feat}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className={styles.removeButton}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="maxWithdrawalsPerMonth">Max Withdrawals/Month</label>
          <input
            type="number"
            id="maxWithdrawalsPerMonth"
            name="maxWithdrawalsPerMonth"
            value={formData.maxWithdrawalsPerMonth}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="maxWithdrawalsPerDay">Max Withdrawals/Day</label>
          <input
            type="number"
            id="maxWithdrawalsPerDay"
            name="maxWithdrawalsPerDay"
            value={formData.maxWithdrawalsPerDay}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="maxPointsPerMonth">Max Points/Month</label>
          <input
            type="number"
            id="maxPointsPerMonth"
            name="maxPointsPerMonth"
            value={formData.maxPointsPerMonth}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="maxTotalPoints">Max Total Points</label>
          <input
            type="number"
            id="maxTotalPoints"
            name="maxTotalPoints"
            value={formData.maxTotalPoints}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="purchaseablePoints">Purchaseable Points</label>
          <input
            type="number"
            id="purchaseablePoints"
            name="purchaseablePoints"
            value={formData.purchaseablePoints}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pointsPerPlan">Points per Plan</label>
          <input
            type="number"
            id="pointsPerPlan"
            name="pointsPerPlan"
            value={formData.pointsPerPlan}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="referralBonusPoints">Referral Bonus Points</label>
          <input
            type="number"
            id="referralBonusPoints"
            name="referralBonusPoints"
            value={formData.referralBonusPoints}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="maxGroupsPerUser">Max Groups/User</label>
          <input
            type="number"
            id="maxGroupsPerUser"
            name="maxGroupsPerUser"
            value={formData.maxGroupsPerUser}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="maxContactsPerUser">Max Contacts/User</label>
          <input
            type="number"
            id="maxContactsPerUser"
            name="maxContactsPerUser"
            value={formData.maxContactsPerUser}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="maxMessages">Max Messages</label>
          <input
            type="number"
            id="maxMessages"
            name="maxMessages"
            value={formData.maxMessages}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="voiceCallDuration">
            Voice Call Duration (minutes)
          </label>
          <input
            type="number"
            id="voiceCallDuration"
            name="voiceCallDuration"
            value={formData.voiceCallDuration}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="videoCallDuration">
            Video Call Duration (minutes)
          </label>
          <input
            type="number"
            id="videoCallDuration"
            name="videoCallDuration"
            value={formData.videoCallDuration}
            onChange={handleInputChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
            />
            Active
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleCheckboxChange}
            />
            Published
          </label>
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Save Subscription Tier
      </button>
    </form>
  );
}
