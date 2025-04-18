"use client";
import { AdminLayout } from "../components/layout/admin-layout";
import { useState } from "react";
import './style.css';

const ManageMarketingEmailsAlerts = () => {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [selectedAudience, setSelectedAudience] = useState("all");
    const [scheduleDate, setScheduleDate] = useState("");
    const [previewMode, setPreviewMode] = useState(false);

    const templates = [
        { id: 1, name: "Welcome Email", subject: "Welcome to ChatTick!", type: "onboarding" },
        { id: 2, name: "Monthly Newsletter", subject: "ChatTick Monthly Updates", type: "newsletter" },
        { id: 3, name: "Premium Features", subject: "Unlock Premium Features", type: "promotion" },
        { id: 4, name: "Service Update", subject: "Important Service Updates", type: "alert" }
    ];

    const audienceSegments = [
        { value: "all", label: "All Subscribers" },
        { value: "free", label: "Free Users" },
        { value: "premium", label: "Premium Users" },
        { value: "enterprise", label: "Enterprise Users" },
        { value: "inactive", label: "Inactive Users (30+ days)" }
    ];

    const handleTemplateSelect = (templateId) => {
        const template = templates.find(t => t.id === parseInt(templateId));
        if (template) {
            setSelectedTemplate(templateId);
            setTemplateName(template.name);
            setSubject(template.subject);
        }
    };

    const handleSaveTemplate = async () => {
        console.log("Saving template:", { templateName, subject, content });
    };

    const handleSendCampaign = async () => {
        console.log("Sending campaign:", {
            templateName,
            subject,
            content,
            audience: selectedAudience,
            scheduleDate
        });
    };

    const handleFormatClick = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    return (
        <AdminLayout>
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
                                }}
                            >
                                Create New Template
                            </button>
                        </div>
                        <div className="templates-grid">
                            {templates.map(template => (
                                <div
                                    key={template.id}
                                    className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    <h3>{template.name}</h3>
                                    <p>{template.subject}</p>
                                    <span className="template-type">{template.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="template-editor">
                        <h2>{selectedTemplate ? 'Edit Template' : 'Create New Template'}</h2>
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
                                <label>Email Content</label>
                                <div className="rich-text-editor">
                                    <div className="editor-toolbar">
                                        <button type="button" onClick={() => handleFormatClick('bold')}><strong>B</strong></button>
                                        <button type="button" onClick={() => handleFormatClick('italic')}><em>I</em></button>
                                        <button type="button" onClick={() => handleFormatClick('underline')}><u>U</u></button>
                                        <button type="button" onClick={() => handleFormatClick('insertUnorderedList')}>List</button>
                                        <button type="button" onClick={() => handleFormatClick('justifyLeft')}>Left</button>
                                        <button type="button" onClick={() => handleFormatClick('justifyCenter')}>Center</button>
                                        <button type="button" onClick={() => handleFormatClick('justifyRight')}>Right</button>
                                        <button type="button" onClick={() => handleFormatClick('createLink', prompt('Enter link URL'))}>Link</button>
                                    </div>
                                    <div
                                        className="editor-content"
                                        contentEditable
                                        dangerouslySetInnerHTML={{ __html: content }}
                                        onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                        suppressContentEditableWarning={true}
                                    />
                                </div>
                            </div>
                            <div className="template-actions">
                                <button onClick={handleSaveTemplate}>Save Template</button>
                                <button onClick={() => setPreviewMode(!previewMode)}>
                                    {previewMode ? 'Edit Mode' : 'Preview'}
                                </button>
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
                                    {audienceSegments.map(segment => (
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
                                    {scheduleDate ? 'Schedule Campaign' : 'Send Now'}
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