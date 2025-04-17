"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiBarChart2,
} from "react-icons/fi";
import SurveyResponses from "../components/SurveyResponses";
import SurveyAnalytics from "../components/SurveyAnalytics";
import SurveyModal from "../components/SurveyModal";
import { AdminLayout } from "../../components/layout/admin-layout";
import Link from "next/link";
import ConfirmDialog from "@/app/contests/components/ConfirmDialog";
import { surveyService } from "@/lib/services/survey-service";
import { toast } from "react-hot-toast";

export default function SurveysPage() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      const data = await surveyService.getAllSurveys();
      setSurveys(data);
    } catch (error) {
      console.error("Error loading surveys:", error);
      toast.error("Failed to load surveys");
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isResponsesModalOpen, setIsResponsesModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddNewSurvey = () => {
    setCurrentSurvey(null);
    setIsSurveyModalOpen(true);
  };

  const handleEditSurvey = (survey) => {
    setCurrentSurvey(survey);
    setIsSurveyModalOpen(true);
  };

  const handleDeleteSurvey = (id) => {
    setConfirmConfig({
      title: "Delete Survey",
      message: "Are you sure you want to delete this Survey?",
      onConfirm: async () => {
        try {
          await surveyService.deleteSurvey(id);
          setSurveys(surveys.filter((survey) => survey.id !== id));
          toast.success("Survey deleted successfully");
          setShowConfirm(false);
        } catch (error) {
          console.error("Error deleting survey:", error);
          toast.error("Failed to delete survey");
        }
      },
    });
    setShowConfirm(true);
  };

  const handleViewResponses = (surveyId) => {
    setSelectedSurveyId(surveyId);
    setIsResponsesModalOpen(true);
  };

  const handleViewAnalytics = (surveyId) => {
    setSelectedSurveyId(surveyId);
    setIsAnalyticsModalOpen(true);
  };

  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      {showConfirm && (
        <ConfirmDialog
          {...confirmConfig}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Survey Management</h1>

          <div className={styles.tabs}>
            <Link href="/faq" className={styles.tabActive}>
              FAQs
            </Link>
            <Link href="/faq/surveys" className={styles.tab}>
              Surveys
            </Link>
          </div>
          <div className={styles.headerButtons}>
            <button onClick={handleAddNewSurvey} className={styles.addButton}>
              <FiPlus className={styles.buttonIcon} />
              Add Survey
            </button>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search surveys..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableHeaderCell}>Title</th>
                <th className={styles.tableHeaderCell}>Description</th>
                <th className={styles.tableHeaderCell}>Period</th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th className={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredSurveys.map((survey) => (
                <tr key={survey.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{survey.title}</td>
                  <td
                    className={`${styles.tableCell} ${styles.descriptionCell}`}
                  >
                    {survey.description}
                  </td>
                  <td className={styles.tableCell}>
                    {new Date(survey.startDate).toLocaleDateString()} -
                    {new Date(survey.endDate).toLocaleDateString()}
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.badge} ${
                        survey.isActive
                          ? styles.badgeActive
                          : styles.badgeInactive
                      }`}
                    >
                      {survey.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleViewResponses(survey.id)}
                        className={`${styles.actionButton} ${styles.viewButton}`}
                        title="View Responses"
                      >
                        <FiSearch />
                      </button>
                      <button
                        onClick={() => handleViewAnalytics(survey.id)}
                        className={`${styles.actionButton} ${styles.analyticsButton}`}
                        title="View Analytics"
                      >
                        <FiBarChart2 />
                      </button>
                      <button
                        onClick={() => handleEditSurvey(survey)}
                        className={`${styles.actionButton} ${styles.editButton}`}
                        title="Edit Survey"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteSurvey(survey.id)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        title="Delete Survey"
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

        <SurveyModal
          isOpen={isSurveyModalOpen}
          onClose={() => setIsSurveyModalOpen(false)}
          survey={currentSurvey}
          onSave={async (formData) => {
            try {
              if (currentSurvey) {
                const updatedSurvey = await surveyService.updateSurvey(
                  currentSurvey.id,
                  formData
                );
                setSurveys(
                  surveys.map((s) =>
                    s.id === currentSurvey.id ? { ...s, ...updatedSurvey } : s
                  )
                );
                toast.success("Survey updated successfully");
              } else {
                const newSurvey = await surveyService.createSurvey(formData);
                setSurveys([...surveys, newSurvey]);
                toast.success("Survey created successfully");
              }
              setIsSurveyModalOpen(false);
            } catch (error) {
              console.error("Error saving survey:", error);
              toast.error("Failed to save survey");
            }
          }}
        />

        {isResponsesModalOpen && (
          <div className={styles.modal}>
            <div
              className={styles.modalOverlay}
              onClick={() => setIsResponsesModalOpen(false)}
            />
            <div className={styles.modalContainer}>
              <SurveyResponses
                surveyId={selectedSurveyId}
                onClose={() => setIsResponsesModalOpen(false)}
              />
            </div>
          </div>
        )}

        {isAnalyticsModalOpen && (
          <div className={styles.modal}>
            <div
              className={styles.modalOverlay}
              onClick={() => setIsAnalyticsModalOpen(false)}
            />
            <div className={styles.modalContainer}>
              <SurveyAnalytics
                surveyId={selectedSurveyId}
                onClose={() => setIsAnalyticsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
