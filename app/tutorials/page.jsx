"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { toast } from "sonner";
import styles from "./tutorials.module.css";
import Link from "next/link";
import TutorialModal from "./components/TutorialModal";
import { AdminLayout } from "../components/layout/admin-layout";
import { tutorialService } from "@/lib/services/tutorial-service";

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = async () => {
    try {
      const data = await tutorialService.getAllTutorials();
      setTutorials(data);
    } catch (error) {
      console.error("Error loading tutorials:", error);
      toast.error("Failed to load tutorials");
    } finally {
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const handleAddNew = () => {
    setCurrentTutorial(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tutorial) => {
    setCurrentTutorial(tutorial);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this tutorial?")) {
      setTutorials(tutorials.filter((tutorial) => tutorial.id !== id));
      toast.success("Tutorial deleted successfully");
    }
  };

  const handleToggleVisibility = async (tutorial) => {
    try {
      const updatedTutorial = await tutorialService.updateTutorial(
        tutorial.id,
        {
          ...tutorial,
          isVisible: !tutorial.isVisible,
        }
      );
      setTutorials(
        tutorials.map((t) =>
          t.id === tutorial.id ? { ...t, isVisible: !t.isVisible } : t
        )
      );
      toast.success(
        `Tutorial ${tutorial.isVisible ? "hidden" : "visible"} successfully`
      );
    } catch (error) {
      console.error("Error updating tutorial visibility:", error);
      toast.error("Failed to update tutorial visibility");
    }
  };

  const filteredTutorials = tutorials.filter(
    (tutorial) =>
      (selectedType === "all" || tutorial.type === selectedType) &&
      (tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tutorials</h1>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <Input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
              className={styles.typeSelect}
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
            </Select>
          </div>
          <Button onClick={handleAddNew} className={styles.addButton}>
            Add Tutorial
          </Button>
        </div>

        <div className={styles.tutorialGrid}>
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} className={styles.tutorialCard}>
              <div className={styles.cardContent}>
                <h3 className={styles.tutorialTitle}>{tutorial.title}</h3>
                <p className={styles.tutorialDescription}>
                  {tutorial.description}
                </p>
                <div className={styles.tutorialMeta}>
                  <span className={styles.tutorialType}>
                    {tutorial.type.toUpperCase()}
                  </span>
                  <span className={styles.tutorialDate}>
                    {tutorial.createdAt}
                  </span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleVisibility(tutorial)}
                  className={
                    tutorial.isVisible ? styles.visible : styles.hidden
                  }
                >
                  {tutorial.isVisible ? "Published" : "Draft"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(tutorial)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(tutorial.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <TutorialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tutorial={currentTutorial}
          onSave={async (formData) => {
            try {
              if (currentTutorial) {
                const updatedTutorial = await tutorialService.updateTutorial(
                  currentTutorial.id,
                  formData
                );
                setTutorials(
                  tutorials.map((t) =>
                    t.id === currentTutorial.id ? updatedTutorial : t
                  )
                );
                toast.success("Tutorial updated successfully");
              } else {
                const newTutorial = await tutorialService.createTutorial(
                  formData
                );
                setTutorials([...tutorials, newTutorial]);
                toast.success("Tutorial created successfully");
              }
              setIsModalOpen(false);
            } catch (error) {
              console.error("Error saving tutorial:", error);
              toast.error("Failed to save tutorial");
            }
          }}
        />
      </div>
    </AdminLayout>
  );
}
