"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import styles from "../page.module.css";

export default function ContestProfile() {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      location: "United States",
      profilePic: "/default-profile.png",
      status: "Pending", // Pending, Approved, Disapproved, Suspended
      createdAt: "2024-02-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleApproveProfile = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, status: "Approved" } : profile
      )
    );
  };

  const handleDisapproveProfile = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, status: "Disapproved" } : profile
      )
    );
  };

  const handleSuspendProfile = (id) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === id ? { ...profile, status: "Suspended" } : profile
      )
    );
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search profiles..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((profile) => (
              <tr key={profile.id}>
                <td>
                  <img
                    src={profile.profilePic}
                    alt={profile.name}
                    className={styles.profilePic}
                    width={40}
                    height={40}
                  />
                </td>
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{profile.location}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[profile.status.toLowerCase()]
                    }`}
                  >
                    {profile.status}
                  </span>
                </td>
                <td>{new Date(profile.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={styles.actions}>
                    {profile.status !== "Approved" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApproveProfile(profile.id)}
                      >
                        Approve
                      </Button>
                    )}
                    {profile.status !== "Disapproved" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisapproveProfile(profile.id)}
                      >
                        Disapprove
                      </Button>
                    )}
                    {profile.status !== "Suspended" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSuspendProfile(profile.id)}
                      >
                        Suspend
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
