"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import styles from "../page.module.css";
import ContestModal from "./ContestModal";
import ContestProfile from "./ContestProfile";
import PrizePoolModal from "./PrizePoolModal";
import { contestService } from "@/lib/services/contest-service";

export default function ContestsList() {
  const [showProfiles, setShowProfiles] = useState(false);
  const [contests, setContests] = useState([]);

  const OccurrenceData = [
    {
      contestId: "CON9974",
      occurrenceID: `OCUR${Math.floor(Math.random() * 100)}`,
      startDate: new Date(),
      endDate: new Date(),
      status: "Closed",
    },
    {
      contestId: "CON9865",
      occurrenceID: "OCUR987",
      startDate: new Date(),
      endDate: new Date(),
      status: "Registering",
    },
    {
      contestId: "CON5383",
      occurrenceID: "OCUR4534",
      startDate: new Date(),
      endDate: new Date(),
      status: "Start",
    },
    {
      contestId: "CON9874",
      occurrenceID: "OCUR5467",
      startDate: new Date(),
      endDate: new Date(),
      status: "Ended",
    },
  ];

  useEffect(() => {
    const loadContests = async () => {
      try {
        const contestsData = await contestService.getAllContests();
        setContests(contestsData);
      } catch (error) {
        console.error("Error loading contests:", error);
      }
    };
    loadContests();
  }, []);
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
      numberOfWinners: 3,
    },
  ]);

  const handleCreateContest = () => {
    setCurrentContest(null);
    setIsModalOpen(true);
  };

  const handleEditContest = (contest) => {
    setCurrentContest(contest);
    setIsModalOpen(true);
  };

  const handleDeleteContest = async (id) => {
    if (window.confirm("Are you sure you want to delete this contest?")) {
      try {
        await contestService.deleteContest(id);
        setContests(contests.filter((contest) => contest.id !== id));
      } catch (error) {
        console.error("Error deleting contest:", error);
      }
    }
  };

  const handleSaveContest = async (formData) => {
    try {
      if (currentContest) {
        const updatedContest = await contestService.updateContest(
          currentContest.id,
          formData
        );
        setContests(
          contests.map((c) => (c.id === currentContest.id ? updatedContest : c))
        );
      } else {
        const newContest = await contestService.createContest(formData);
        setContests([...contests, newContest]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving contest:", error);
    }
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
    contest.contestName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
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
    setPrizePools(prizePools.filter((pool) => pool.id !== id));
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
                  <td>{contest.contestName}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[contest.status.toLowerCase()]
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td>{contest.contestType}</td>
                  <td>
                    {formatDate(contest.registrationStartDate)} -{" "}
                    {formatDate(contest.registrationEndDate)}
                  </td>
                  <td>
                    {formatDate(contest.startDate)} -{" "}
                    {formatDate(contest.endDate)}
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.OccurrenceTable}>
        <h3>Occurrence Table</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Contest ID</th>
              <th>Occurrence ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {OccurrenceData.map((contest, index) => (
              <tr key={index}>
                <td>{contest.contestId}</td>
                <td>{contest.occurrenceID}</td>
                <td>{contest.startDate.toLocaleString()}</td>
                <td>{contest.endDate.toLocaleString()}</td>
                <td>{contest.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                  <td>
                    {pool.minParticipants} - {pool.maxParticipants}
                  </td>
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
