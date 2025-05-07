import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const SETTINGS_COLLECTION = "AppData";
const SYSTEM_SETTINGS_DOC = "system";

export const settingsService = {
  async getSystemSettings() {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, SYSTEM_SETTINGS_DOC);
      const settingsSnap = await getDoc(settingsRef);

      if (settingsSnap.exists()) {
        return settingsSnap.data();
      }

      // Return default settings if no settings exist
      return {
        withdrawal: {
          minPoints: 100,
          maxPoints: 10000,
          fee: 2.5,
          moneyPerPoint: {
            USD: 0.01,
            PKR: 2.5,
            EUR: 0.009,
          },
        },
        chat: {
          messageRetention: "30 days",
          devicesAllowed: 3,
          disappearingTime: "24 hours",
          exportAllowed: true,
          forwardAllowed: true,
          shareAllowed: true,
          linksAllowed: true,
          copyAllowed: true,
          maxFileSize: 10,
          allowedFileTypes: "jpg,png,pdf,doc,docx",
        },
        userLimits: {
          accountsPerUser: 1,
          multiplePaymentMethodsAllowed: false,
        },
        referralContest: {
          entriesPerContest: 5,
          prizePoolFee: 2.5,
        },
        payments: {
          gateway: "stripe",
          smsProvider: "twilio",
          webhookUrl: "",
          paymentFee: 1.5,
          withdrawalFee: 2.0,
          serviceFee: 3.0,
        },
      };
    } catch (error) {
      console.error("Error fetching system settings:", error);
      throw error;
    }
  },

  async updateSystemSettings(settings) {
    try {
      const settingsRef = doc(db, SETTINGS_COLLECTION, SYSTEM_SETTINGS_DOC);
      const dataWithTimestamp = {
        ...settings,
        updatedAt: serverTimestamp(),
      };

      await setDoc(settingsRef, dataWithTimestamp, { merge: true });
      return dataWithTimestamp;
    } catch (error) {
      console.error("Error updating system settings:", error);
      throw error;
    }
  },
};
