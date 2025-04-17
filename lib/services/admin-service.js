import { db } from "@/lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
  getDoc,
} from "firebase/firestore";

const ADMINS_COLLECTION = "admins";
const ROLES_COLLECTION = "roles";
const ACTIVITY_LOGS_COLLECTION = "activity_logs";
const SECURITY_SETTINGS_COLLECTION = "security_settings";

export const adminService = {
  // Admin Account Operations
  async getAllAdmins() {
    const querySnapshot = await getDocs(collection(db, ADMINS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createAdmin(adminData) {
    const auth = getAuth();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        adminData.email,
        adminData.password
      );

      // Store admin data in Firestore
      const { password, confirmPassword, ...adminDataWithoutPassword } =
        adminData;
      const dataWithTimestamp = {
        ...adminDataWithoutPassword,
        uid: userCredential.user.uid,
        status: "Active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, ADMINS_COLLECTION),
        dataWithTimestamp
      );

      return {
        id: docRef.id,
        ...dataWithTimestamp,
      };
    } catch (error) {
      console.error("Error creating admin:", error);
      throw error;
    }
  },

  async updateAdmin(id, adminData) {
    const dataWithTimestamp = {
      ...adminData,
      updatedAt: serverTimestamp(),
    };
    const adminRef = doc(db, ADMINS_COLLECTION, id);
    await updateDoc(adminRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async toggleAdminStatus(id) {
    const adminRef = doc(db, ADMINS_COLLECTION, id);
    const adminDoc = await getDoc(adminRef);
    const currentStatus = adminDoc.data().status;
    const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
    await updateDoc(adminRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
    return newStatus;
  },

  // Roles & Permissions Operations
  async getAllRoles() {
    const querySnapshot = await getDocs(collection(db, ROLES_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createRole(roleData) {
    const auth = getAuth();
    try {
      // Create user in Firebase Authentication if email and password provided
      let uid = null;
      if (roleData.email && roleData.password) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          roleData.email,
          roleData.password
        );
        uid = userCredential.user.uid;
      }

      // Remove sensitive data and prepare for storage
      const { password, confirmPassword, ...roleDataWithoutPassword } =
        roleData;

      const dataWithTimestamp = {
        ...roleDataWithoutPassword,
        uid,
        status: "Active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, ROLES_COLLECTION),
        dataWithTimestamp
      );

      return {
        id: docRef.id,
        ...dataWithTimestamp,
      };
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  },

  async updateRole(id, roleData) {
    const dataWithTimestamp = {
      ...roleData,
      updatedAt: serverTimestamp(),
    };
    const roleRef = doc(db, ROLES_COLLECTION, id);
    await updateDoc(roleRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteRole(id) {
    const roleRef = doc(db, ROLES_COLLECTION, id);
    await deleteDoc(roleRef);
    return id;
  },

  // Activity Logs Operations
  async logActivity(activityData) {
    const dataWithTimestamp = {
      ...activityData,
      timestamp: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, ACTIVITY_LOGS_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async getActivityLogs(filters = {}) {
    let q = collection(db, ACTIVITY_LOGS_COLLECTION);

    if (filters.username) {
      q = query(q, where("username", "==", filters.username));
    }
    if (filters.action) {
      q = query(q, where("action", "==", filters.action));
    }
    if (filters.date) {
      q = query(q, where("timestamp", ">=", new Date(filters.date)));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Security Settings Operations
  async getSecuritySettings() {
    const querySnapshot = await getDocs(
      collection(db, SECURITY_SETTINGS_COLLECTION)
    );
    if (querySnapshot.empty) {
      // Create default settings if none exist
      const defaultSettings = {
        enable2FA: "Enabled",
        passwordLength: 8,
        sessionTimeout: 15,
        loginAttempts: 5,
      };
      await this.updateSecuritySettings(defaultSettings);
      return defaultSettings;
    }
    return querySnapshot.docs[0].data();
  },

  async updateSecuritySettings(settings) {
    const querySnapshot = await getDocs(
      collection(db, SECURITY_SETTINGS_COLLECTION)
    );
    const dataWithTimestamp = {
      ...settings,
      updatedAt: serverTimestamp(),
    };

    if (querySnapshot.empty) {
      await addDoc(
        collection(db, SECURITY_SETTINGS_COLLECTION),
        dataWithTimestamp
      );
    } else {
      const settingsRef = doc(
        db,
        SECURITY_SETTINGS_COLLECTION,
        querySnapshot.docs[0].id
      );
      await updateDoc(settingsRef, dataWithTimestamp);
    }
    return dataWithTimestamp;
  },

  async getAdminById(id) {
    try {
      if (!id) {
        throw new Error("Admin ID is required");
      }
      const q = query(
        collection(db, ADMINS_COLLECTION),
        where("uid", "==", id)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error(`Admin with ID ${id} not found`);
      }

      const adminDoc = querySnapshot.docs[0];
      return {
        id: adminDoc.id,
        ...adminDoc.data(),
      };
    } catch (error) {
      console.error("Error fetching admin:", error);
      throw error;
    }
  },

  async getRoleById(id) {
    try {
      if (!id) {
        throw new Error("Role ID is required");
      }
      const roleRef = doc(db, ROLES_COLLECTION, id);
      const roleDoc = await getDoc(roleRef);
      if (!roleDoc.exists()) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return {
        id: roleDoc.id,
        ...roleDoc.data(),
      };
    } catch (error) {
      console.error("Error fetching role:", error);
      throw error;
    }
  },
};
