"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { toast } from "sonner";
import styles from "./tutorials.module.css";
import Link from "next/link";
import TutorialModal from "./components/TutorialModal";
import { AdminLayout } from "../components/layout/admin-layout";

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Learn the basics of using our platform",
      type: "pdf",
      url: "/tutorials/getting-started.pdf",
      createdAt: "2024-01-15",
      isVisible: true,
    },
    {
      id: 2,
      title: "Advanced Features Tutorial",
      description: "Deep dive into advanced platform features",
      type: "video",
      url: "https://example.com/tutorial-video",
      createdAt: "2024-01-20",
      isVisible: true,
    },
    {
      id: 3,
      title: "React Performance Optimization",
      description:
        "Learn techniques to optimize your React applications for better performance",
      type: "video",
      url: "https://example.com/react-performance",
      createdAt: "2024-02-01",
      isVisible: true,
    },
    {
      id: 4,
      title: "State Management with Redux",
      description:
        "Master global state management using Redux in your React applications",
      type: "pdf",
      url: "/tutorials/redux-guide.pdf",
      createdAt: "2024-02-05",
      isVisible: false,
    },
    {
      id: 5,
      title: "Next.js API Routes",
      description: "Build and deploy serverless API endpoints with Next.js",
      type: "video",
      url: "https://example.com/nextjs-api",
      createdAt: "2024-02-10",
      isVisible: true,
    },
    {
      id: 6,
      title: "Testing Best Practices",
      description:
        "Comprehensive guide to unit testing and integration testing in React",
      type: "pdf",
      url: "/tutorials/testing-guide.pdf",
      createdAt: "2024-02-15",
      isVisible: false,
    },
  ]);

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

  const handleToggleVisibility = (tutorial) => {
    setTutorials(
      tutorials.map((t) =>
        t.id === tutorial.id ? { ...t, isVisible: !t.isVisible } : t
      )
    );
    toast.success(
      `Tutorial ${tutorial.isVisible ? "hidden" : "shown"} successfully`
    );
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
          onSave={(formData) => {
            if (currentTutorial) {
              setTutorials(
                tutorials.map((t) =>
                  t.id === currentTutorial.id ? { ...t, ...formData } : t
                )
              );
            } else {
              setTutorials([
                ...tutorials,
                { id: tutorials.length + 1, ...formData },
              ]);
            }
            setIsModalOpen(false);
          }}
        />
      </div>
    </AdminLayout>
  );
}
