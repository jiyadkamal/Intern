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

    console.log("Firebase Admin: Attempting initialization (Ver 4)");
    console.log("ENV CHECK:", {
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? "SET" : "MISSING",
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? "SET" : "MISSING",
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? "SET (" + process.env.FIREBASE_PRIVATE_KEY.length + " chars)" : "MISSING",
        FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ? "SET" : "MISSING",
    });
    if (getApps().length > 0) {
        adminApp = getApps()[0];
        return adminApp;
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        console.error('Firebase Admin: Environment variables not found. Checking fallback JSON...');

        // Final fallback to JSON for deployment compatibility
        const json = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (json) {
            try {
                const decodedJson = json.trim()[0] !== '{'
                    ? Buffer.from(json, 'base64').toString('utf8')
                    : json;
                const config = JSON.parse(decodedJson.trim().replace(/\\n/g, '\n').replace(/^['"](.*)['"]$/, '$1'));
                adminApp = initializeApp({ credential: cert(config) });
                console.log('Firebase Admin Initialized (JSON fallback)');
                return adminApp;
            } catch (e) {
                console.error('Firebase Admin: Failed to parse fallback JSON.');
            }
        }

        throw new Error('Firebase Admin: Missing environment variables (PROJECT_ID, CLIENT_EMAIL, or PRIVATE_KEY)');
    }

    try {
        adminApp = initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, '\n').replace(/^['"](.*)['"]$/, '$1'),
            }),
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
        throw error;
    }

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
