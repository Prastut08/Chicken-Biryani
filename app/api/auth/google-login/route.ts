import { NextResponse } from "next/server";
import { getFirestore } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, uid, role } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();
    const userRole = role === "faculty" ? "FACULTY" : "STUDENT";

    try {
      const db = getFirestore();
      const existing = await db.collection("users").where("email", "==", normalizedEmail).limit(1).get();

      if (existing.empty) {
        const userRef = uid ? db.collection("users").doc(uid) : db.collection("users").doc();
        await userRef.set({
          email: normalizedEmail,
          name: name || normalizedEmail.split("@")[0],
          role: userRole,
          passwordHash: "",
          isActive: true,
          accountStatus: "ACTIVE",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...(userRole === "STUDENT"
            ? {
                studentProfile: {
                  studentId: `STU-${Date.now()}`,
                  firstName: (name || "").split(" ")[0] || name,
                  lastName: (name || "").split(" ").slice(1).join(" ") || "",
                  email: normalizedEmail,
                  departmentId: "default",
                  programId: "default",
                  enrollmentYear: new Date().getFullYear(),
                  accountStatus: "ACTIVE",
                },
              }
            : {
                facultyProfile: {
                  facultyId: `FAC-${Date.now()}`,
                  firstName: (name || "").split(" ")[0] || name,
                  lastName: (name || "").split(" ").slice(1).join(" ") || "",
                  email: normalizedEmail,
                  departmentId: "default",
                  designation: "Instructor",
                  accountStatus: "ACTIVE",
                },
              }),
        });
      } else {
        const doc = existing.docs[0];
        await doc.ref.update({
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (firestoreError) {
      console.warn("Firestore sync warning during Google sign-in:", firestoreError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google login API error:", error);
    return NextResponse.json({ success: true });
  }
}
