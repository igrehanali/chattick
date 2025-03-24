"use client";

import React, { useState } from "react";
import { AdminLayout } from "../components/layout/admin-layout";
import styles from "./locations.module.css";
import { Button } from "../components/ui/button";

const LocationsPage = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "New York", address: "123 Broadway, NY", status: "active" },
    {
      id: 2,
      name: "Los Angeles",
      address: "456 Hollywood Blvd, LA",
      status: "active",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleAddLocation = () => {
    setCurrentLocation(null);
    setIsModalOpen(true);
  };

  const handleEditLocation = (location) => {
    setCurrentLocation(location);
    setIsModalOpen(true);
  };

  const handleDeleteLocation = (locationId) => {
    setLocations(locations.filter((loc) => loc.id !== locationId));
  };

  const handleSaveLocation = (formData) => {
    if (currentLocation) {
      // Update existing location
      setLocations(
        locations.map((loc) =>
          loc.id === currentLocation.id ? { ...loc, ...formData } : loc
        )
      );
    } else {
      // Add new location
      const newLocation = {
        id: Date.now(),
        ...formData,
        status: "active",
      };
      setLocations([...locations, newLocation]);
    }
    setIsModalOpen(false);
  };

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className={styles.locationsContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Locations Management</h1>
          <Button className={styles.addButton} onClick={handleAddLocation}>
            + Add Location
          </Button>
        </div>

        <input
          type="text"
          placeholder="Search locations..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>Address</th>
              <th className={styles.tableHeader}>Status</th>
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((location) => (
              <tr key={location.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{location.name}</td>
                <td className={styles.tableCell}>{location.address}</td>
                <td className={styles.tableCell}>{location.status}</td>
                <td className={styles.tableCell}>
                  <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => handleEditLocation(location)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDeleteLocation(location.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{currentLocation ? "Edit Location" : "Add Location"}</h2>
              <LocationForm
                location={currentLocation}
                onSave={handleSaveLocation}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const LocationForm = ({ location, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: location?.name || "",
    address: location?.address || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          className={styles.input}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Address</label>
        <input
          type="text"
          className={styles.input}
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <Button type="submit" className={styles.saveButton}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default LocationsPage;
