"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "../page.module.css";
import ContestModal from "./ContestModal";
import ContestProfile from "./ContestProfile";

export default function ContestsList() {
  const [showProfiles, setShowProfiles] = useState(false);
  const [contests, setContests] = useState([
    {
      id: 1,
      title: "Summer Photo Contest",
      status: "Unpublished",
      frequency: "Weekly",
      registrationStartDateTime: "2024-02-01",
      registrationEndDateTime: "2024-02-15",
      startDateTime: "2024-02-16",
      endDateTime: "2024-02-28",
      minParticipants: 10,
    },
    {
      id: 2,
      title: "Best Story Contest",
      status: "Unpublished",
      frequency: "Monthly",
      registrationStartDateTime: "2024-03-01",
      registrationEndDateTime: "2024-03-15",
      startDateTime: "2024-03-16",
      endDateTime: "2024-03-31",
      minParticipants: 20,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContest, setCurrentContest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateContest = () => {
    setCurrentContest(null);
    setIsModalOpen(true);
  };

  const handleEditContest = (contest) => {
    setCurrentContest(contest);
    setIsModalOpen(true);
  };

  const handleDeleteContest = (id) => {
    if (window.confirm("Are you sure you want to delete this contest?")) {
      setContests(contests.filter((contest) => contest.id !== id));
    }
  };

  const handleSaveContest = (formData) => {
    if (currentContest) {
      setContests(
        contests.map((c) =>
          c.id === currentContest.id ? { ...c, ...formData } : c
        )
      );
    } else {
      setContests([...contests, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  const handlePublishContest = (id) => {
    setContests(
      contests.map((contest) =>
        contest.id === id ? { ...contest, status: "Published" } : contest
      )
    );
  };

  const handleUnpublishContest = (id) => {
    setContests(
      contests.map((contest) =>
        contest.id === id ? { ...contest, status: "Unpublished" } : contest
      )
    );
  };

  const filteredContests = contests.filter((contest) =>
    contest.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search contests..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button onClick={() => setShowProfiles(!showProfiles)}>
            {showProfiles ? "View Contests" : "View Profiles"}
          </Button>
          {!showProfiles && (
            <Button onClick={handleCreateContest}>
              <Plus className={styles.buttonIcon} />
              Create Contest
            </Button>
          )}
        </div>
      </div>

      {showProfiles ? (
        <ContestProfile />
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Frequency</th>
                <th>Registration Period</th>
                <th>Contest Period</th>
                <th>Min. Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.title}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[contest.status.toLowerCase()]
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td>{contest.frequency}</td>
                  <td>
                    {new Date(
                      contest.registrationStartDateTime
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      contest.registrationEndDateTime
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(contest.startDateTime).toLocaleDateString()} -{" "}
                    {new Date(contest.endDateTime).toLocaleDateString()}
                  </td>
                  <td>{contest.minParticipants}</td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditContest(contest)}
                        disabled={contest.status === "Published"}
                      >
                        <Edit className={styles.actionIcon} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContest(contest.id)}
                      >
                        <Trash2 className={styles.actionIcon} />
                      </Button>
                      {contest.status === "Unpublished" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePublishContest(contest.id)}
                        >
                          Publish
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnpublishContest(contest.id)}
                        >
                          Unpublish
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <ContestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveContest}
          contest={currentContest}
        />
      )}
    </div>
  );
}
