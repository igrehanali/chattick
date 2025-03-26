"use client";

import { useState } from "react";
import "./styles.css";
import "./checkbox.css";
import { AdminLayout } from "../components/layout/admin-layout";

export default function ThemeManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [draftThemes, setDraftThemes] = useState([]);
  const [publishedThemes, setPublishedThemes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState({
    name: "",
    colors: {
      primary: "#1976d2",
      secondary: "#1565c0",
      background: "#ffffff",
      text: "#000000",
    },
    fonts: {
      primary: "Arial",
      secondary: "Helvetica",
      size: "16px",
    },
    layout: {
      spacing: "8px",
      borderRadius: "4px",
    },
    chat: {
      wallpaper: "",
      messageDeleteTime: "24h",
      messageDisappearingTimer: false,
      clearOnScreenOff: false,
      screenshotAllowed: true,
      mediaSaveAllowed: true,
    },
  });

  const messageDeleteTimeOptions = [
    { value: "1h", label: "1 Hour" },
    { value: "24h", label: "24 Hours" },
    { value: "72h", label: "3 Days" },
    { value: "168h", label: "7 Days" },
    { value: "720h", label: "30 Days" },
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handlePublishTheme = (themeId) => {
    const draftTheme = draftThemes.find((theme) => theme.id === themeId);
    if (draftTheme) {
      const publishedTheme = {
        ...draftTheme,
        enabled: true,
        userCount: 0,
        publishedAt: new Date().toISOString(),
      };
      setPublishedThemes((prev) => [...prev, publishedTheme]);
      setDraftThemes((prev) => prev.filter((theme) => theme.id !== themeId));
    }
  };

  const handleThemeToggle = (themeId) => {
    setPublishedThemes((prev) =>
      prev.map((theme) =>
        theme.id === themeId ? { ...theme, enabled: !theme.enabled } : theme
      )
    );
  };

  const handleThemePropertyChange = (category, property, value) => {
    setCurrentTheme((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: value,
      },
    }));
  };

  const handleSaveAsDraft = () => {
    const newDraft = {
      id: Date.now(),
      ...currentTheme,
      lastModified: new Date().toISOString(),
    };
    setDraftThemes((prev) => [...prev, newDraft]);
    setCurrentTheme({
      name: "",
      colors: {
        primary: "#1976d2",
        secondary: "#1565c0",
        background: "#ffffff",
        text: "#000000",
      },
      fonts: { primary: "Arial", secondary: "Helvetica", size: "16px" },
      layout: { spacing: "8px", borderRadius: "4px" },
      chat: {
        wallpaper: "",
        messageDeleteTime: "24h",
        messageDisappearingTimer: false,
        clearOnScreenOff: false,
        screenshotAllowed: true,
        mediaSaveAllowed: true,
      },
    });
  };

  return (
    <AdminLayout>
      <div className="theme-management">
        <h1 className="theme-management__title">Theme Management</h1>

        <div className="tabs">
          {["Theme Designer", "Published Themes", "Draft Themes"].map(
            (label, index) => (
              <button
                key={index}
                className={`tabs__tab ${
                  activeTab === index ? "tabs__tab--active" : ""
                }`}
                onClick={() => handleTabChange(index)}
              >
                {label}
              </button>
            )
          )}
        </div>

        {activeTab === 0 && (
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Theme Designer</h2>
              <button
                className="button"
                onClick={handleSaveAsDraft}
                disabled={!currentTheme.name}
              >
                Save as Draft
              </button>
            </div>
            <div className="card__content">
              <div className="theme-designer">
                <div className="theme-designer__section">
                  <input
                    type="text"
                    className="theme-designer__input"
                    placeholder="Theme Name"
                    value={currentTheme.name}
                    onChange={(e) =>
                      setCurrentTheme((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="theme-designer__section">
                  <h3>Colors</h3>
                  <div className="theme-designer__color-grid">
                    <div className="theme-designer__color-item">
                      <label>Primary Color</label>
                      <input
                        type="color"
                        value={currentTheme.colors.primary}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "colors",
                            "primary",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="theme-designer__color-item">
                      <label>Secondary Color</label>
                      <input
                        type="color"
                        value={currentTheme.colors.secondary}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "colors",
                            "secondary",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="theme-designer__color-item">
                      <label>Background Color</label>
                      <input
                        type="color"
                        value={currentTheme.colors.background}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "colors",
                            "background",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="theme-designer__color-item">
                      <label>Text Color</label>
                      <input
                        type="color"
                        value={currentTheme.colors.text}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "colors",
                            "text",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="theme-designer__section">
                  <h3>Fonts</h3>
                  <div className="theme-designer__font-grid">
                    <div className="theme-designer__font-item">
                      <label>Primary Font</label>
                      <select
                        value={currentTheme.fonts.primary}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "fonts",
                            "primary",
                            e.target.value
                          )
                        }
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                      </select>
                    </div>
                    <div className="theme-designer__font-item">
                      <label>Secondary Font</label>
                      <select
                        value={currentTheme.fonts.secondary}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "fonts",
                            "secondary",
                            e.target.value
                          )
                        }
                      >
                        <option value="Arial">Arial</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="theme-designer__section">
                  <h3>Layout</h3>
                  <div className="theme-designer__layout-grid">
                    <div className="theme-designer__layout-item">
                      <label>Spacing</label>
                      <input
                        type="text"
                        value={currentTheme.layout.spacing}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "layout",
                            "spacing",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 8px"
                      />
                    </div>
                    <div className="theme-designer__layout-item">
                      <label>Border Radius</label>
                      <input
                        type="text"
                        value={currentTheme.layout.borderRadius}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "layout",
                            "borderRadius",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 4px"
                      />
                    </div>
                  </div>
                </div>

                <div className="theme-designer__section">
                  <h3>Font Settings</h3>
                  <div className="theme-designer__font-grid">
                    <div className="theme-designer__font-item">
                      <label>Font Size</label>
                      <input
                        type="text"
                        value={currentTheme.fonts.size}
                        onChange={(e) =>
                          handleThemePropertyChange(
                            "fonts",
                            "size",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 16px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className="grid">
            {publishedThemes.map((theme) => (
              <div className="card" key={theme.id}>
                <div className="card__header">
                  <h2 className="card__title">{theme.name}</h2>
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="switch__input"
                      checked={theme.enabled}
                      onChange={() => handleThemeToggle(theme.id)}
                    />
                    <span className="switch__slider"></span>
                  </label>
                </div>
                <div className="card__content">
                  <p>Users: {theme.userCount}</p>
                  <p>
                    Published:{" "}
                    {new Date(theme.publishedAt).toLocaleDateString()}
                  </p>
                  <p>Status: {theme.enabled ? "Active" : "Disabled"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className="grid">
            {draftThemes.map((theme) => (
              <div className="card" key={theme.id}>
                <div className="card__header">
                  <h2 className="card__title">{theme.name}</h2>
                  <button
                    className="button"
                    onClick={() => handlePublishTheme(theme.id)}
                  >
                    Publish
                  </button>
                </div>
                <div className="card__content">
                  <p>
                    Last Modified:{" "}
                    {new Date(theme.lastModified).toLocaleDateString()}
                  </p>
                  <div className="theme-preview">
                    <div
                      className="theme-preview__content"
                      style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                        fontFamily: theme.fonts.primary,
                        fontSize: theme.fonts.size,
                      }}
                    >
                      <div className="theme-preview__section">
                        <h3 className="theme-preview__title">Colors</h3>
                        <div>
                          <span
                            className="theme-preview__color-sample"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          Primary
                          <span
                            className="theme-preview__color-sample"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          Secondary
                        </div>
                      </div>

                      <div className="theme-preview__section">
                        <h3 className="theme-preview__title">Typography</h3>
                        <p style={{ fontFamily: theme.fonts.primary }}>
                          Primary Font: {theme.fonts.primary}
                        </p>
                        <p style={{ fontFamily: theme.fonts.secondary }}>
                          Secondary Font: {theme.fonts.secondary}
                        </p>
                      </div>

                      <div className="theme-preview__section">
                        <h3 className="theme-preview__title">
                          Buttons & Links
                        </h3>
                        <button
                          className="theme-preview__button"
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: "#fff",
                            border: "none",
                            padding: theme.layout.spacing,
                            borderRadius: theme.layout.borderRadius,
                          }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="theme-preview__button"
                          style={{
                            backgroundColor: theme.colors.secondary,
                            color: "#fff",
                            border: "none",
                            padding: theme.layout.spacing,
                            borderRadius: theme.layout.borderRadius,
                          }}
                        >
                          Secondary Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
