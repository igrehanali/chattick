"use client";

import { useState, useEffect } from "react";
import styles from "./CategoryModal.module.css";
import { FiX, FiAlertCircle } from "react-icons/fi";
import { Button } from "../../components/ui/button";

export default function CategoryModal({ isOpen, onClose, category, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [category]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must not exceed 500 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message || "Failed to save category" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {category ? "Edit Category" : "Add New Category"}
          </h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FiX />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={styles.input}
              required
              maxLength={50}
            />
            {errors.name && (
              <div className={styles.errorMessage}>
                <FiAlertCircle />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={styles.textarea}
              rows={3}
              maxLength={500}
            />
            {errors.description && (
              <div className={styles.errorMessage}>
                <FiAlertCircle />
                <span>{errors.description}</span>
              </div>
            )}
            <div className={styles.characterCount}>
              {formData.description.length}/500
            </div>
          </div>

          {errors.submit && (
            <div className={styles.errorMessage}>
              <FiAlertCircle />
              <span>{errors.submit}</span>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : category
                ? "Update Category"
                : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
