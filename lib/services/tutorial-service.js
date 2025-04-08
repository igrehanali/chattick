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

  async createTutorial(tutorialData, file = null) {
    let fileUrl = tutorialData.url;

    if (file) {
      const storageRef = ref(storage, `tutorials/${file.name}`);
      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }

    const dataWithTimestamp = {
      ...tutorialData,
      url: fileUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, TUTORIALS_COLLECTION),
      dataWithTimestamp
    );

    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
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

  async deleteTutorial(id, fileUrl) {
    // Delete file from storage if it exists and is in Firebase Storage
    if (fileUrl && fileUrl.includes("firebase")) {
      const fileRef = ref(storage, fileUrl);
      try {
        await deleteObject(fileRef);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }

    const tutorialRef = doc(db, TUTORIALS_COLLECTION, id);
    await deleteDoc(tutorialRef);
    return id;
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
