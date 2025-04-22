"use client";

import React, { useState, useEffect } from "react"; // Added useEffect
import { AdminLayout } from "../components/layout/admin-layout";
import styles from "./locations.module.css";
import { Button } from "../components/ui/button";
import { db } from "../../lib/firebase"; // Import Firestore instance
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore"; // Import Firestore functions
import toast from "react-hot-toast";
import Loader from "@/lib/loader";

const AllowedLocationsPage = () => {
  const [allowedCountries, setAllowedCountries] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading stae
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(null); // Keep track of the country being edited (including its Firestore ID)

  // Fetch countries from Firestore on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "allowedCountries"));
        const countriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Use Firestore document ID
          ...doc.data(),
        }));
        setAllowedCountries(countriesList);
      } catch (error) {
        console.error("Error fetching countries: ", error);
        toast.error("Failed to fetch countries");
        // Handle error (e.g., show a toast message)
      }
      setLoading(false);
    };

    fetchCountries();
  }, []);

  const handleAddCountry = () => {
    setCurrentCountry(null); // No current country means we are adding
    setIsModalOpen(true);
  };

  const handleEditCountry = (country) => {
    setCurrentCountry(country); // Set the country to be edited (includes Firestore ID)
    setIsModalOpen(true);
  };

  const handleDeleteCountry = async (countryId) => {
    if (!countryId) return;
    try {
      await deleteDoc(doc(db, "allowedCountries", countryId));
      setAllowedCountries(allowedCountries.filter((c) => c.id !== countryId));
      console.log("Country deleted successfully");
      toast.success("Country deleted successfully");
    } catch (error) {
      console.error("Error deleting country: ", error);
      toast.error("Failed to delete country");
    }
  };
  // Combined function to handle both Add and Edit submissions
  const handleSaveCountry = async (formData) => {
    const countryData = {
      name: formData.name,
      status: formData.status || "active",
      createdAt: Timestamp.now(),
    };

    setLoading(true); // Indicate loading state

    try {
      if (currentCountry && currentCountry.id) {
        const countryRef = doc(db, "allowedCountries", currentCountry.id);
        await updateDoc(countryRef, countryData);
        setAllowedCountries(
          allowedCountries.map((c) =>
            c.id === currentCountry.id ? { ...c, ...countryData } : c
          )
        );
        console.log("Country updated successfully");
        toast.success("Country updated successfully");
      } else {
        const docRef = await addDoc(
          collection(db, "allowedCountries"),
          countryData
        );
        setAllowedCountries([
          ...allowedCountries,
          { id: docRef.id, ...countryData },
        ]);
        console.log("Country added successfully with ID: ", docRef.id);
        toast.success("Country added successfully");
      }
      setIsModalOpen(false);
      setCurrentCountry(null);
    } catch (error) {
      console.error("Error saving country: ", error);
      toast.error("Failed to save country");
    }
    setLoading(false);
  };

  const filteredCountries = allowedCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className={styles.locationsContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Allowed Registration Countries</h1>
          <Button
            className={styles.addButton}
            onClick={handleAddCountry}
            disabled={loading}
          >
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

        {loading ? (
          <Loader />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Country</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No countries found.
                  </td>
                </tr>
              ) : (
                filteredCountries.map((country) => (
                  <tr key={country.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{country.name}</td>
                    <td className={styles.tableCell}>{country.status}</td>
                    <td className={styles.tableCell}>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => handleEditCountry(country)}
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteCountry(country.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>{currentCountry ? "Edit Country" : "Add Country"}</h2>
              {/* Pass loading state to disable form during operations */}
              <CountryForm
                country={currentCountry}
                onSave={handleSaveCountry}
                onCancel={() => {
                  setIsModalOpen(false);
                  setCurrentCountry(null); // Reset current country on cancel
                }}
                isLoading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Update CountryForm to accept isLoading prop and potentially status field
const CountryForm = ({ country, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: country?.name || "",
    status: country?.status || "active", // Include status, default to active
  });

  // Update form data if the country prop changes (e.g., when opening edit modal)
  useEffect(() => {
    setFormData({
      name: country?.name || "",
      status: country?.status || "active",
    });
  }, [country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      // Prevent submission if already loading
      onSave(formData);
    }
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
          disabled={isLoading} // Disable input when loading
        />
      </div>
      {/* Optional: Add a field to edit status */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Status</label>
        <select
          className={styles.select} // Assuming you have a select style
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          disabled={isLoading}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isLoading} // Disable button when loading
        >
          Cancel
        </button>
        <Button
          type="submit"
          className={styles.saveButton}
          disabled={isLoading}
        >
          {" "}
          {/* Disable button when loading */}
          {isLoading ? "Saving..." : "Save"} {/* Show loading text */}
        </Button>
      </div>
    </form>
  );
};

export default AllowedLocationsPage;
