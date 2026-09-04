"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Briefcase } from "lucide-react";

export default function SelectRolePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div>
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Select Your Profile
          </h1>
          <p className="mt-2 text-base text-foreground-muted">
            Choose how you would like to sign in to Campus Hub
          </p>
        </div>

        {/* 2 Circle Options: Student and Faculty */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 py-6">
          {/* Student Circle */}
          <Link
            href="/login?role=student"
            className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-accent/20 bg-surface shadow-lg transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-2xl group-hover:ring-8 group-hover:ring-accent/15">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <GraduationCap className="h-12 w-12" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Student
              </span>
              <p className="text-xs text-foreground-muted mt-1">Student Portal & Courses</p>
            </div>
          </Link>

          {/* Faculty Circle */}
          <Link
            href="/login?role=faculty"
            className="group flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-accent/20 bg-surface shadow-lg transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-2xl group-hover:ring-8 group-hover:ring-accent/15">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Briefcase className="h-12 w-12" />
              </div>
            </div>
            <div className="text-center">
              <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                Faculty
              </span>
              <p className="text-xs text-foreground-muted mt-1">Faculty Portal & Approvals</p>
            </div>
          </Link>
        </div>

        <p className="text-xs text-foreground-muted">
          Need help? Return to{" "}
          <Link href="/" className="text-accent hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
