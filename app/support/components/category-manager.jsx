"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Plus, Edit2, Trash2, ChevronRight, FolderPlus } from "lucide-react";
import { toast } from "react-hot-toast";
import { supportCategoriesService } from "@/lib/services/support-categories-service";
import styles from "./category-manager.module.css";

export function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategoryDescription, setNewSubcategoryDescription] =
    useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = supportCategoriesService.subscribeToCategories(
      (updatedCategories) => {
        setCategories(updatedCategories);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const loadingToast = toast.loading("Adding category...");
        await supportCategoriesService.addCategory({
          name: newCategoryName.trim(),
          description: newCategoryDescription.trim(),
        });
        toast.success("Category added successfully", { id: loadingToast });
        setNewCategoryName("");
        setNewCategoryDescription("");
        setIsAddingCategory(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleAddSubcategory = async (categoryId) => {
    if (newSubcategoryName.trim()) {
      try {
        const loadingToast = toast.loading("Adding subcategory...");
        await supportCategoriesService.addSubcategory(categoryId, {
          name: newSubcategoryName.trim(),
          description: newSubcategoryDescription.trim(),
        });
        toast.success("Subcategory added successfully", { id: loadingToast });
        setNewSubcategoryName("");
        setNewSubcategoryDescription("");
        setIsAddingSubcategory(null);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const loadingToast = toast.loading("Deleting category...");
        await supportCategoriesService.deleteCategory(categoryId);
        toast.success("Category deleted successfully", { id: loadingToast });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const loadingToast = toast.loading("Deleting subcategory...");
        await supportCategoriesService.deleteSubcategory(
          categoryId,
          subcategoryId
        );
        toast.success("Subcategory deleted successfully", { id: loadingToast });
      } catch (error) {
        toast.error(error.message);
      }
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
