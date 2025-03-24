"use client";

import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styles from "./notifications.module.css";
import toast from "react-hot-toast";
import { AdminLayout } from "../components/layout/admin-layout";
import { Button } from "../components/ui/button";

export default function NotificationsPage() {
  const [terms, setTerms] = useState(EditorState.createEmpty());
  const [privacy, setPrivacy] = useState(EditorState.createEmpty());
  const [about, setAbout] = useState(EditorState.createEmpty());
  const [activeTab, setActiveTab] = useState("terms");

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleEditorChange = (newState) => {
    switch (activeTab) {
      case 'terms':
        setTerms(newState);
        break;
      case 'privacy':
        setPrivacy(newState);
        break;
      case 'about':
        setAbout(newState);
        break;
    }
  };

  const handleBlockType = (blockType) => {
    handleEditorChange(RichUtils.toggleBlockType(activeTab === 'terms' ? terms : activeTab === 'privacy' ? privacy : about, blockType));
  };

  const handleInlineStyle = (inlineStyle) => {
    handleEditorChange(RichUtils.toggleInlineStyle(activeTab === 'terms' ? terms : activeTab === 'privacy' ? privacy : about, inlineStyle));
  };

  const renderEditor = (editorState) => (
    <div className={styles.editorWrapper}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button onClick={() => handleInlineStyle('BOLD')} className={styles.toolbarButton}>
            <strong>B</strong>
          </button>
          <button onClick={() => handleInlineStyle('ITALIC')} className={styles.toolbarButton}>
            <em>I</em>
          </button>
          <button onClick={() => handleInlineStyle('UNDERLINE')} className={styles.toolbarButton}>
            <u>U</u>
          </button>
          <button onClick={() => handleInlineStyle('STRIKETHROUGH')} className={styles.toolbarButton}>
            <s>S</s>
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button onClick={() => handleBlockType('header-one')} className={styles.toolbarButton}>
            H1
          </button>
          <button onClick={() => handleBlockType('header-two')} className={styles.toolbarButton}>
            H2
          </button>
          <button onClick={() => handleBlockType('header-three')} className={styles.toolbarButton}>
            H3
          </button>
        </div>

        <div className={styles.toolbarGroup}>
          <button onClick={() => handleBlockType('unordered-list-item')} className={styles.toolbarButton}>
            • List
          </button>
          <button onClick={() => handleBlockType('ordered-list-item')} className={styles.toolbarButton}>
            1. List
          </button>
          <button onClick={() => handleBlockType('blockquote')} className={styles.toolbarButton}>
            Quote
          </button>
          <button onClick={() => handleBlockType('code-block')} className={styles.toolbarButton}>
            Code
          </button>
        </div>
      </div>
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Start typing here..."
        />
      </div>
    </div>
  );

  const handleSave = async (content) => {
    try {
      toast.success("Users have been successfully notified.", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to update content", {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Legal & Company Information</h1>

        <div className={styles.tabs}>
          <div className={styles.tabsList}>
            <button
              className={`${styles.tabButton} ${activeTab === "terms" ? styles.active : ""
                }`}
              onClick={() => setActiveTab("terms")}
            >
              Terms & Conditions
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "privacy" ? styles.active : ""
                }`}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy Policy
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "about" ? styles.active : ""
                }`}
              onClick={() => setActiveTab("about")}
            >
              About Us
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "terms" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>Terms & Conditions</h2>
                {renderEditor(terms)}
                <Button
                  className={styles.saveButton}
                  onClick={() => handleSave(terms)}
                >
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>Privacy Policy</h2>
                {renderEditor(privacy)}
                <Button
                  className={styles.saveButton}
                  onClick={() => handleSave(privacy)}
                >
                  Save Changes
                </Button>
              </div>
            )}

            {activeTab === "about" && (
              <div className={styles.tabPanel}>
                <h2 className={styles.tabTitle}>About Us</h2>
                {renderEditor(about)}
                <Button
                  className={styles.saveButton}
                  onClick={() => handleSave(about)}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
