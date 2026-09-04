import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, Auth } from "firebase/auth";
import { getDatabase, ref, set, Database } from "firebase/database";

export const studentFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_API_KEY || "AIzaSyCLu8eX7sQ1zcvJ37pqAleYdQZB5N1REh4",
  authDomain: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_AUTH_DOMAIN || "campusstudent-347d4.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_DATABASE_URL || "https://campusstudent-347d4-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_PROJECT_ID || "campusstudent-347d4",
  storageBucket: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_STORAGE_BUCKET || "campusstudent-347d4.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_MESSAGING_SENDER_ID || "124134336500",
  appId: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_APP_ID || "1:124134336500:web:e60d5c27f3f2dc4bee3ba1",
  measurementId: process.env.NEXT_PUBLIC_STUDENT_FIREBASE_MEASUREMENT_ID || "G-9SJ6T8RYK5",
};

export const facultyFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_API_KEY || "AIzaSyBo-TXI1Zo2taCId2L8LyuuKaiuEUSNwKM",
  authDomain: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_AUTH_DOMAIN || "campushub-41647.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_DATABASE_URL || "https://campushub-41647-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_PROJECT_ID || "campushub-41647",
  storageBucket: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_STORAGE_BUCKET || "campushub-41647.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_MESSAGING_SENDER_ID || "959481321977",
  appId: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_APP_ID || "1:959481321977:web:20fe2d50655797843c8528",
  measurementId: process.env.NEXT_PUBLIC_FACULTY_FIREBASE_MEASUREMENT_ID || "G-9YZQ0TM5PZ",
};

export function getClientFirebaseApp(role: "student" | "faculty"): FirebaseApp {
  const appName = role === "student" ? "student-app" : "faculty-app";
  const config = role === "student" ? studentFirebaseConfig : facultyFirebaseConfig;

  const existingApps = getApps();
  const existingApp = existingApps.find((app) => app.name === appName);
  if (existingApp) {
    return existingApp;
  }
  return initializeApp(config, appName);
}

export function getClientAuth(role: "student" | "faculty"): Auth {
  const app = getClientFirebaseApp(role);
  return getAuth(app);
}

export function getClientDatabase(role: "student" | "faculty"): Database {
  const app = getClientFirebaseApp(role);
  return getDatabase(app);
}

export async function signInWithGoogleFirebase(role: "student" | "faculty") {
  const auth = getClientAuth(role);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Log / record session in Realtime Database for the profile
  try {
    const db = getClientDatabase(role);
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: role,
      lastLogin: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Realtime Database sync warning:", err);
  }

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName || user.email?.split("@")[0] || "User",
    photoURL: user.photoURL,
    role: role,
  };
}
