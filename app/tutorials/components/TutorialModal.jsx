"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import styles from "../tutorials.module.css";
import { createPortal } from "react-dom";

export default function TutorialModal({ isOpen, onClose, tutorial, onSave }) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    setMounted(true);
    const element = document.createElement("div");
    document.body.appendChild(element);
    setPortalElement(element);

    return () => {
      document.body.removeChild(element);
      setMounted(false);
    };
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "pdf",
    url: "",
    isVisible: true,
  });

  useEffect(() => {
    if (tutorial) {
      setFormData({
        title: tutorial.title || "",
        description: tutorial.description || "",
        type: tutorial.type || "pdf",
        url: tutorial.url || "",
        isVisible: tutorial.isVisible !== undefined ? tutorial.isVisible : true,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        type: "pdf",
        url: "",
        isVisible: true,
      });
    }
  }, [tutorial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      createdAt: tutorial?.createdAt || new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you would handle file upload to a server here
      // For now, we'll just create a temporary URL
      setFormData((prev) => ({
        ...prev,
        url: URL.createObjectURL(file),
      }));
    }
  };

  if (!mounted) return null;

  if (!mounted || !portalElement) return null;

  return createPortal(
    isOpen ? (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>
              {tutorial ? "Edit Tutorial" : "Add New Tutorial"}
            </h2>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
              </Select>
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="file">Upload {formData.type.toUpperCase()}</Label>
              <Input
                id="file"
                type="file"
                accept={formData.type === "pdf" ? ".pdf" : "video/*"}
                onChange={handleFileChange}
              />
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="url">Or provide a URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder={`Enter ${formData.type} URL`}
              />
            </div>

            <div className={styles.formActions}>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {tutorial ? "Update" : "Create"} Tutorial
              </Button>
            </div>
          </form>
        </div>
      </div>
    ) : null,
    portalElement
  );
}
