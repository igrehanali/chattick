"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "../page.module.css";
import ContestModal from "./ContestModal";
import ContestProfile from "./ContestProfile";
import PrizePoolModal from "./PrizePoolModal";

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
  const [isPrizePoolModalOpen, setIsPrizePoolModalOpen] = useState(false);
  const [prizePools, setPrizePools] = useState([
    {
      id: 1,
      minParticipants: 50,
      maxParticipants: 100,
      prizePool: 1000,
      numberOfWinners: 3
    }
  ]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Add this handler after other handlers
  const handleAddPrizePool = () => {
    if (prizePools.length < 5) {
      setIsPrizePoolModalOpen(true);
    }
  };

  const handleSavePrizePool = (data) => {
    if (prizePools.length < 5) {
      setPrizePools([...prizePools, { id: Date.now(), ...data }]);
    }
    setIsPrizePoolModalOpen(false);
  };

  const handleDeletePrizePool = (id) => {
    setPrizePools(prizePools.filter(pool => pool.id !== id));
  };

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
                      className={`${styles.status} ${styles[contest.status.toLowerCase()]
                        }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td>{contest.frequency}</td>

                  <td>
                    {formatDate(contest.registrationStartDateTime)} -{' '}
                    {formatDate(contest.registrationEndDateTime)}
                  </td>
                  <td>
                    {formatDate(contest.startDateTime)} -{' '}
                    {formatDate(contest.endDateTime)}
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

      <PrizePoolModal
        isOpen={isPrizePoolModalOpen}
        onClose={() => setIsPrizePoolModalOpen(false)}
        onSave={handleSavePrizePool}
        existingRanges={prizePools}
      />
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Prize Pool Configurations</h3>
          <Button
            onClick={handleAddPrizePool}
            disabled={prizePools.length >= 5}
          >
            <Plus className={styles.buttonIcon} />
            Add Prize Pool Range
          </Button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Participant Range</th>
                <th>Prize Pool (Points)</th>
                <th>Number of Winners</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prizePools.map((pool) => (
                <tr key={pool.id}>
                  <td>{pool.minParticipants} - {pool.maxParticipants}</td>
                  <td>{pool.prizePool}</td>
                  <td>{pool.numberOfWinners}</td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePrizePool(pool.id)}
                      >
                        <Trash2 className={styles.actionIcon} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
