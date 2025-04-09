import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const TUTORIALS_COLLECTION = "tutorials";

export const tutorialService = {
  async getAllTutorials() {
    const querySnapshot = await getDocs(collection(db, TUTORIALS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createTutorial(formData) {
    let fileUrl = formData.url;

    if (formData.file) {
      const storageRef = ref(storage, `tutorials/${formData.file.name}`);
      await uploadBytes(storageRef, formData.file);
      fileUrl = await getDownloadURL(storageRef);
    }

    const dataWithTimestamp = {
      ...formData,
      url: fileUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    delete dataWithTimestamp.file;

    const docRef = await addDoc(
      collection(db, TUTORIALS_COLLECTION),
      dataWithTimestamp
    );

    await updateDoc(docRef, {
      id: docRef.id,
    });
  },

  async updateTutorial(id, tutorialData, file = null) {
    let fileUrl = tutorialData.url;

    if (file) {
      // Delete old file if it exists and is in Firebase Storage
      if (tutorialData.url && tutorialData.url.includes("firebase")) {
        const oldFileRef = ref(storage, tutorialData.url);
        try {
          await deleteObject(oldFileRef);
        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }

      // Upload new file
      const storageRef = ref(storage, `tutorials/${file.name}`);
      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }

    const dataWithTimestamp = {
      ...tutorialData,
      url: fileUrl,
      updatedAt: serverTimestamp(),
    };

    const tutorialRef = doc(db, TUTORIALS_COLLECTION, id);
    await updateDoc(tutorialRef, dataWithTimestamp);

    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteTutorial(id) {
    try {
      console.log("Deleting tutorial from Firestore with ID:", id);

      const tutorialRef = doc(db, TUTORIALS_COLLECTION, id);
      await deleteDoc(tutorialRef);

      console.log("Tutorial deleted successfully from Firestore.");
      return id;
    } catch (error) {
      console.error("Error deleting tutorial from Firestore:", error);
      throw new Error("Failed to delete tutorial.");
    }
  },
  async getTutorialsByType(type) {
    const q = query(
      collection(db, TUTORIALS_COLLECTION),
      where("type", "==", type)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
