import React, { useState, useEffect } from "react";
import "./roles.css";
import { Button } from "@/app/components/ui/button";
import { adminService } from "@/lib/services/admin-service";
import { useAuth } from "@/app/contexts/auth-context";
import { toast } from "react-hot-toast";

const FEATURES = [
  { id: 1, title: "Manage Users", description: "User management and profiles" },
  { id: 2, title: "Billing", description: "Invoice and payment management" },
  { id: 3, title: "Support", description: "Ticket and chat management" },
  { id: 4, title: "Contests", description: "Contest creation and management" },
  { id: 5, title: "Content", description: "Content moderation and management" },
  { id: 6, title: "Analytics", description: "Reports and statistics" },
];

const PERMISSION_TYPES = [
  { value: "read", label: "Read" },
  { value: "write", label: "Write" },
  { value: "update", label: "Update" },
];

const RolesTab = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    permissions: FEATURES.map((feature) => ({
      featureTitle: feature.title,
      types: [],
    })),
  });
  const [editingId, setEditingId] = useState(null);
  const [auditLog, setAuditLog] = useState([]);

  useEffect(() => {
    loadAuditLog();
  }, []);

  const loadAuditLog = async () => {
    try {
      const logs = await adminService.getActivityLogs();
      setAuditLog(logs);
    } catch (err) {
      console.error("Error loading audit log:", err);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const rolesList = await adminService.getAllRoles();
      setRoles(rolesList);
      setError(null);
    } catch (err) {
      setError("Failed to load roles");
      console.error("Error loading roles:", err);
      toast.error("Failed to load roles", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePermissionChange = (featureTitle, permissionType, checked) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.map((permission) =>
        permission.featureTitle === featureTitle
          ? {
              ...permission,
              types: checked
                ? [...permission.types, permissionType]
                : permission.types.filter((type) => type !== permissionType),
            }
          : permission
      ),
    }));
  };

  const logAuditTrail = async (action, roleId, details) => {
    try {
      await adminService.logActivity({
        username: user?.email || "System",
        action,
        roleId,
        details,
        performedBy: user?.id || "System",
      });
    } catch (err) {
      console.error("Error logging activity:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading(
      editingId ? "Updating role..." : "Creating role..."
    );
    try {
      const roleData = {
        name: formData.name,
        permissions: formData.permissions.filter((p) => p.types.length > 0),
        modifiedBy: user?.email || "Super Admin",
      };

      if (editingId) {
        const updatedRole = await adminService.updateRole(editingId, roleData);
        setRoles(
          roles.map((role) => (role.id === editingId ? updatedRole : role))
        );
        await logAuditTrail(
          "update",
          editingId,
          `Updated role: ${formData.name}`
        );
        setEditingId(null);
        toast.success(`Role "${formData.name}" updated successfully`, {
          id: loadingToast,
        });
      } else {
        const newRole = await adminService.createRole(roleData);
        setRoles([...roles, newRole]);
        await logAuditTrail(
          "create",
          newRole.id,
          `Created new role: ${formData.name}`
        );
        toast.success(`Role "${formData.name}" created successfully`, {
          id: loadingToast,
        });
      }

      setFormData({
        name: "",
        permissions: FEATURES.map((feature) => ({
          featureTitle: feature.title,
          types: [],
        })),
      });
      setError(null);
    } catch (err) {
      setError("Failed to save role");
      console.error("Error saving role:", err);
      toast.error("Failed to save role", { id: loadingToast });
    }
  };

  const handleEdit = (role) => {
    setFormData({
      name: role.name,
      permissions: FEATURES.map((feature) => ({
        featureTitle: feature.title,
        types:
          role.permissions.find((p) => p.featureTitle === feature.title)
            ?.types || [],
      })),
    });
    setEditingId(role.id);
  };

  const handleDelete = async (id) => {
    const roleToDelete = roles.find((role) => role.id === id);
    const loadingToast = toast.loading(
      `Deleting role "${roleToDelete.name}"...`
    );
    try {
      await adminService.deleteRole(id);
      setRoles(roles.filter((role) => role.id !== id));
      await logAuditTrail("delete", id, `Deleted role: ${roleToDelete.name}`);
      setError(null);
      toast.success(`Role "${roleToDelete.name}" deleted successfully`, {
        id: loadingToast,
      });
    } catch (err) {
      setError("Failed to delete role");
      console.error("Error deleting role:", err);
      toast.error("Failed to delete role", { id: loadingToast });
    }
  };

  return (
    <div className="roles-container">
      {loading ? (
        <div className="loading">Loading roles...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="roles-form">
            <h3>{editingId ? "Edit Role" : "Add New Role"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="permissions-grid">
                <table>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      {PERMISSION_TYPES.map((type) => (
                        <th key={type.value}>{type.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map((feature) => (
                      <tr key={feature.title}>
                        <td>{feature.title}</td>
                        {PERMISSION_TYPES.map((type) => (
                          <td key={type.value}>
                            <input
                              type="checkbox"
                              checked={
                                formData.permissions
                                  .find((p) => p.featureTitle === feature.title)
                                  ?.types?.includes(type.value) ?? false
                              }
                              onChange={(e) =>
                                handlePermissionChange(
                                  feature.title,
                                  type.value,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button type="submit" className="submit-button">
                {editingId ? "Update Role" : "Add Role"}
              </Button>
            </form>
          </div>

          {/* Roles Table */}
          <div className="roles-table-container">
            <table className="roles-table">
              <thead>
                <tr>
                  <th>Role Name</th>
                  <th>Permissions</th>
                  <th>Last Modified</th>
                  <th>Modified By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>
                      {role.permissions
                        .map((p) => `${p.featureTitle} (${p.types.join(", ")})`)
                        .join("; ")}
                    </td>
                    <td>{new Date(role.lastModified).toLocaleString()}</td>
                    <td>{role.modifiedBy}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(role)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(role.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="audit-log">
            <h3>Audit Log</h3>
            <div className="audit-entries">
              {auditLog.map((entry, index) => (
                <div key={index} className="audit-entry">
                  <span className="audit-timestamp">
                    {new Date(entry.timestamp?.seconds * 1000).toLocaleString()}
                  </span>
                  <span className="audit-action">{entry.action}</span>
                  <span className="audit-details">{entry.details}</span>
                  <span className="audit-user">{entry.performedBy}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RolesTab;
