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

    // Reconstruct service account from individual env vars if present
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    let serviceAccount;

    if (projectId && clientEmail && privateKey) {
        serviceAccount = {
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n').replace(/^['"](.*)['"]$/, '$1'),
        };
    } else {
        // Fallback to legacy JSON format for backward compatibility
        const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (!serviceAccountJson) {
            throw new Error(
                "Firebase Admin: Missing Firebase credentials (either individual vars or JSON)."
            );
        }

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
