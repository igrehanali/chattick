"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Plus, Edit2, Trash2, ChevronRight, FolderPlus } from "lucide-react";
import styles from "./category-manager.module.css";

const initialCategories = [
  {
    id: 1,
    name: "Account Issues",
    description: "Issues related to user accounts and access",
    subcategories: [
      {
        id: 1,
        name: "Login Problems",
        description: "Issues with signing into accounts",
      },
      {
        id: 2,
        name: "Password Reset",
        description: "Help with password recovery",
      },
      {
        id: 3,
        name: "Account Access",
        description: "General account access issues",
      },
    ],
  },
  {
    id: 2,
    name: "Technical Support",
    description: "General technical issues and troubleshooting",
    subcategories: [
      {
        id: 4,
        name: "Website Issues",
        description: "Problems with website functionality",
      },
      {
        id: 5,
        name: "App Problems",
        description: "Mobile and desktop app issues",
      },
      {
        id: 6,
        name: "Performance Issues",
        description: "Speed and performance related problems",
      },
    ],
  },
];

export function CategoryManager() {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryDescription, setNewSubcategoryDescription] =
    useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now(),
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
        subcategories: [],
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryDescription("");
      setIsAddingCategory(false);
    }
  };

  const handleAddSubcategory = (categoryId) => {
    if (newSubcategoryName.trim()) {
      setCategories(
        categories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              subcategories: [
                ...category.subcategories,
                {
                  id: Date.now(),
                  name: newSubcategoryName.trim(),
                  description: newSubcategoryDescription.trim(),
                },
              ],
            };
          }
          return category;
        })
      );
      setNewSubcategoryName("");
      setNewSubcategoryDescription("");
      setIsAddingSubcategory(null);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    }
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      setCategories(
        categories.map((category) => {
          if (category.id === categoryId) {
            return {
              ...category,
              subcategories: category.subcategories.filter(
                (sub) => sub.id !== subcategoryId
              ),
            };
          }
          return category;
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Support Categories</h2>
        <Button onClick={() => setIsAddingCategory(true)}>
          <Plus className={styles.buttonIcon} />
          Add Category
        </Button>
      </div>

      {isAddingCategory && (
        <div className={styles.addForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className={styles.input}
            />
            <input
              type="text"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              placeholder="Enter category description (optional)"
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button onClick={handleAddCategory}>Save</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddingCategory(false);
                setNewCategoryName("");
                setNewCategoryDescription("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className={styles.categoriesList}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryItem}>
            <div className={styles.categoryHeader}>
              <ChevronRight className={styles.chevron} />
              <div className={styles.categoryInfo}>
                <span className={styles.categoryName}>{category.name}</span>
                {category.description && (
                  <span className={styles.categoryDescription}>
                    {category.description}
                  </span>
                )}
              </div>
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingSubcategory(category.id)}
                >
                  <FolderPlus className={styles.actionIcon} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 className={styles.actionIcon} />
                </Button>
              </div>
            </div>

            <div className={styles.subcategoriesList}>
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className={styles.subcategoryItem}>
                  <div className={styles.subcategoryInfo}>
                    <span className={styles.subcategoryName}>
                      {subcategory.name}
                    </span>
                    {subcategory.description && (
                      <span className={styles.subcategoryDescription}>
                        {subcategory.description}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleDeleteSubcategory(category.id, subcategory.id)
                    }
                  >
                    <Trash2 className={styles.actionIcon} />
                  </Button>
                </div>
              ))}

              {isAddingSubcategory === category.id && (
                <div className={styles.addForm}>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                      placeholder="Enter subcategory name"
                      className={styles.input}
                    />
                    <input
                      type="text"
                      value={newSubcategoryDescription}
                      onChange={(e) =>
                        setNewSubcategoryDescription(e.target.value)
                      }
                      placeholder="Enter subcategory description (optional)"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.buttonGroup}>
                    <Button onClick={() => handleAddSubcategory(category.id)}>
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsAddingSubcategory(null);
                        setNewSubcategoryName("");
                        setNewSubcategoryDescription("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
