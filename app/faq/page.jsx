"use client";
import { useState } from "react";
import styles from "./page.module.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiBarChart2,
} from "react-icons/fi";
import FAQAnalytics from "./components/FAQAnalytics";
import FAQModal from "./components/FAQModal";
import CategoryModal from "./components/CategoryModal";
import { AdminLayout } from "../components/layout/admin-layout";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
      category: 1,
      isVisible: true,
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for payment processing.",
      category: 2,
      isVisible: true,
    },
    {
      id: 3,
      question: "How can I contact technical support?",
      answer:
        "You can reach our technical support team through the help desk portal or by emailing support@example.com.",
      category: 3,
      isVisible: true,
    },
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Account" },
    { id: 2, name: "Billing" },
    { id: 3, name: "Technical Support" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => { },
    variant: 'default'
  });

  const handleAddNewFAQ = () => {
    setCurrentFaq(null);
    setIsFAQModalOpen(true);
  };

  const handleAddNewCategory = () => {
    setCurrentCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleEditFAQ = (faq) => {
    setCurrentFaq(faq);
    setIsFAQModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsCategoryModalOpen(true);
  };


  const filteredFAQs = faqs.filter(
    (faq) =>
      (selectedCategory === "all" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Update the ConfirmPopup component
  const ConfirmPopup = ({ title, message, onConfirm, onCancel, confirmText, cancelText, variant }) => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <p className={styles.modalMessage}>{message}</p>
          <div className={styles.modalActions}>
            <Button variant="outline" onClick={onCancel}>
              {cancelText || 'Cancel'}
            </Button>
            <Button variant={variant} onClick={onConfirm}>
              {confirmText || 'Confirm'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Update the handlers
  const handleDeleteFAQ = (id) => {
    setConfirmConfig({
      title: 'Delete FAQ',
      message: 'Are you sure you want to delete this FAQ?',
      confirmText: 'Delete',
      variant: 'destructive',
      onConfirm: () => {
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  const handleToggleVisibility = (faq) => {
    setConfirmConfig({
      title: `${faq.isVisible ? 'Hide' : 'Show'} FAQ`,
      message: `Are you sure you want to ${faq.isVisible ? 'hide' : 'show'} this FAQ?`,
      confirmText: faq.isVisible ? 'Hide' : 'Show',
      variant: 'default',
      onConfirm: () => {
        setFaqs(faqs.map(f =>
          f.id === faq.id ? { ...f, isVisible: !f.isVisible } : f
        ));
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  const handleDeleteCategory = async (id) => {
    const categoryToDelete = categories.find((c) => c.id === id);
    if (!categoryToDelete) {
      console.error("Category not found");
      return;
    }
    const associatedFAQs = faqs.filter((faq) => faq.category === id);
    if (associatedFAQs.length > 0) {
      setConfirmConfig({
        title: 'Cannot Delete Category',
        message: `Cannot delete category "${categoryToDelete.name}" because it has ${associatedFAQs.length} associated FAQ${associatedFAQs.length === 1 ? '' : 's'}. Please reassign or delete the associated FAQs first.`,
        confirmText: 'OK',
        variant: 'default',
        onConfirm: () => setShowConfirm(false)
      });
      setShowConfirm(true);
      return;
    }

    setConfirmConfig({
      title: 'Delete Category',
      message: `Are you sure you want to delete the category "${categoryToDelete.name}"?\n\nThis action cannot be undone and will permanently remove this category from the system.`,
      confirmText: 'Delete',
      variant: 'destructive',
      onConfirm: () => {
        setCategories(categories.filter((category) => category.id !== id));
        if (selectedCategory === id) {
          setSelectedCategory("all");
        }
        setShowConfirm(false);
      }
    });
    setShowConfirm(true);
  };

  // Update the render section
  return (
    <AdminLayout>
      {showConfirm && (
        <ConfirmPopup
          {...confirmConfig}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div>
        <div className={styles.header}>
          <h1 className={styles.title}> Surveys & FAQs</h1>
          <div className={styles.tabs}>
            <Link href="/faq" className={styles.tabActive}>
              FAQs
            </Link>
            <Link href="/faq/surveys" className={styles.tab}>
              Surveys
            </Link>
          </div>
          <div className={styles.headerButtons}>
            <Button onClick={() => setShowAnalytics(!showAnalytics)}>
              <FiBarChart2 className={styles.buttonIcon} />
              {showAnalytics ? "Hide Analytics" : "Show Analytics"}
            </Button>
            <Button onClick={handleAddNewCategory}>
              <FiPlus className={styles.buttonIcon} />
              Add Category
            </Button>
            <Button onClick={handleAddNewFAQ}>
              <FiPlus className={styles.buttonIcon} />
              Add FAQ
            </Button>
          </div>
        </div>



        {showAnalytics && <FAQAnalytics faqs={faqs} categories={categories} />}

        <div className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Name</th>
                  <th className={styles.tableHeaderCell}>FAQ Count</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {categories.map((category) => {
                  const faqCount = faqs.filter(
                    (faq) => faq.category === category.id
                  ).length;
                  return (
                    <tr key={category.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>{category.name}</td>
                      <td className={styles.tableCell}>{faqCount}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.actions}>
                          <button
                            onClick={() => handleEditCategory(category)}
                            className={`${styles.actionButton} ${styles.editButton}`}
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>FAQs</h2>
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search FAQs..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className={styles.categoryFilter}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Question</th>
                  <th className={styles.tableHeaderCell}>Answer</th>
                  <th className={styles.tableHeaderCell}>Category</th>
                  <th className={styles.tableHeaderCell}>Visibility</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredFAQs.map((faq) => (
                  <tr key={faq.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{faq.question}</td>
                    <td className={`${styles.tableCell} ${styles.answerCell}`}>
                      {faq.answer}
                    </td>
                    <td className={styles.tableCell}>
                      {categories.find((c) => c.id === faq.category)?.name}
                    </td>
                    <td className={styles.tableCell}>
                      <span
                        className={`${styles.badge} ${faq.isVisible
                          ? styles.badgeVisible
                          : styles.badgeHidden
                          }`}
                      >
                        {faq.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        onClick={() => handleToggleVisibility(faq)}
                        className={`${styles.visibilityButton} ${faq.isVisible ? styles.visible : styles.hidden
                          }`}
                      >
                        {faq.isVisible ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.actions}>
                        <button
                          onClick={() => handleEditFAQ(faq)}
                          className={`${styles.actionButton} ${styles.editButton}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteFAQ(faq.id)}
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FAQModal
            isOpen={isFAQModalOpen}
            onClose={() => setIsFAQModalOpen(false)}
            faq={currentFaq}
            categories={categories}  // Add this line to pass categories
            onSave={(formData) => {
              if (currentFaq) {
                setFaqs(
                  faqs.map((f) =>
                    f.id === currentFaq.id ? { ...f, ...formData } : f
                  )
                );
              } else {
                setFaqs([...faqs, { id: Date.now(), ...formData }]);
              }
              setIsFAQModalOpen(false);
            }}
          />

          <CategoryModal
            isOpen={isCategoryModalOpen}
            onClose={() => setIsCategoryModalOpen(false)}
            category={currentCategory}
            onSave={async (formData) => {
              try {
                if (currentCategory) {
                  // TODO: Implement update category API call
                  const isDuplicate = categories.some(
                    (c) =>
                      c.name.toLowerCase() === formData.name.toLowerCase() &&
                      c.id !== currentCategory.id
                  );
                  if (isDuplicate) {
                    throw new Error(
                      `A category with the name "${formData.name}" already exists`
                    );
                  }
                  setCategories(
                    categories.map((c) =>
                      c.id === currentCategory.id ? { ...c, ...formData } : c
                    )
                  );
                } else {
                  // TODO: Implement create category API call
                  const isDuplicate = categories.some(
                    (c) => c.name.toLowerCase() === formData.name.toLowerCase()
                  );
                  if (isDuplicate) {
                    throw new Error(
                      `A category with the name "${formData.name}" already exists`
                    );
                  }
                  setCategories([
                    ...categories,
                    { id: Date.now(), ...formData },
                  ]);
                }
                setIsCategoryModalOpen(false);
              } catch (error) {
                throw error;
              }
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
