// Firebase Admin SDK Configuration (Server-side only)
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

// Initialize Firebase Admin (server-side only)
if (getApps().length === 0) {
    let serviceAccount;

    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        } catch (error) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", error);
        }
    }

    if (!serviceAccount) {
        try {
            serviceAccount = require("@/firebase-service-account.json");
        } catch (error) {
            console.error("Firebase service account file not found and env var not set.");
        }
    }

    if (serviceAccount) {
        adminApp = initializeApp({
            credential: cert(serviceAccount),
            projectId: serviceAccount.project_id,
        });
    } else {
        throw new Error("Firebase Admin could not be initialized: missing credentials.");
    }
} else {
    adminApp = getApps()[0];
}

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);

export default adminApp;
