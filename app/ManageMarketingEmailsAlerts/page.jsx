"use client";

import { AdminLayout } from "../components/layout/admin-layout";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import "./style.css";
import { toast, Toaster } from "react-hot-toast";

const ManageMarketingEmailsAlerts = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [selectedAudience, setSelectedAudience] = useState("all");
    const [scheduleDate, setScheduleDate] = useState("");
    const [previewMode, setPreviewMode] = useState(false);
    const editorRef = useRef(null);

    const audienceSegments = [
        { value: "all", label: "All Subscribers" },
        { value: "free", label: "Free Users" },
        { value: "premium", label: "Premium Users" },
        { value: "enterprise", label: "Enterprise Users" },
        { value: "inactive", label: "Inactive Users (30+ days)" },
    ];

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "email_templates"));
                const templatesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTemplates(templatesData);
            } catch (error) {
                toast.error("Error fetching templates:", error);
            }
        };

        fetchTemplates();
    }, []);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content || "";
        }
    }, [content]);

    const handleTemplateSelect = (templateId) => {
        const template = templates.find((t) => t.id === templateId);
        if (template) {
            setSelectedTemplate(template.id);
            setTemplateName(template.name || "");
            setSubject(template.subject || "");
            setType(template.type || "");
            setContent(template.content || "");
            setIsDelete(true);

            // Directly set the content in the editor (DOM)
            if (editorRef.current) {
                editorRef.current.innerHTML = template.content || "";
            }
        }
    };

    const sanitizeHTML = (dirty) => {
        const temp = document.createElement("div");
        temp.innerHTML = dirty;

        const scripts = temp.getElementsByTagName("script");
        while (scripts.length > 0) {
            scripts[0].parentNode.removeChild(scripts[0]);
        }

        const allElements = temp.getElementsByTagName("*");
        for (let el of allElements) {
            for (let attr of Array.from(el.attributes)) {
                if (attr.name.startsWith("on")) {
                    el.removeAttribute(attr.name);
                }
            }
        }

        return temp.innerHTML;
    };

    const handleSaveTemplate = async () => {
        const htmlContent = editorRef.current ? editorRef.current.innerHTML : "";
        const sanitizedContent = sanitizeHTML(htmlContent); 

        const newTemplate = {
            name: templateName,
            subject,
            content: sanitizedContent,
            type,
        };

        try {
            if (selectedTemplate) {
                // Update existing
                const docRef = doc(db, "email_templates", selectedTemplate);
                await updateDoc(docRef, newTemplate);
                toast.success("Template updated:", selectedTemplate);
            } else {
                // Add new
                const docRef = await addDoc(collection(db, "email_templates"), newTemplate);
                toast.success("New template created with ID:", docRef.id);
            }

            // Refresh template list
            const querySnapshot = await getDocs(collection(db, "email_templates"));
            const templatesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTemplates(templatesData);

            // Reset form
            setSelectedTemplate("");
            setTemplateName("");
            setSubject("");
            setContent("");
            setType("");

            if (editorRef.current) {
                editorRef.current.innerHTML = "";
              }
        } catch (e) {
            console.error("Error saving template:", e);
        }
    };



    const handleSendCampaign = async () => {
        console.log("Sending campaign:", {
            templateName,
            subject,
            content,
            audience: selectedAudience,
            scheduleDate,
        });
        // Add Firestore or email campaign logic here
    };

    const handleFormatClick = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const handleDeleteTemplate = async (templateId) => {
        if (window.confirm("Are you sure you want to delete this template?")) {
            try {
                await deleteDoc(doc(db, "email_templates", templateId));
                setTemplates((prev) => prev.filter((t) => t.id !== templateId));
                if (selectedTemplate === templateId) {
                    setSelectedTemplate("");
                    setTemplateName("");
                    setSubject("");
                    setContent("");
                    setType("");
                    setIsDelete(false);
                }
            } catch (e) {
                console.error("Error deleting template:", e);
            }
        }
    };

    return (
        <AdminLayout>
            <Toaster />
            <div className="marketing-container">
                <h1>Marketing Emails & Alerts Management</h1>

                <div className="template-management">
                    <div className="template-list">
                        <h2>Email Templates</h2>
                        <div className="template-actions">
                            <button
                                className="new-template-btn"
                                onClick={() => {
                                    setSelectedTemplate("");
                                    setTemplateName("");
                                    setSubject("");
                                    setContent("");
                                    setType("");
                                    setIsDelete(false);
                                }}
                            >
                                Create New Template
                            </button>
                        </div>
                        <div className="templates-grid">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    className={`template-card ${selectedTemplate === template.id ? "selected" : ""
                                        }`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <h3>{template.name}</h3>
                                    <p>{template.subject}</p>
                                    <span className="template-type">{template.type}</span>
                                    <p>{template.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="template-editor">
                        <h2>{selectedTemplate ? "Edit Template" : "Create New Template"}</h2>
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Template Name</label>
                                <input
                                    type="text"
                                    value={templateName}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                    placeholder="Enter template name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Subject Line</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Enter email subject"
                                />
                            </div>
                            <div className="form-group">
                                <label>Template Type</label>
                                <input
                                    type="text"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    placeholder="Enter template type"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Content</label>
                                <div className="rich-text-editor">
                                    <div className="editor-toolbar">
                                        <button type="button" onClick={() => handleFormatClick("bold")}>
                                            <strong>B</strong>
                                        </button>
                                        <button type="button" onClick={() => handleFormatClick("italic")}>
                                            <em>I</em>
                                        </button>
                                        <button type="button" onClick={() => handleFormatClick("underline")}>
                                            <u>U</u>
                                        </button>
                                        <button type="button" onClick={() => handleFormatClick("insertUnorderedList")}>
                                            List
                                        </button>
                                        <button type="button" onClick={() => handleFormatClick("justifyLeft")}>
                                            Left
                                        </button>
                                        <button type="button" onClick={() => handleFormatClick("justifyCenter")}>
                                            Center
                                        </button>
                                        <button type="button" onClick={() => handleFormatClick("justifyRight")}>
                                            Right
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleFormatClick("createLink", prompt("Enter link URL") || "")
                                            }
                                        >
                                            Link
                                        </button>
                                    </div>

                                    <div
                                        className="editor-content"
                                        contentEditable
                                        ref={editorRef}
                                        suppressContentEditableWarning={true}
                                    />
                                </div>
                            </div>
                            <div className="template-actions">
                                <button onClick={handleSaveTemplate}>Save Template</button>
                                {isDelete && (
                                    <button className="delete-btn" onClick={() => handleDeleteTemplate(selectedTemplate)} >
                                        {/* {previewMode ? "Edit Mode" : "Preview"} */}
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="campaign-settings">
                        <h2>Campaign Settings</h2>
                        <div className="settings-form">
                            <div className="form-group">
                                <label>Target Audience</label>
                                <select
                                    value={selectedAudience}
                                    onChange={(e) => setSelectedAudience(e.target.value)}
                                >
                                    {audienceSegments.map((segment) => (
                                        <option key={segment.value} value={segment.value}>
                                            {segment.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Schedule Date (Optional)</label>
                                <input
                                    type="datetime-local"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                />
                            </div>
                            <div className="campaign-actions">
                                <button onClick={handleSendCampaign}>
                                    {scheduleDate ? "Schedule Campaign" : "Send Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageMarketingEmailsAlerts;
