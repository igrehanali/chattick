"use client";
import React, { useState, useEffect } from "react";
import styles from "./GiftModal.module.css";
import { Button } from "@/app/components/ui/button";

export default function GiftModal({ isOpen, onClose, gift, giftType, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    costPoints: "",
    rewardPoints: "",
    gifImageUrl: "",
    gifUrl: "",
  });

  useEffect(() => {
    if (gift) {
      setFormData({
        name: gift.name,
        description: gift.description,
        costPoints: gift.costPoints,
        rewardPoints: gift.rewardPoints,
        gifImageUrl: gift.gifImageUrl,
        gifUrl: gift.gifUrl,
      });
    }
  }, [gift]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <h2 className={styles.modalTitle}>
            {gift ? "Edit Gift" : "Add New Gift"} -{" "}
            {giftType === "gif" ? "GIF Gift" : "Subscription Plan"}
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={styles.textarea}
                rows="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="costPoints">Cost Points</label>
              <input
                type="number"
                id="costPoints"
                name="costPoints"
                value={formData.costPoints}
                onChange={handleChange}
                required
                min="1"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rewardPoints">Reward Points</label>
              <input
                type="number"
                id="rewardPoints"
                name="rewardPoints"
                value={formData.rewardPoints}
                onChange={handleChange}
                required
                min="0"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gifImageUrl">GIF Image URL</label>
              <input
                type="url"
                id="gifImageUrl"
                name="gifImageUrl"
                value={formData.gifImageUrl}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gifUrl">GIF URL</label>
              <input
                type="url"
                id="gifUrl"
                name="gifUrl"
                value={formData.gifUrl}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.modalActions}>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{gift ? "Update" : "Create"}</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
