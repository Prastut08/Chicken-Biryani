import { authOptions } from "@/lib/auth/config";
import { getFirestore } from "@/lib/firebase/admin";
import { getServerSession as getNextAuthServerSession } from "next-auth";

export type Role = "student" | "faculty" | "admin";

export async function getServerSession() {
  return getNextAuthServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;

  const fallbackRole = (session.user.role ?? "student").toLowerCase() as Role;

  try {
    const db = getFirestore();
    const snapshot = await db
      .collection("users")
      .where("email", "==", session.user.email.toLowerCase())
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        email: data.email,
        name: data.name ?? session.user.name,
        role: (data.role ?? fallbackRole).toLowerCase() as Role,
        image: null,
        isActive: data.isActive ?? true,
      };
    }
  } catch (e) {
    console.warn("Firestore lookup error in getCurrentUser:", e);
  }

  return {
    id: session.user.id || "session-user",
    email: session.user.email,
    name: session.user.name || session.user.email.split("@")[0],
    role: fallbackRole,
    image: null,
    isActive: true,
  };
}

export async function getCurrentStudent() {
  const user = await getCurrentUser();
  if (!user || user.role !== "student") return null;

  try {
    const db = getFirestore();
    const snapshot = await db.collection("users").doc(user.id).get();
    const data = snapshot.data();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentProfile: data?.studentProfile ?? {
        studentId: `STU-${Date.now()}`,
        firstName: (user.name || "").split(" ")[0] || "Student",
        lastName: (user.name || "").split(" ").slice(1).join(" ") || "",
        email: user.email,
        departmentId: "default",
        programId: "default",
        enrollmentYear: new Date().getFullYear(),
        accountStatus: "ACTIVE",
      },
    };
  } catch {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      studentProfile: {
        studentId: `STU-${Date.now()}`,
        firstName: (user.name || "").split(" ")[0] || "Student",
        lastName: (user.name || "").split(" ").slice(1).join(" ") || "",
        email: user.email,
        departmentId: "default",
        programId: "default",
        enrollmentYear: new Date().getFullYear(),
        accountStatus: "ACTIVE",
      },
    };
  }
}

export async function getCurrentFaculty() {
  const user = await getCurrentUser();
  if (!user || user.role !== "faculty") return null;

  try {
    const db = getFirestore();
    const snapshot = await db.collection("users").doc(user.id).get();
    const data = snapshot.data();

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      facultyProfile: data?.facultyProfile ?? {
        facultyId: `FAC-${Date.now()}`,
        firstName: (user.name || "").split(" ")[0] || "Faculty",
        lastName: (user.name || "").split(" ").slice(1).join(" ") || "",
        email: user.email,
        departmentId: "default",
        designation: "Instructor",
        accountStatus: "ACTIVE",
      },
    };
  } catch {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      facultyProfile: {
        facultyId: `FAC-${Date.now()}`,
        firstName: (user.name || "").split(" ")[0] || "Faculty",
        lastName: (user.name || "").split(" ").slice(1).join(" ") || "",
        email: user.email,
        departmentId: "default",
        designation: "Instructor",
        accountStatus: "ACTIVE",
      },
    };
  }
}

export async function getCurrentAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthenticated");
  if (!user.isActive) throw new Error("Account disabled");
  return user;
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role as Role)) throw new Error("Forbidden");
  return user;
}

export async function requireStudent() {
  return requireRole(["student"]);
}

export async function requireFaculty() {
  return requireRole(["faculty"]);
}

export async function requireAdmin() {
  return requireRole(["admin"]);
}
