import admin from "firebase-admin";

let adminApp: any = null;

export function getFirebaseAdmin() {
  if (adminApp) {
    return adminApp;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountJson) {
    throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable.");
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  adminApp = admin.initializeApp({
    credential: admin.cert(serviceAccount),
  });

  return adminApp;
}

export function getFirestore() {
  return getFirebaseAdmin().firestore();
}

export function getAuth() {
  return getFirebaseAdmin().auth();
}
