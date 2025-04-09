import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const POINTS_BUNDLES_COLLECTION = "pointsBundles";

export const pointsBundleService = {
  getAllPointsBundles: async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, POINTS_BUNDLES_COLLECTION)
      );
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting points bundles:", error);
      throw error;
    }
  },

  getPointsBundle: async (id) => {
    try {
      const docRef = doc(db, POINTS_BUNDLES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      }
      throw new Error("Points bundle not found");
    } catch (error) {
      console.error("Error getting points bundle:", error);
      throw error;
    }
  },

  createPointsBundle: async (bundleData) => {
    try {
      const dataWithTimestamp = {
        ...bundleData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(
        collection(db, POINTS_BUNDLES_COLLECTION),
        dataWithTimestamp
      );
      await updateDoc(docRef, { id: docRef.id });
      return {
        id: docRef.id,
        ...dataWithTimestamp,
      };
    } catch (error) {
      console.error("Error creating points bundle:", error);
      throw error;
    }
  },

  updatePointsBundle: async (id, bundleData) => {
    try {
      const dataWithTimestamp = {
        ...bundleData,
        updatedAt: serverTimestamp(),
      };
      const docRef = doc(db, POINTS_BUNDLES_COLLECTION, id);
      await updateDoc(docRef, dataWithTimestamp);
      return {
        id,
        ...dataWithTimestamp,
      };
    } catch (error) {
      console.error("Error updating points bundle:", error);
      throw error;
    }
  },

  deletePointsBundle: async (id) => {
    try {
      const docRef = doc(db, POINTS_BUNDLES_COLLECTION, id);
      await deleteDoc(docRef);
      return { id };
    } catch (error) {
      console.error("Error deleting points bundle:", error);
      throw error;
    }
  },
};
