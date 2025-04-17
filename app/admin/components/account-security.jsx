import React, { useState } from "react";
import "./accountSecurity.css";
const AccountSecurity = () => {
  // State Management
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("admin@example.com");
  const [recoveryPhone, setRecoveryPhone] = useState("+1234567890");

  const [trustedDevices, setTrustedDevices] = useState([
    { id: 1, device: "MacBook Pro", ip: "192.168.1.10", location: "USA" },
    { id: 2, device: "iPhone 13", ip: "192.168.1.22", location: "UK" },
  ]);

  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: "Windows PC",
      ip: "192.168.1.50",
      lastActive: "2 hrs ago",
    },
    {
      id: 2,
      device: "Samsung Tablet",
      ip: "192.168.1.88",
      lastActive: "1 day ago",
    },
  ]);

  // Handle Password Update
  const [currentPassword, setCurrentPassword] = useState("");
  const [recoveryEmailVerified, setRecoveryEmailVerified] = useState(true);
  const [recoveryPhoneVerified, setRecoveryPhoneVerified] = useState(true);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPhone, setIsUpdatingPhone] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const handlePasswordUpdate = () => {
    if (!currentPassword) {
      alert("Please enter your current password!");
      return;
    }
    if (password !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // TODO: Verify current password with backend
    alert("Password Updated Successfully!");
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleEmailUpdate = () => {
    if (isUpdatingEmail) {
      // TODO: Verify email with backend
      setRecoveryEmail(tempEmail);
      setRecoveryEmailVerified(false);
      setIsUpdatingEmail(false);
    } else {
      setTempEmail(recoveryEmail);
      setIsUpdatingEmail(true);
    }
  };

  const handlePhoneUpdate = () => {
    if (isUpdatingPhone) {
      // TODO: Verify phone with backend
      setRecoveryPhone(tempPhone);
      setRecoveryPhoneVerified(false);
      setIsUpdatingPhone(false);
    } else {
      setTempPhone(recoveryPhone);
      setIsUpdatingPhone(true);
    }
  };

  const cancelEmailUpdate = () => {
    setIsUpdatingEmail(false);
    setTempEmail("");
  };

  const cancelPhoneUpdate = () => {
    setIsUpdatingPhone(false);
    setTempPhone("");
  };
  // Handle Removing a Trusted Device
  const removeTrustedDevice = (id) => {
    setTrustedDevices(trustedDevices.filter((device) => device.id !== id));
  };

  // Handle Logging Out a Session
  const logoutSession = (id) => {
    setActiveSessions(activeSessions.filter((session) => session.id !== id));
  };

  return (
    <div className="security-container">
      <div className="security-card">
        <h2>Account Security</h2>
        <p>
          Manage your security settings, including password, 2FA, and active
          sessions.
        </p>

        {/* Update Password */}
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
          <button onClick={handlePasswordUpdate} className="btn">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="section">
          <h3>Two-Factor Authentication</h3>
          <label className="toggle">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={() => setTwoFactor(!twoFactor)}
            />
            <span className="slider"></span>
          </label>
          <p>{twoFactor ? "2FA Enabled" : "2FA Disabled"}</p>
        </div>

        {/* Login Alerts */}
        <div className="section">
          <h3>Login Alerts</h3>
          <label className="toggle">
            <input
              type="checkbox"
              checked={loginAlerts}
              onChange={() => setLoginAlerts(!loginAlerts)}
            />
            <span className="slider"></span>
          </label>
          <p>
            {loginAlerts ? "Login Alerts Enabled" : "Login Alerts Disabled"}
          </p>
        </div>

        {/* Biometric Security */}
        <div className="section">
          <h3>Biometric Security</h3>
          <label className="toggle">
            <input
              type="checkbox"
              checked={biometric}
              onChange={() => setBiometric(!biometric)}
            />
            <span className="slider"></span>
          </label>
          <p>
            {biometric
              ? "Biometric Security Enabled"
              : "Biometric Security Disabled"}
          </p>
        </div>

        {/* Recovery Email & Phone */}
        <div className="section">
          <h3>Recovery Options</h3>
          <div className="recovery-option">
            <h4>Email Recovery</h4>
            {isUpdatingEmail ? (
              <>
                <input
                  type="email"
                  placeholder="New Recovery Email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="input"
                />
                <div className="button-group">
                  <button onClick={handleEmailUpdate} className="btn">
                    Save
                  </button>
                  <button onClick={cancelEmailUpdate} className="btn warning">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  {recoveryEmail}{" "}
                  {recoveryEmailVerified && (
                    <span className="verified">(Verified)</span>
                  )}
                </p>
                <button onClick={handleEmailUpdate} className="btn">
                  Update Email
                </button>
              </>
            )}
          </div>

          <div className="recovery-option">
            <h4>Phone Recovery</h4>
            {isUpdatingPhone ? (
              <>
                <input
                  type="tel"
                  placeholder="New Recovery Phone"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="input"
                />
                <div className="button-group">
                  <button onClick={handlePhoneUpdate} className="btn">
                    Save
                  </button>
                  <button onClick={cancelPhoneUpdate} className="btn warning">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  {recoveryPhone}{" "}
                  {recoveryPhoneVerified && (
                    <span className="verified">(Verified)</span>
                  )}
                </p>
                <button onClick={handlePhoneUpdate} className="btn">
                  Update Phone
                </button>
              </>
            )}
          </div>
        </div>

        {/* Trusted Devices */}
        <div className="section">
          <h3>Trusted Devices</h3>
          {trustedDevices.length > 0 ? (
            trustedDevices.map((device) => (
              <div key={device.id} className="device-item">
                <p>
                  {device.device} - {device.ip} ({device.location})
                </p>
                <button
                  onClick={() => removeTrustedDevice(device.id)}
                  className="btn danger"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No trusted devices found.</p>
          )}
        </div>

        {/* Active Sessions */}
        <div className="section">
          <h3>Active Sessions</h3>
          {activeSessions.length > 0 ? (
            activeSessions.map((session) => (
              <div key={session.id} className="device-item">
                <p>
                  {session.device} - {session.ip} (Last Active:{" "}
                  {session.lastActive})
                </p>
                <button
                  onClick={() => logoutSession(session.id)}
                  className="btn warning"
                >
                  Log Out
                </button>
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

export default AccountSecurity;
