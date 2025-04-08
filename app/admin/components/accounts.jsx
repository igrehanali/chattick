"use client";

import { useState, useEffect } from "react";
import { adminService } from "@/lib/services/admin-service";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./accounts.css";
import { toast } from "react-hot-toast";

const AccountsTab = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Admin",
    roleId: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    profileImage: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const rolesList = await adminService.getAllRoles();
      setAvailableRoles(rolesList);
      setError(null);
    } catch (err) {
      setError("Failed to load roles");
      console.error("Error loading roles:", err);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      const adminList = await adminService.getAllAdmins();
      setAdmins(adminList);
      setError(null);
    } catch (err) {
      setError("Failed to load admin accounts");
      console.error("Error loading admins:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should not exceed 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const loadingToast = toast.loading("Creating admin account...");
    try {
      let profileImageUrl = "";
      if (formData.profileImage instanceof File) {
        const storageRef = ref(
          storage,
          `admin-profiles/${Date.now()}-${formData.profileImage.name}`
        );
        const snapshot = await uploadBytes(storageRef, formData.profileImage);
        profileImageUrl = await getDownloadURL(snapshot.ref);
      }

      const adminData = {
        ...formData,
        profileImage: profileImageUrl || formData.profileImage,
      };

      const newAdmin = await adminService.createAdmin(adminData);
      setAdmins([...admins, newAdmin]);
      setFormData({
        username: "",
        email: "",
        role: "Admin",
        roleId: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        profileImage: "",
        address: "",
      });
      setError(null);
      toast.success("Admin account created successfully", { id: loadingToast });
    } catch (err) {
      setError("Failed to create admin account");
      console.error("Error creating admin:", err);
      toast.error("Failed to create admin account", { id: loadingToast });
    }
  };

  const toggleStatus = async (adminId) => {
    try {
      const newStatus = await adminService.toggleAdminStatus(adminId);
      setAdmins(
        admins.map((admin) => {
          if (admin.id === adminId) {
            return { ...admin, status: newStatus };
          }
          return admin;
        })
      );
      setError(null);
    } catch (err) {
      setError("Failed to update admin status");
      console.error("Error toggling admin status:", err);
    }
  };

  const resetPassword = async (adminId) => {
    // Password reset will be implemented with Firebase Auth
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
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
                minLength={8}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              {formData.profileImage && (
                <p className="text-sm text-gray-500">
                  {formData.profileImage instanceof File
                    ? `Selected: ${formData.profileImage.name}`
                    : `Current: ${formData.profileImage}`}
                </p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={formData.roleId}
                onChange={(e) => {
                  const selectedRole = availableRoles.find(
                    (role) => role.id === e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    role: selectedRole.name,
                    roleId: selectedRole.id,
                  }));
                }}
                className="form-input"
                required
              >
                {availableRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
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
