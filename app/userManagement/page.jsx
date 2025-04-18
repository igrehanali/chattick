"use client";

import React, { useState } from "react";
import { AdminLayout } from "../components/layout/admin-layout";
import styles from "./locations.module.css";
import { Button } from "../components/ui/button";

const AllowedLocationsPage = () => {
  const [allowedCountries, setAllowedCountries] = useState([
    { id: 1, name: "Pakistan", status: "active" },
    { id: 2, name: "United States", status: "active" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null);

  const handleAddCountry = () => {
    setCurrentCountry(null);
    setIsModalOpen(true);
  };

  const handleEditCountry = (country) => {
    setCurrentCountry(country);
    setIsModalOpen(true);
  };

  const handleDeleteCountry = (countryId) => {
    setAllowedCountries(allowedCountries.filter((c) => c.id !== countryId));
  };

  const handleSaveCountry = (formData) => {
    if (currentCountry) {
      setAllowedCountries(
        allowedCountries.map((c) =>
          c.id === currentCountry.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCountry = {
        id: Date.now(),
        ...formData,
        status: "active",
      };
      setAllowedCountries([...allowedCountries, newCountry]);
    }
    setIsModalOpen(false);
  };

  const filteredCountries = allowedCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className={styles.locationsContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Allowed Registration Countries</h1>
          <Button className={styles.addButton} onClick={handleAddCountry}>
            + Add Country
          </Button>
        </div>

        <input
          type="text"
          placeholder="Search countries..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Country</th>
              <th className={styles.tableHeader}>Status</th>
              <th className={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCountries.map((country) => (
              <tr key={country.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{country.name}</td>
                <td className={styles.tableCell}>{country.status}</td>
                <td className={styles.tableCell}>
                  <button
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => handleEditCountry(country)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDeleteCountry(country.id)}
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
              <h2>{currentCountry ? "Edit Country" : "Add Country"}</h2>
              <CountryForm
                country={currentCountry}
                onSave={handleSaveCountry}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const CountryForm = ({ country, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: country?.name || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Country Name</label>
        <input
          type="text"
          className={styles.input}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

export default AllowedLocationsPage;
