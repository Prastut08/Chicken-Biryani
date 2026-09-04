import { NextResponse } from "next/server";
import { getAuth, getFirestore } from "@/lib/firebase/admin";
import { hash } from "bcryptjs";
import { signupSchema } from "@/lib/validation/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { email, password, name, role, studentId, facultyId, departmentId } = parsed.data;

    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const rateLimit = checkRateLimit(`signup:${ip}`);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please try again later." },
        { status: 429 }
      );
    }

    const normalizedEmail = email.toLowerCase();
    const auth = getAuth();
    const db = getFirestore();

    const existing = await db.collection("users").where("email", "==", normalizedEmail).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const userRecord = await auth.createUser({
      email: normalizedEmail,
      displayName: name,
    });

    const passwordHash = await hash(password, 12);

    const userRef = db.collection("users").doc(userRecord.uid);
    await userRef.set({
      email: normalizedEmail,
      name,
      role: role.toUpperCase(),
      passwordHash,
      isActive: true,
      accountStatus: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(role === "student"
        ? {
            studentProfile: {
              studentId: studentId ?? `STU-${Date.now()}`,
              firstName: name.split(" ")[0] ?? name,
              lastName: name.split(" ").slice(1).join(" ") ?? "",
              email: normalizedEmail,
              departmentId: departmentId ?? "default",
              programId: "default",
              enrollmentYear: new Date().getFullYear(),
              accountStatus: "ACTIVE",
            },
          }
        : {
            facultyProfile: {
              facultyId: facultyId ?? `FAC-${Date.now()}`,
              firstName: name.split(" ")[0] ?? name,
              lastName: name.split(" ").slice(1).join(" ") ?? "",
              email: normalizedEmail,
              departmentId: departmentId ?? "default",
              designation: "Instructor",
              accountStatus: "ACTIVE",
            },
          }),
    });

    resetRateLimit(`signup:${ip}`);

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: userRecord.uid,
          email: normalizedEmail,
          name,
          role: role.toUpperCase(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Unable to complete the request." },
      { status: 500 }
    );
  }
}
