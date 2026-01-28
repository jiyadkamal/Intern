// Firebase Admin SDK Configuration (Server-side only)
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App;

// Initialize Firebase Admin (server-side only)
if (getApps().length === 0) {
    // Use service account for server-side operations
    const serviceAccount = require("@/firebase-service-account.json");

    adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
    });
} else {
    adminApp = getApps()[0];
}

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);

export default adminApp;
