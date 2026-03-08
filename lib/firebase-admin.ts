// Firebase Admin SDK Configuration (Server-side only)
// Uses lazy initialization to avoid build-time crashes
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminApp: App | undefined;
let _adminAuth: Auth | undefined;
let _adminDb: Firestore | undefined;

function getAdminApp(): App {
    if (adminApp) return adminApp;

    if (getApps().length > 0) {
        adminApp = getApps()[0];
        return adminApp;
    }

    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountJson) {
        // Fallback or diagnostic logging
        const projectId = process.env.FIREBASE_PROJECT_ID;
        console.error("Firebase Admin Error: Missing FIREBASE_SERVICE_ACCOUNT JSON.", {
            hasProjectId: !!projectId,
        });
        throw new Error(
            "Firebase Admin: Missing FIREBASE_SERVICE_ACCOUNT environment variable."
        );
    }

    console.log("Firebase Admin: Initializing with JSON env var.");

    let serviceAccount;
    try {
        const sanitizedJson = serviceAccountJson
            .trim()
            .replace(/\\n/g, '\n')
            .replace(/^['"](.*)['"]$/, '$1');

        serviceAccount = JSON.parse(sanitizedJson);
    } catch (error) {
        throw new Error(
            "Firebase Admin: Failed to parse FIREBASE_SERVICE_ACCOUNT env var."
        );
    }

    adminApp = initializeApp({
        credential: cert(serviceAccount),
    });

    return adminApp;
}

// Lazy getters — only initialize when actually called at runtime
export const adminAuth: Auth = new Proxy({} as Auth, {
    get(_, prop) {
        if (!_adminAuth) _adminAuth = getAuth(getAdminApp());
        return (_adminAuth as any)[prop];
    },
});

export const adminDb: Firestore = new Proxy({} as Firestore, {
    get(_, prop) {
        if (!_adminDb) _adminDb = getFirestore(getAdminApp());
        return (_adminDb as any)[prop];
    },
});

export default getAdminApp;
