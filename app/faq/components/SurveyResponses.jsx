"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import { FiSearch, FiDownload } from "react-icons/fi";
import { surveyService } from "@/lib/services/survey-service";
import { toast } from "react-hot-toast";

export default function SurveyResponses({ surveyId, onClose }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    loadResponses();
  }, [surveyId]);

  const loadResponses = async () => {
    try {
      const data = await surveyService.getSurveyResponses(surveyId);
      setResponses(data);
    } catch (error) {
      console.error("Error loading responses:", error);
      toast.error("Failed to load survey responses");
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleExportResponses = () => {
    console.log("Exporting responses...");
  };

  const filteredResponses = responses.filter(
    (response) =>
      response.respondent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      response.answers.some((answer) =>
        answer.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h2>Survey Responses</h2>
        <div className={styles.modalControls}>
          <div className={styles.searchWrapper}>
            {/* <FiSearch className={styles.searchIcon} /> */}
            <input
              type="text"
              placeholder="Search responses..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Respondent</th>
              <th className={styles.tableHeaderCell}>Submitted At</th>
              <th className={styles.tableHeaderCell}>Responses</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {filteredResponses.map((response) => (
              <tr key={response.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{response.respondent}</td>
                <td className={styles.tableCell}>
                  {new Date(response.submittedAt).toLocaleString()}
                </td>
                <td className={styles.tableCell}>
                  <div className={styles.answersList}>
                    {response.answers.map((answer, index) => (
                      <div key={index} className={styles.answerItem}>
                        <strong>{answer.question}:</strong> {answer.answer}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
