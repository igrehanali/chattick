"use client";

import { useState, useEffect } from "react";
import styles from "./FAQModal.module.css";

export default function SurveyModal({ isOpen, onClose, survey, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [{
      id: Date.now(),
      text: "",
      type: "text",
      options: []
    }],
    isActive: true,
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    if (survey) {
      setFormData({
        title: survey.title || "",
        description: survey.description || "",
        questions: survey.questions || [{
          id: Date.now(),
          text: "",
          type: "text",
          options: []
        }],
        isActive: survey.isActive !== undefined ? survey.isActive : true,
        startDate: survey.startDate || "",
        endDate: survey.endDate || ""
      });
    } else {
      setFormData({
        title: "",
        description: "",
        questions: [{
          id: Date.now(),
          text: "",
          type: "text",
          options: []
        }],
        isActive: true,
        startDate: "",
        endDate: ""
      });
    }
  }, [survey]);

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, {
        id: Date.now(),
        text: "",
        type: "text",
        options: []
      }]
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options.push("");
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {survey ? "Edit Survey" : "Add New Survey"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Survey Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={styles.input}
              required
            />
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
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Survey Period</label>
            <div className={styles.dateInputs}>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className={styles.input}
                required
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Questions</label>
            {formData.questions.map((question, index) => (
              <div key={question.id} className={styles.questionContainer}>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(index, "text", e.target.value)
                  }
                  placeholder="Question text"
                  className={styles.input}
                  required
                />
                <select
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                  className={styles.select}
                >
                  <option value="text">Text</option>
                  <option value="radio">Single Choice</option>
                  <option value="checkbox">Multiple Choice</option>
                </select>

                {(question.type === "radio" || question.type === "checkbox") && (
                  <div className={styles.optionsContainer}>
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            index,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className={styles.input}
                        required
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddOption(index)}
                      className={styles.addButton}
                    >
                      Add Option
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className={styles.addButton}
            >
              Add Question
            </button>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className={styles.checkbox}
              />
              Active Survey
            </label>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}