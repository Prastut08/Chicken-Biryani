import CredentialsProvider from "next-auth/providers/credentials";
import { getFirestore } from "@/lib/firebase/admin";
import { compare } from "bcryptjs";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const db = getFirestore();
        const normalizedEmail = credentials.email.toLowerCase();

        const snapshot = await db
          .collection("users")
          .where("email", "==", normalizedEmail)
          .limit(1)
          .get();

        if (snapshot.empty) {
          return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        const passwordHash = data.passwordHash as string | undefined;
        if (!passwordHash) {
          return null;
        }

        const isValid = await compare(credentials.password, passwordHash);
        if (!isValid) {
          return null;
        }

        const accountStatus =
          data.studentProfile?.accountStatus ??
          data.facultyProfile?.accountStatus ??
          data.accountStatus ??
          "ACTIVE";

        if (accountStatus !== "ACTIVE") {
          return null;
        }

        return {
          id: doc.id,
          email: data.email,
          name: data.name,
          role: (data.role ?? "STUDENT").toLowerCase() as "student" | "faculty" | "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        session.user.role = token.role ?? "student";
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
};
