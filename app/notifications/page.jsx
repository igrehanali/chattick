"use client";

import React, { useEffect, useState } from "react";
import { AdminLayout } from "../components/layout/admin-layout";
import { Button } from "../components/ui/button";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import toast from "react-hot-toast";
import styles from "./page.module.css";

const TABS = [
  { label: "Terms", value: "terms" },
  { label: "Privacy", value: "privacy" },
  { label: "About", value: "about" },
];

export default function NotificationsPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [activeTab, setActiveTab] = useState("terms");
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const fetchPDFs = async (type) => {
    const q = query(collection(db, "legalDocs"), where("type", "==", type));
    const snapshot = await getDocs(q);
    const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUploadedPDFs(files);

    // Auto-display the only (or first) PDF
    if (files.length > 0) {
      setSelectedPDF(files[0].url);
    } else {
      setSelectedPDF(null);
    }
  };

  useEffect(() => {
    fetchPDFs(activeTab);
  }, [activeTab]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const deletePreviousPDF = async () => {
    if (uploadedPDFs.length > 0) {
      const existing = uploadedPDFs[0];
      await deleteDoc(doc(db, "legalDocs", existing.id));

      const fileRef = ref(
        storage,
        existing.url.split("/o/")[1].split("?")[0].replace(/%2F/g, "/")
      );
      await deleteObject(fileRef);
    }
  };

  const handleUpload = async () => {
    if (!pdfFile)
      return toast.error("Please select a PDF file", { duration: 3000 });

    const loadingToast = toast.loading(`Uploading ${pdfFile.name}...`);
    try {
      // Delete existing one
      await deletePreviousPDF();

      const fileRef = ref(
        storage,
        `pdfs/${activeTab}_${Date.now()}_${pdfFile.name}`
      );
      const uploadResult = await uploadBytes(fileRef, pdfFile);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, "legalDocs"), {
        name: pdfFile.name,
        url: downloadURL,
        type: activeTab,
        uploadedAt: new Date(),
      });

      setPdfFile(null);
      toast.success("PDF uploaded successfully", {
        id: loadingToast,
        duration: 3000,
      });
      fetchPDFs(activeTab);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Failed to upload PDF. Please try again.", {
        id: loadingToast,
        duration: 3000,
      });
    }
  };

  const handleDelete = async (fileId, fileUrl) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PDF?"
    );
    if (!confirmDelete) return;

    const loadingToast = toast.loading("Deleting PDF...");
    try {
      await deleteDoc(doc(db, "legalDocs", fileId));

      const fileRef = ref(
        storage,
        fileUrl.split("/o/")[1].split("?")[0].replace(/%2F/g, "/")
      );
      await deleteObject(fileRef);

      toast.success("PDF deleted successfully", {
        id: loadingToast,
        duration: 3000,
      });
      fetchPDFs(activeTab);
    } catch (error) {
      console.error("Error deleting PDF:", error);
      toast.error("Failed to delete PDF. Please try again.", {
        id: loadingToast,
        duration: 3000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Legal Documents Manager</h1>

        {/* Tabs */}
        <div className="flex space-x-4">
          {TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* PDF Viewer */}
        {selectedPDF && (
          <div className={styles.pdfViewer}>
            <div className={styles.pdfContainer}>
              <iframe
                src={selectedPDF}
                title="PDF Viewer"
                className={styles.pdfFrame}
              ></iframe>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div className="space-y-4 pt-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <Button onClick={handleUpload}>Upload PDF to {activeTab}</Button>
        </div>

        {/* Uploaded PDF Info */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            {uploadedPDFs.length === 0
              ? "No document uploaded yet."
              : `Uploaded ${activeTab} PDF`}
          </h2>

          {uploadedPDFs.length > 0 && (
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
              <div>
                <p className="font-medium">{uploadedPDFs[0].name}</p>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDelete(uploadedPDFs[0].id, uploadedPDFs[0].url)
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
