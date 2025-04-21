"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Button } from "@/app/components/ui/button";

export default function ChatSettings() {
  const [settings, setSettings] = useState({
    theme: "sunlight",
    wallpaper: "",
    fontSize: "16",
    fontType: "Arial",
    messageDeletionTime: "24", // in hours
    messageDisappearing: false,
    clearOnScreenOff: false,
    screenshotAllowed: true,
    mediaSaveAllowed: true,
  });

  const fontSizes = ["12", "14", "16", "18", "20"];
  const fontTypes = [
    "Arial",
    "Helvetica",
    "Roboto",
    "Times New Roman",
    "Georgia",
  ];
  const deletionTimes = ["1", "24", "48", "72", "168"]; // in hours

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWallpaperChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({
          ...prev,
          wallpaper: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Default Chat Settings</h1>

        <section className={styles.section}>
          <h2>Appearance</h2>

          <div className={styles.settingGroup}>
            <label className={styles.label}>
              Theme
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="" disabled>
                  Select Theme
                </option>
                <option value="sunlight">Sunshine Mode 🌞</option>
                <option value="daylight">Daylight ☀️</option>
                <option value="brightLight">Bright Vibes ✨</option>
                <option value="midDark">Midnight Vibes 🌙</option>
                <option value="ShadowDark">Shadow Mode 🖤</option>
              </select>
            </label>

            <label className={styles.label}>
              Wallpaper
              <input
                type="file"
                accept="image/*"
                onChange={handleWallpaperChange}
                className={styles.fileInput}
              />
            </label>

            <label className={styles.label}>
              Font Size
              <select
                name="fontSize"
                value={settings.fontSize}
                onChange={handleChange}
                className={styles.select}
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.label}>
              Font Type
              <select
                name="fontType"
                value={settings.fontType}
                onChange={handleChange}
                className={styles.select}
              >
                {fontTypes.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Message Settings</h2>

          <div className={styles.settingGroup}>
            <label className={styles.label}>
              Default Message Deletion Time
              <select
                name="messageDeletionTime"
                value={settings.messageDeletionTime}
                onChange={handleChange}
                className={styles.select}
                required
              >
                {deletionTimes.map((time) => (
                  <option key={time} value={time}>
                    {time === "1" ? "1 hour" : `${time} hours`}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="messageDisappearing"
                checked={settings.messageDisappearing}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Enable Deleting Messages
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="clearOnScreenOff"
                checked={settings.clearOnScreenOff}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Clear Chat on Screen Off
            </label>
          </div>

          <div className={styles.disappearingSetting}>
            <label className={styles.label}>
              Default Message Disappearing Time
              <select
                name="messageDeletionHour"
                value={settings.messageDeletionHour}
                onChange={handleChange}
                className={styles.select}
                required
              >
                {deletionTimes.map((time) => (
                  <option key={time} value={time}>
                    {time === "1" ? "1 hour" : `${time} hours`}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="Disappearing"
                checked={settings.Disappearing}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Enable Disappearing Messages
            </label>

          </div>
        </section>

        <section className={styles.section}>
          <h2>Privacy & Media</h2>

          <div className={styles.settingGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="screenshotAllowed"
                checked={settings.screenshotAllowed}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Allow Screenshots
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="mediaSaveAllowed"
                checked={settings.mediaSaveAllowed}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Allow Saving Media to Gallery
            </label>
          </div>
        </section>

        <Button
          //   className={styles.saveButton}
          onClick={() => console.log(settings)}
        >
          Save Changes
        </Button>
      </div>
    </AdminLayout>
  );
}
