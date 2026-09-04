import admin from "firebase-admin";

let adminApp: any = null;

export function getFirebaseAdmin() {
  if (adminApp) {
    return adminApp;
  }

  if (admin.apps.length > 0 && admin.apps[0]) {
    adminApp = admin.apps[0];
    return adminApp;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      adminApp = admin.initializeApp({
        credential: admin.cert(serviceAccount),
      });
      return adminApp;
    } catch (e) {
      console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY, using default admin init:", e);
    }
  }

  adminApp = admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || "campushub-41647",
  });

  return adminApp;
}

export function getFirestore() {
  return getFirebaseAdmin().firestore();
}

export function getAuth() {
  return getFirebaseAdmin().auth();
}
