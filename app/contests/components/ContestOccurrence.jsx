"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Eye, Trophy } from "lucide-react";
import styles from "../page.module.css";
import { contestService } from "@/lib/services/contest-service";

export default function ContestOccurrence() {
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    const loadOccurrences = async () => {
      try {
        const occurrencesData = await contestService.getAllOccurrences();
        setOccurrences(occurrencesData);
      } catch (error) {
        console.error("Error loading occurrences:", error);
      }
    };
    loadOccurrences();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusClass = (status) => {
    const statusClasses = {
      Registering: styles.registering,
      Started: styles.started,
      Ended: styles.ended,
      Closed: styles.closed,
    };
    return `${styles.status} ${statusClasses[status] || ""}`;
  };

  const viewParticipants = (occurrenceId) => {
    // Implement view participants logic
    console.log(`View participants for occurrence ${occurrenceId}`);
  };

  const viewWinners = (occurrenceId) => {
    // Implement view winners logic
    console.log(`View winners for occurrence ${occurrenceId}`);
  };

  const filteredOccurrences = occurrences.filter((occurrence) =>
    occurrence.occurrenceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search occurrences..."
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
              <th>Contest ID</th>
              <th>Occurrence ID</th>
              <th>Start DateTime</th>
              <th>End DateTime</th>
              <th>Status</th>
              <th>Participants</th>
              <th>Prize Pool</th>
              <th>Winners</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOccurrences.map((occurrence) => (
              <tr key={occurrence.id}>
                <td>{occurrence.contestId}</td>
                <td>{occurrence.occurrenceId}</td>
                <td>{occurrence.startDateTime}</td>
                <td>{occurrence.endDateTime}</td>
                <td>
                  <span className={getStatusClass(occurrence.status)}>
                    {occurrence.status}
                  </span>
                </td>
                <td>{occurrence.participantsCount}</td>
                <td>{occurrence.prizePool}</td>
                <td>{occurrence.winnersCount}</td>
                <td>
                  <div className={styles.actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewParticipants(occurrence.occurrenceId)}
                    >
                      <Eye className={styles.actionIcon} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewWinners(occurrence.occurrenceId)}
                    >
                      <Trophy className={styles.actionIcon} />
                    </Button>
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
