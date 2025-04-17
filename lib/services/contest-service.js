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

const CONTESTS_COLLECTION = "contests";
const OCCURRENCES_COLLECTION = "contestOccurrences";
const GIFTS_COLLECTION = "gifts";
const POINTS_BUNDLES_COLLECTION = "pointsBundles";
const REWARDS_COLLECTION = "rewards";

export const contestService = {
  // Contest Operations
  async getAllContests() {
    const querySnapshot = await getDocs(collection(db, CONTESTS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createContest(contestData) {
    const dataWithTimestamp = {
      ...contestData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, CONTESTS_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateContest(id, contestData) {
    const dataWithTimestamp = {
      ...contestData,
      updatedAt: serverTimestamp(),
    };
    const contestRef = doc(db, CONTESTS_COLLECTION, id);
    await updateDoc(contestRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteContest(id) {
    const contestRef = doc(db, CONTESTS_COLLECTION, id);
    await deleteDoc(contestRef);
    return id;
  },

  // Contest Occurrence Operations
  async getAllOccurrences() {
    const querySnapshot = await getDocs(collection(db, OCCURRENCES_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createOccurrence(occurrenceData) {
    const dataWithTimestamp = {
      ...occurrenceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, OCCURRENCES_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateOccurrence(id, occurrenceData) {
    const dataWithTimestamp = {
      ...occurrenceData,
      updatedAt: serverTimestamp(),
    };
    const occurrenceRef = doc(db, OCCURRENCES_COLLECTION, id);
    await updateDoc(occurrenceRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteOccurrence(id) {
    const occurrenceRef = doc(db, OCCURRENCES_COLLECTION, id);
    await deleteDoc(occurrenceRef);
    return id;
  },

  // Gifts Management Operations
  async getAllGifts() {
    const querySnapshot = await getDocs(collection(db, GIFTS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createGift(giftData) {
    const dataWithTimestamp = {
      ...giftData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, GIFTS_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateGift(id, giftData) {
    const dataWithTimestamp = {
      ...giftData,
      updatedAt: serverTimestamp(),
    };
    const giftRef = doc(db, GIFTS_COLLECTION, id);
    await updateDoc(giftRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteGift(id) {
    const giftRef = doc(db, GIFTS_COLLECTION, id);
    await deleteDoc(giftRef);
    return id;
  },

  // Points Bundle Operations
  async getAllPointsBundles() {
    const querySnapshot = await getDocs(
      collection(db, POINTS_BUNDLES_COLLECTION)
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createPointsBundle(bundleData) {
    const dataWithTimestamp = {
      ...bundleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, POINTS_BUNDLES_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updatePointsBundle(id, bundleData) {
    const dataWithTimestamp = {
      ...bundleData,
      updatedAt: serverTimestamp(),
    };
    const bundleRef = doc(db, POINTS_BUNDLES_COLLECTION, id);
    await updateDoc(bundleRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deletePointsBundle(id) {
    const bundleRef = doc(db, POINTS_BUNDLES_COLLECTION, id);
    await deleteDoc(bundleRef);
    return id;
  },

  // Rewards History Operations
  async getAllRewards() {
    const querySnapshot = await getDocs(collection(db, REWARDS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createReward(rewardData) {
    const dataWithTimestamp = {
      ...rewardData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, REWARDS_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateReward(id, rewardData) {
    const dataWithTimestamp = {
      ...rewardData,
      updatedAt: serverTimestamp(),
    };
    const rewardRef = doc(db, REWARDS_COLLECTION, id);
    await updateDoc(rewardRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteReward(id) {
    const rewardRef = doc(db, REWARDS_COLLECTION, id);
    await deleteDoc(rewardRef);
    return id;
  },
};
