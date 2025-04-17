import { db } from "@/lib/firebase";
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

const CONTESTANTS_COLLECTION = "contestants";

export const contestantsService = {
  async getAllContestants() {
    try {
      const querySnapshot = await getDocs(
        collection(db, CONTESTANTS_COLLECTION)
      );
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting contestants:", error);
      throw error;
    }
  },

  async createContestant(contestantData) {
    try {
      const dataWithTimestamp = {
        ...contestantData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "Pending",
      };
      const docRef = await addDoc(
        collection(db, CONTESTANTS_COLLECTION),
        dataWithTimestamp
      );
      return {
        id: docRef.id,
        ...dataWithTimestamp,
      };
    } catch (error) {
      console.error("Error creating contestant:", error);
      throw error;
    }
  },

  async updateContestant(id, contestantData) {
    try {
      const dataWithTimestamp = {
        ...contestantData,
        updatedAt: serverTimestamp(),
      };
      const contestantRef = doc(db, CONTESTANTS_COLLECTION, id);
      await updateDoc(contestantRef, dataWithTimestamp);
      return {
        id,
        ...dataWithTimestamp,
      };
    } catch (error) {
      console.error("Error updating contestant:", error);
      throw error;
    }
  },

  async updateContestantStatus(id, status) {
    try {
      const contestantRef = doc(db, CONTESTANTS_COLLECTION, id);
      await updateDoc(contestantRef, {
        status,
        updatedAt: serverTimestamp(),
      });
      return { id, status };
    } catch (error) {
      console.error("Error updating contestant status:", error);
      throw error;
    }
  },

  async deleteContestant(id) {
    try {
      const contestantRef = doc(db, CONTESTANTS_COLLECTION, id);
      await deleteDoc(contestantRef);
      return id;
    } catch (error) {
      console.error("Error deleting contestant:", error);
      throw error;
    }
  },
};
