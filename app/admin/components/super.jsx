import React, { useState } from "react";
import "./super.css";
const SuperAdminSecurity = () => {
  // State Management
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password Updated Successfully!");
  };

  // Handle Remove Trusted Device
  const removeTrustedDevice = (id) => {
    setTrustedDevices(trustedDevices.filter((device) => device.id !== id));
  };

  // Handle Log Out Session
  const logoutSession = (id) => {
    setActiveSessions(activeSessions.filter((session) => session.id !== id));
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
