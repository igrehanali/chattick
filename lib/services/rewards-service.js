import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "rewards";

export const rewardsService = {
  getAllRewards: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting rewards:", error);
      throw error;
    }
  },

  getRewardById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error("Reward not found");
    } catch (error) {
      console.error("Error getting reward:", error);
      throw error;
    }
  },

  createReward: async (rewardData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...rewardData,
        status: "active",
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...rewardData, status: "active" };
    } catch (error) {
      console.error("Error creating reward:", error);
      throw error;
    }
  },

  updateReward: async (id, rewardData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...rewardData,
        updatedAt: new Date().toISOString(),
      });
      return { id, ...rewardData };
    } catch (error) {
      console.error("Error updating reward:", error);
      throw error;
    }
  },

  deleteReward: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error deleting reward:", error);
      throw error;
    }
  },

  toggleRewardStatus: async (id, status) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status,
        updatedAt: new Date().toISOString(),
      });
      return { id, status };
    } catch (error) {
      console.error("Error toggling reward status:", error);
      throw error;
    }
  },
};
