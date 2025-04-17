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

const FAQS_COLLECTION = "faqs";
const CATEGORIES_COLLECTION = "categories";

export const faqService = {
  // FAQ Operations
  async getAllFAQs() {
    const querySnapshot = await getDocs(collection(db, FAQS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createFAQ(faqData) {
    const dataWithTimestamp = {
      ...faqData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, FAQS_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateFAQ(id, faqData) {
    const dataWithTimestamp = {
      ...faqData,
      updatedAt: serverTimestamp(),
    };
    const faqRef = doc(db, FAQS_COLLECTION, id);
    await updateDoc(faqRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteFAQ(id) {
    const faqRef = doc(db, FAQS_COLLECTION, id);
    await deleteDoc(faqRef);
    return id;
  },

  // Category Operations
  async getAllCategories() {
    const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createCategory(categoryData) {
    const dataWithTimestamp = {
      ...categoryData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, CATEGORIES_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateCategory(id, categoryData) {
    const dataWithTimestamp = {
      ...categoryData,
      updatedAt: serverTimestamp(),
    };
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(categoryRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteCategory(id) {
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(categoryRef);
    return id;
  },

  async checkCategoryExists(name) {
    const q = query(
      collection(db, CATEGORIES_COLLECTION),
      where("name", "==", name)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  },

  async getFAQsByCategory(categoryId) {
    const q = query(
      collection(db, FAQS_COLLECTION),
      where("category", "==", categoryId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
