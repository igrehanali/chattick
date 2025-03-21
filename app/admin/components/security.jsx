import { Button } from "@/app/components/ui/button";
import React, { useState, useEffect } from "react";
import "./security.css";
const Security = () => {
  // State for security settings
  const [securitySettings, setSecuritySettings] = useState({
    enable2FA: "Enabled",
    passwordLength: 8,
    sessionTimeout: 15,
    loginAttempts: 5,
  });

  const [message, setMessage] = useState("");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("securitySettings");
    if (savedSettings) {
      setSecuritySettings(JSON.parse(savedSettings));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecuritySettings({ ...securitySettings, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (securitySettings.passwordLength < 6) {
      setMessage("Password length must be at least 6 characters.");
      return;
    }

    if (securitySettings.sessionTimeout < 5) {
      setMessage("Session timeout must be at least 5 minutes.");
      return;
    }

    if (securitySettings.loginAttempts < 1) {
      setMessage("Login attempts must be at least 1.");
      return;
    }

    // Save settings to localStorage
    localStorage.setItem("securitySettings", JSON.stringify(securitySettings));

    // Display confirmation message
    setMessage("Security settings updated successfully!");
  };

  return (
    <div className="security-container">
      <div className="security-card">
        <h2 className="security-title">Security Settings</h2>
        <p className="security-description">
          Configure security policies for all admin accounts, including
          Two-Factor Authentication (2FA), password rules, session timeouts, and
          account lockout conditions.
        </p>

        {/* Display status message */}
        {message && <div className="security-message">{message}</div>}

        <form className="security-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Enable Two-Factor Authentication (2FA)
            </label>
            <select
              name="enable2FA"
              className="form-input"
              value={securitySettings.enable2FA}
              onChange={handleChange}
            >
              <option>Enabled</option>
              <option>Disabled</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Minimum Password Length</label>
            <input
              type="number"
              name="passwordLength"
              className="form-input"
              value={securitySettings.passwordLength}
              onChange={handleChange}
              min="6"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Session Timeout (minutes)</label>
            <input
              type="number"
              name="sessionTimeout"
              className="form-input"
              value={securitySettings.sessionTimeout}
              onChange={handleChange}
              min="5"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Failed Login Attempts Before Lockout
            </label>
            <input
              type="number"
              name="loginAttempts"
              className="form-input"
              value={securitySettings.loginAttempts}
              onChange={handleChange}
              min="1"
            />
          </div>

          <Button type="submit" className="submit-button">
            Save Security Policies
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Security;
