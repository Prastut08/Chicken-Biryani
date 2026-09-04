import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore as getAdminFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth as getAdminAuth, Auth } from "firebase-admin/auth";

let adminApp: App | null = null;

export function getFirebaseAdmin(): App {
  if (adminApp) {
    return adminApp;
  }

  const apps = getApps();
  if (apps.length > 0 && apps[0]) {
    adminApp = apps[0];
    return adminApp;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
      });
      return adminApp;
    } catch (e) {
      console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY, using default admin init:", e);
    }
  }

  adminApp = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "campushub-41647",
  });

  return adminApp;
}

export function getFirestore(): Firestore {
  return getAdminFirestore(getFirebaseAdmin());
}

export function getAuth(): Auth {
  return getAdminAuth(getFirebaseAdmin());
}
