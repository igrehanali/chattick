import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const subscriptionService = {
  // Create a new subscription
  async createSubscription(subscriptionData) {
    try {
      const docRef = await addDoc(
        collection(db, "subscriptions"),
        subscriptionData
      );
      return { id: docRef.id, ...subscriptionData };
    } catch (error) {
      throw new Error(`Error creating subscription: ${error.message}`);
    }
  },

  // Get all subscriptions
  async getAllSubscriptions() {
    try {
      const querySnapshot = await getDocs(collection(db, "subscriptions"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(`Error fetching subscriptions: ${error.message}`);
    }
  },

  // Get subscription by ID
  async getSubscriptionById(id) {
    try {
      const docRef = doc(db, "subscriptions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error("Subscription not found");
    } catch (error) {
      throw new Error(`Error fetching subscription: ${error.message}`);
    }
  },

  // Get subscriptions by user ID
  async getSubscriptionsByUserId(userId) {
    try {
      const q = query(
        collection(db, "subscriptions"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(`Error fetching user subscriptions: ${error.message}`);
    }
  },

  // Update subscription
  async updateSubscription(id, updateData) {
    try {
      if (!updateData || typeof updateData !== "object") {
        throw new Error("Invalid update data format");
      }
      const docRef = doc(db, "subscriptions", id);
      const validatedData = Object.entries(updateData).reduce(
        (acc, [key, value]) => {
          acc[key] = value === null ? null : value;
          return acc;
        },
        {}
      );
      await updateDoc(docRef, validatedData);
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      throw new Error(`Error updating subscription: ${error.message}`);
    }
  },

  // Delete subscription
  async deleteSubscription(id) {
    try {
      await deleteDoc(doc(db, "subscriptions", id));
      return true;
    } catch (error) {
      throw new Error(`Error deleting subscription: ${error.message}`);
    }
  },

  // Cancel subscription renewal
  async cancelSubscriptionRenewal(id) {
    try {
      const docRef = doc(db, "subscriptions", id);
      await updateDoc(docRef, { autoRenew: false });
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      throw new Error(`Error canceling subscription renewal: ${error.message}`);
    }
  },

  // Renew subscription
  async renewSubscription(id, renewalData) {
    try {
      const docRef = doc(db, "subscriptions", id);
      await updateDoc(docRef, {
        ...renewalData,
        autoRenew: true,
      });
      const updatedDoc = await getDoc(docRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      throw new Error(`Error renewing subscription: ${error.message}`);
    }
  },
};
