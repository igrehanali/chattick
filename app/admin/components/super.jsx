import React, { useState } from "react";
import "./super.css";
const SuperAdminSecurity = () => {
  // State Management
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("admin@example.com");
  const [recoveryPhone, setRecoveryPhone] = useState("+1234567890");
  const [twoFactor, setTwoFactor] = useState(false);
  const [trustedDevices, setTrustedDevices] = useState([
    { id: 1, device: "MacBook Pro", ip: "192.168.1.10", location: "USA" },
    { id: 2, device: "iPhone 13", ip: "192.168.1.22", location: "UK" },
  ]);
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: "Windows PC", ip: "192.168.1.50", lastActive: "2 hrs ago" },
    { id: 2, device: "Samsung Tablet", ip: "192.168.1.88", lastActive: "1 day ago" },
  ]);

  // Handle Password Change
  const handlePasswordUpdate = () => {
    if (!currentPassword) {
      alert("Please enter your current password!");
      return;
    }
    if (password !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // Add API call to verify current password and update new password
    alert("Password Updated Successfully!");
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  // Handle Recovery Contact Update
  const handleRecoveryEmailUpdate = () => {
    // Add API call to update recovery email
    alert("Recovery email updated successfully!");
  };

  const handleRecoveryPhoneUpdate = () => {
    // Add API call to update recovery phone
    alert("Recovery phone updated successfully!");
  };

  return (
    <div className="security-container">
      <div className="security-card">
        <h2>Super Admin Security</h2>
        <p>Manage your account security settings, including password, 2FA, and active sessions.</p>

        {/* Update Password Section */}
        <div className="section">
          <h3>Update Password</h3>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
          <button onClick={handlePasswordUpdate} className="btn">Update Password</button>
        </div>

        {/* Recovery Contacts Section */}
        <div className="section">
          <h3>Recovery Contacts</h3>
          <div className="recovery-item">
            <div className="recovery-input-group">
              <input
                type="email"
                placeholder="Recovery Email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="input"
              />
              <button onClick={handleRecoveryEmailUpdate} className="btn">Update Email</button>
            </div>
            <div className="recovery-input-group">
              <input
                type="tel"
                placeholder="Recovery Phone"
                value={recoveryPhone}
                onChange={(e) => setRecoveryPhone(e.target.value)}
                className="input"
              />
              <button onClick={handleRecoveryPhoneUpdate} className="btn">Update Phone</button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className="section">
          <h3>Two-Factor Authentication</h3>
          <label className="toggle">
            <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
            <span className="slider"></span>
          </label>
          <p>{twoFactor ? "2FA Enabled" : "2FA Disabled"}</p>
        </div>

        {/* Trusted Devices Section */}
        <div className="section">
          <h3>Trusted Devices</h3>
          {trustedDevices.length > 0 ? (
            trustedDevices.map((device) => (
              <div key={device.id} className="device-item">
                <p>{device.device} - {device.ip} ({device.location})</p>
                <button onClick={() => removeTrustedDevice(device.id)} className="btn danger">Remove</button>
              </div>
            ))
          ) : (
            <p>No trusted devices found.</p>
          )}
        </div>

        {/* Active Sessions Section */}
        <div className="section">
          <h3>Active Sessions</h3>
          {activeSessions.length > 0 ? (
            activeSessions.map((session) => (
              <div key={session.id} className="device-item">
                <p>{session.device} - {session.ip} (Last Active: {session.lastActive})</p>
                <button onClick={() => logoutSession(session.id)} className="btn warning">Log Out</button>
              </div>
            ))
          ) : (
            <p>No active sessions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSecurity;
