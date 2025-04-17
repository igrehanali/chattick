import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const COLLECTION_NAME = "supportCategories";

export const supportCategoriesService = {
  // Get all categories with real-time updates
  subscribeToCategories: (callback) => {
    const categoriesRef = collection(db, COLLECTION_NAME);
    return onSnapshot(categoriesRef, (snapshot) => {
      const categories = [];
      snapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      callback(categories);
    });
  },

  // Add a new category
  addCategory: async (categoryData) => {
    try {
      const categoriesRef = collection(db, COLLECTION_NAME);
      const docRef = await addDoc(categoriesRef, {
        name: categoryData.name,
        description: categoryData.description,
        subcategories: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return { id: docRef.id };
    } catch (error) {
      throw new Error(`Failed to add category: ${error.message}`);
    }
  },

  // Update a category
  updateCategory: async (categoryId, categoryData) => {
    try {
      const categoryRef = doc(db, COLLECTION_NAME, categoryId);
      await updateDoc(categoryRef, {
        ...categoryData,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  },

  // Delete a category
  deleteCategory: async (categoryId) => {
    try {
      const categoryRef = doc(db, COLLECTION_NAME, categoryId);
      await deleteDoc(categoryRef);
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  },

  // Add a subcategory to a category
  addSubcategory: async (categoryId, subcategoryData) => {
    try {
      const categoryRef = doc(db, COLLECTION_NAME, categoryId);
      const category = await getDocs(
        query(
          collection(db, COLLECTION_NAME),
          where("__name__", "==", categoryId)
        )
      );
      if (!category.empty) {
        const categoryDoc = category.docs[0];
        const currentSubcategories = categoryDoc.data().subcategories || [];
        const newSubcategory = {
          id: Date.now().toString(),
          name: subcategoryData.name,
          description: subcategoryData.description,
          createdAt: new Date().toISOString(),
        };
        await updateDoc(categoryRef, {
          subcategories: [...currentSubcategories, newSubcategory],
          updatedAt: new Date().toISOString(),
        });
        return newSubcategory;
      }
      throw new Error("Category not found");
    } catch (error) {
      throw new Error(`Failed to add subcategory: ${error.message}`);
    }
  },

  // Delete a subcategory from a category
  deleteSubcategory: async (categoryId, subcategoryId) => {
    try {
      const categoryRef = doc(db, COLLECTION_NAME, categoryId);
      const category = await getDocs(
        query(
          collection(db, COLLECTION_NAME),
          where("__name__", "==", categoryId)
        )
      );
      if (!category.empty) {
        const categoryDoc = category.docs[0];
        const currentSubcategories = categoryDoc.data().subcategories || [];
        const updatedSubcategories = currentSubcategories.filter(
          (sub) => sub.id !== subcategoryId
        );
        await updateDoc(categoryRef, {
          subcategories: updatedSubcategories,
          updatedAt: new Date().toISOString(),
        });
      } else {
        throw new Error("Category not found");
      }
    } catch (error) {
      throw new Error(`Failed to delete subcategory: ${error.message}`);
    }
  },
};
