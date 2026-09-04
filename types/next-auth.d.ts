import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "student" | "faculty" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    role: "student" | "faculty" | "admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "student" | "faculty" | "admin";
  }
}
