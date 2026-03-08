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
        throw new Error(
            "Firebase Admin: FIREBASE_SERVICE_ACCOUNT env var is missing."
        );
    }

    let serviceAccount;
    try {
        // Sanitize the string (handle potential escaped newlines and extra quotes)
        const sanitizedJson = serviceAccountJson
            .trim()
            .replace(/\\n/g, '\n') // Ensure newlines in private key are correct
            .replace(/^['"](.*)['"]$/, '$1'); // Remove surrounding quotes if any

        serviceAccount = JSON.parse(sanitizedJson);
    } catch (error) {
        // If first attempt fails, try parsing as-is to be safe
        try {
            serviceAccount = JSON.parse(serviceAccountJson);
        } catch (innerError) {
            throw new Error(
                "Firebase Admin: Failed to parse FIREBASE_SERVICE_ACCOUNT env var."
            );
        }
    }

    adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
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
