"use client";

import { useState } from "react";
import "./accounts.css";

const AccountsTab = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      username: "admin1",
      email: "admin1@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      username: "admin2",
      email: "admin2@example.com",
      role: "Admin",
      status: "Disabled",
    },
  ]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Admin",
  });

  const roles = ["Admin", "Moderator", "Support"];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdmin = {
      id: admins.length + 1,
      ...formData,
      role: formData.role,
      status: "Active",
    };
    setAdmins([...admins, newAdmin]);
    setFormData({ username: "", email: "" });
  };

  const toggleStatus = (adminId) => {
    setAdmins(
      admins.map((admin) => {
        if (admin.id === adminId) {
          const newStatus = admin.status === "Active" ? "Disabled" : "Active";
          return { ...admin, status: newStatus };
        }
        return admin;
      })
    );
  };

  const resetPassword = (adminId) => {
    // Implement password reset logic here
    console.log(`Reset password for admin ${adminId}`);
  };

  return (
    <div>
      <div className="admin-grid">
        <div className="admin-card">
          <h3 className="admin-title">Admin List</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          admin.status === "Active"
                            ? "status-active"
                            : "status-disabled"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        onClick={() => toggleStatus(admin.id)}
                        className={`action-button ${
                          admin.status === "Active"
                            ? "action-button-disable"
                            : "action-button-enable"
                        }`}
                      >
                        {admin.status === "Active" ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => resetPassword(admin.id)}
                        className="action-button action-button-reset"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-title">Add New Admin</h3>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">
              Add Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountsTab;
