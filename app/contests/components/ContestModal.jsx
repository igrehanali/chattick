"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import styles from "./ContestModal.module.css";

export default function ContestModal({ isOpen, onClose, onSave, contest }) {
  const [formData, setFormData] = useState({
    title: "",
    status: "Unpublished",
    registrationStartDateTime: "",
    registrationEndDateTime: "",
    startDateTime: "",
    endDateTime: "",
    minParticipants: 50,
    frequency: "Daily",
    prizeRanges: [
      {
        minParticipants: 50,
        maxParticipants: 100,
        prizePool: 1000,
        winnersCount: 3,
      },
    ],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contest) {
      setFormData({
        title: contest.title,
        status: contest.status,
        registrationStartDateTime: contest.registrationStartDateTime,
        registrationEndDateTime: contest.registrationEndDateTime,
        startDateTime: contest.startDateTime,
        endDateTime: contest.endDateTime,
        minParticipants: contest.minParticipants,
        frequency: contest.frequency,
        prizeRanges: contest.prizeRanges || [
          {
            minParticipants: 50,
            maxParticipants: 100,
            prizePool: 1000,
            winnersCount: 3,
          },
        ],
      });
    }
  }, [contest]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.registrationStartDateTime) {
      newErrors.registrationStartDateTime =
        "Registration start date is required";
    }
    if (!formData.registrationEndDateTime) {
      newErrors.registrationEndDateTime = "Registration end date is required";
    }
    if (!formData.startDateTime) {
      newErrors.startDateTime = "Start date is required";
    }
    if (!formData.endDateTime) {
      newErrors.endDateTime = "End date is required";
    }
    if (
      new Date(formData.registrationEndDateTime) <=
      new Date(formData.registrationStartDateTime)
    ) {
      newErrors.registrationEndDateTime =
        "Registration end date must be after registration start date";
    }
    if (new Date(formData.endDateTime) <= new Date(formData.startDateTime)) {
      newErrors.endDateTime = "End date must be after start date";
    }
    if (formData.minParticipants < 1) {
      newErrors.minParticipants = "Minimum participants must be at least 1";
    }
    if (formData.prizeRanges.length === 0) {
      newErrors.prizeRanges = "At least one prize range is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {contest ? "Edit Contest" : "Create New Contest"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`${styles.input} ${errors.title ? styles.error : ""}`}
            />
            {errors.title && (
              <span className={styles.errorText}>{errors.title}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="registrationStartDateTime">
              Registration Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="registrationStartDateTime"
              name="registrationStartDateTime"
              value={formData.registrationStartDateTime}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.registrationStartDateTime ? styles.error : ""
              }`}
            />
            {errors.registrationStartDateTime && (
              <span className={styles.errorText}>
                {errors.registrationStartDateTime}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="registrationEndDateTime">
              Registration End Date & Time
            </label>
            <input
              type="datetime-local"
              id="registrationEndDateTime"
              name="registrationEndDateTime"
              value={formData.registrationEndDateTime}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.registrationEndDateTime ? styles.error : ""
              }`}
            />
            {errors.registrationEndDateTime && (
              <span className={styles.errorText}>
                {errors.registrationEndDateTime}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDateTime">Start Date & Time</label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.startDateTime ? styles.error : ""
              }`}
            />
            {errors.startDateTime && (
              <span className={styles.errorText}>{errors.startDateTime}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endDateTime">End Date & Time</label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.endDateTime ? styles.error : ""
              }`}
            />
            {errors.endDateTime && (
              <span className={styles.errorText}>{errors.endDateTime}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="minParticipants">Minimum Participants</label>
            <input
              type="number"
              id="minParticipants"
              name="minParticipants"
              value={formData.minParticipants}
              onChange={handleChange}
              min="1"
              className={`${styles.input} ${
                errors.minParticipants ? styles.error : ""
              }`}
            />
            {errors.minParticipants && (
              <span className={styles.errorText}>{errors.minParticipants}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="frequency">Frequency</label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.startDate ? styles.error : ""
              }`}
            />
            {errors.startDate && (
              <span className={styles.errorText}>{errors.startDate}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`${styles.input} ${
                errors.endDate ? styles.error : ""
              }`}
            />
            {errors.endDate && (
              <span className={styles.errorText}>{errors.endDate}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prize">Prize</label>
            <input
              type="text"
              id="prize"
              name="prize"
              value={formData.prize}
              onChange={handleChange}
              className={`${styles.input} ${errors.prize ? styles.error : ""}`}
              placeholder="e.g., 1000 points"
            />
            {errors.prize && (
              <span className={styles.errorText}>{errors.prize}</span>
            )}
          </div>

          <div className={styles.modalActions}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {contest ? "Update Contest" : "Create Contest"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
