"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import styles from "./ContestModal.module.css";
import { Timestamp } from "firebase/firestore";

export default function ContestModal({ isOpen, onClose, onSave, contest }) {
  const [formData, setFormData] = useState({
    contestId: "",
    contestName: "",
    contestType: "Daily",
    endDate: Timestamp.now(),
    entryPrice: 0,
    maxParticipants: 0,
    minParticipants: 0,
    participants: [],
    prizePool: 0,
    registrationEndDate: "",
    registrationStartDate: "",
    startDate: Timestamp.now(),
    status: "registering", // Default value
    totalWinner: 0,
    updatedAt: Timestamp.now(),
    winners: [],
    winningPrize: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contest) {
      setFormData({
        ...formData,
        ...contest,
      });
    }
  }, [contest]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contestName.trim()) {
      newErrors.contestName = "Contest name is required";
    }
    if (!formData.registrationStartDate) {
      newErrors.registrationStartDate = "Registration start date is required";
    }
    if (!formData.registrationEndDate) {
      newErrors.registrationEndDate = "Registration end date is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    if (
      new Date(formData.registrationEndDate) <=
      new Date(formData.registrationStartDate)
    ) {
      newErrors.registrationEndDate =
        "Registration end date must be after registration start date";
    }

    if (formData.minParticipants < 1) {
      newErrors.minParticipants = "Minimum participants must be at least 1";
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

    const isTimestampField = [
      "startDate",
      "endDate",
      "registrationStartDate",
      "registrationEndDate",
    ].includes(name);

    setFormData((prev) => ({
      ...prev,
      [name]: isTimestampField ? Timestamp.fromDate(new Date(value)) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.toDate) return "";
    const date = timestamp.toDate();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  if (!isOpen) return null;

  const renderField = (key, value) => {
    if (key.includes("Date")) {
      return (
        <div className={styles.formGroup} key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="datetime-local"
            id={key}
            name={key}
            value={
              value instanceof Timestamp
                ? formatTimestamp(value)
                : value || ""
            }
            onChange={handleChange}
            className={`${styles.input} ${errors[key] ? styles.error : ""}`}
          />
          {errors[key] && (
            <span className={styles.errorText}>{errors[key]}</span>
          )}
        </div>
      );
    } else if (typeof value === "string") {
      return (
        <div className={styles.formGroup} key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="text"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            className={`${styles.input} ${errors[key] ? styles.error : ""}`}
          />
          {errors[key] && (
            <span className={styles.errorText}>{errors[key]}</span>
          )}
        </div>
      );
    } else if (typeof value === "number") {
      return (
        <div className={styles.formGroup} key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="number"
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            className={`${styles.input} ${errors[key] ? styles.error : ""}`}
          />
          {errors[key] && (
            <span className={styles.errorText}>{errors[key]}</span>
          )}
        </div>
      );
    } else if (typeof value === "object" && Array.isArray(value)) {
      return (
        <div className={styles.formGroup} key={key}>
          <label htmlFor={key}>{key}</label>
          <textarea
            id={key}
            name={key}
            value={value.join(", ")}
            onChange={(e) =>
              handleChange({
                target: { name: key, value: e.target.value.split(", ") },
              })
            }
            className={`${styles.input} ${errors[key] ? styles.error : ""}`}
          />
          {errors[key] && (
            <span className={styles.errorText}>{errors[key]}</span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {contest ? "Edit Contest" : "Create New Contest"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {Object.entries(formData).map(([key, value]) =>
            renderField(key, value)
          )}
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
