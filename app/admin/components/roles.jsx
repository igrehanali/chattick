import React, { useState } from "react";
import "./roles.css";
import { Button } from "@/app/components/ui/button";

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

const getCurrentTimestamp = () => new Date().toISOString();

const RolesTab = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Billing Admin",
      permissions: [{ featureId: 2, types: ["read", "write", "update"] }],
      lastModified: getCurrentTimestamp(),
      modifiedBy: "System",
    },
    {
      id: 2,
      name: "Support Admin",
      permissions: [{ featureId: 3, types: ["read", "write"] }],
      lastModified: getCurrentTimestamp(),
      modifiedBy: "System",
    },
    {
      id: 3,
      name: "Contests Admin",
      permissions: [{ featureId: 4, types: ["read", "write", "update"] }],
      lastModified: getCurrentTimestamp(),
      modifiedBy: "System",
    },
  ]);

  const [auditLog, setAuditLog] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    permissions: FEATURES.map((feature) => ({
      featureId: feature.id,
      types: [],
    })),
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePermissionChange = (featureId, permissionType, checked) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.map((permission) =>
        permission.featureId === featureId
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

  const logAuditTrail = (action, roleId, details) => {
    const logEntry = {
      timestamp: getCurrentTimestamp(),
      action,
      roleId,
      details,
      performedBy: "Super Admin", // In real app, this would be the logged-in admin
    };
    setAuditLog((prev) => [logEntry, ...prev]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = getCurrentTimestamp();

    if (editingId) {
      // Update existing role
      setRoles(
        roles.map((role) =>
          role.id === editingId
            ? {
                ...role,
                name: formData.name,
                permissions: formData.permissions.filter(
                  (p) => p.types.length > 0
                ),
                lastModified: timestamp,
                modifiedBy: "Super Admin",
              }
            : role
        )
      );
      logAuditTrail("update", editingId, `Updated role: ${formData.name}`);
      setEditingId(null);
    } else {
      // Add new role
      const newRole = {
        id: roles.length + 1,
        name: formData.name,
        permissions: formData.permissions.filter((p) => p.types.length > 0),
        lastModified: timestamp,
        modifiedBy: "Super Admin",
      };
      setRoles([...roles, newRole]);
      logAuditTrail("create", newRole.id, `Created new role: ${newRole.name}`);
    }

    setFormData({
      name: "",
      permissions: FEATURES.map((feature) => ({
        featureId: feature.id,
        types: [],
      })),
    });
  };

  const handleEdit = (role) => {
    setFormData({
      name: role.name,
      permissions: FEATURES.map((feature) => ({
        featureId: feature.id,
        types:
          role.permissions.find((p) => p.featureId === feature.id)?.types || [],
      })),
    });
    setEditingId(role.id);
  };

  const handleDelete = (id) => {
    const roleToDelete = roles.find((role) => role.id === id);
    setRoles(roles.filter((role) => role.id !== id));
    logAuditTrail("delete", id, `Deleted role: ${roleToDelete.name}`);
  };

  return (
    <div className="roles-container">
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
                  <tr key={feature.id}>
                    <td>{feature.title}</td>
                    {PERMISSION_TYPES.map((type) => (
                      <td key={type.value}>
                        <input
                          type="checkbox"
                          checked={
                            formData.permissions
                              .find((p) => p.featureId === feature.id)
                              ?.types?.includes(type.value) ?? false
                          }
                          onChange={(e) =>
                            handlePermissionChange(
                              feature.id,
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
                    .map((p) => {
                      const feature = FEATURES.find(
                        (f) => f.id === p.featureId
                      );
                      return feature
                        ? `${feature.title} (${p.types.join(", ")})`
                        : "";
                    })
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
                {new Date(entry.timestamp).toLocaleString()}
              </span>
              <span className="audit-action">{entry.action}</span>
              <span className="audit-details">{entry.details}</span>
              <span className="audit-user">{entry.performedBy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolesTab;
