"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  Timer,
  Users,
  Library,
  Sparkles,
  Trophy,
  GitBranch,
  CalendarDays,
  ClipboardCheck,
  BookMarked,
  ChevronDown,
  Menu,
  X,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: GitBranch,
    title: "Smart Course Selection",
    description:
      "Priority-based course allocation with transparent rules. Higher CGPA earns higher priority, and submission time acts as the tie-breaker.",
  },
  {
    icon: CalendarDays,
    title: "Personalized Timetable",
    description:
      "Unified schedule view for classes, exams, and events. Never miss a lecture, lab, or deadline.",
  },
  {
    icon: BookOpen,
    title: "Google Classroom",
    description:
      "Integrated Classroom and Meet experience. Access assignments, materials, and live sessions without leaving Campus Hub.",
  },
  {
    icon: Library,
    title: "Library",
    description:
      "Browse, issue, and return academic resources. Track due dates and manage reading lists in one place.",
  },
  {
    icon: Sparkles,
    title: "AI Book Summarizer",
    description:
      "Upload PDFs and books to generate concise, structured summaries for faster revision and better retention.",
  },
  {
    icon: Timer,
    title: "Pomodoro",
    description:
      "Built-in focus timer with session tracking. Study in focused intervals and measure your productivity over time.",
  },
  {
    icon: Users,
    title: "Study Rooms",
    description:
      "Public and private collaborative study spaces. Chat, share notes, and solve problems together in real time.",
  },
  {
    icon: Trophy,
    title: "Challenges & Gamification",
    description:
      "Earn XP, unlock badges, and maintain streaks. Stay motivated with structured academic challenges.",
  },
];

const workflow = [
  { step: "Choose Subjects", desc: "Select required courses for the semester" },
  { step: "Choose Teacher", desc: "Pick your preferred instructor" },
  { step: "Choose Slot", desc: "Select an available time slot" },
  { step: "Priority Allocation", desc: "System ranks by CGPA, then timestamp" },
  { step: "Faculty Approval", desc: "Instructor reviews your request" },
  { step: "Confirmed", desc: "Course appears in your timetable" },
];

const studyRoomFeatures = [
  "Focus timer with session tracking",
  "Live participant list",
  "Chat and photo sharing",
  "Public and private rooms",
  "Room codes for secure joins",
];

const facultyCapabilities = [
  "Course management",
  "Timetable access",
  "Student request approvals",
  "Google Classroom",
  "Google Meet",
  "Leave management",
];

const adminCapabilities = [
  "Students management",
  "Faculty management",
  "Courses and subjects",
  "Timetable oversight",
  "FCFS configuration",
  "Security monitoring",
  "Payments",
  "Platform settings",
];

const faqs = [
  {
    q: "What is Campus Hub?",
    a: "Campus Hub is a unified platform for students, faculty, and administrators. It combines course selection, scheduling, classroom tools, productivity modules, and institutional management into one connected experience.",
  },
  {
    q: "Who can use Campus Hub?",
    a: "Students, faculty, and administrators at supported institutions can use Campus Hub. Each role has a dedicated portal with permissions tailored to their needs.",
  },
  {
    q: "How does course selection work?",
    a: "Students choose subjects, preferred teachers, and time slots. The system allocates seats using priority based on CGPA first, then submission timestamp. Faculty approve requests before confirmation.",
  },
  {
    q: "What is the Pomodoro study room?",
    a: "Study rooms are collaborative spaces where students can study alone or together. Public rooms are open to everyone; private rooms use secure join codes. Chat and photo sharing are supported.",
  },
  {
    q: "Does Campus Hub use Google Classroom?",
    a: "Yes. Campus Hub integrates with Google Classroom and Google Meet so faculty can manage courses and students can access materials, assignments, and live sessions through the platform.",
  },
  {
    q: "What does the AI summarizer do?",
    a: "The AI summarizer turns large academic documents into concise summaries. Upload a PDF or book and receive a structured summary to speed up revision.",
  },
  {
    q: "Is Campus Hub available on mobile?",
    a: "The platform is designed to be responsive across desktop, tablet, and mobile devices so you can access your portal anywhere.",
  },
  {
    q: "How is my data protected?",
    a: "Campus Hub uses secure authentication, role-based access control, audit logging, and server-side authorization. Sensitive operations are validated on the server, never solely on the client.",
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-foreground">Campus Hub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium text-foreground-muted hover:text-foreground">About</Link>
            <Link href="#features" className="text-sm font-medium text-foreground-muted hover:text-foreground">Features</Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground-muted hover:text-foreground">Pricing</Link>
            <Link href="#faq" className="text-sm font-medium text-foreground-muted hover:text-foreground">FAQ</Link>
            <Link href="#contact" className="text-sm font-medium text-foreground-muted hover:text-foreground">Contact</Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground-muted hover:bg-surface-muted hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="flex flex-col gap-1 p-4">
              <Link href="#about" className="px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>About</Link>
              <Link href="#features" className="px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Features</Link>
              <Link href="#pricing" className="px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="#faq" className="px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>FAQ</Link>
              <Link href="#contact" className="px-3 py-2 text-sm font-medium text-foreground-muted hover:text-foreground" onClick={() => setMobileOpen(false)}>Contact</Link>
              <div className="mt-2 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                One campus. Everything you need to move forward.
              </h1>
              <p className="text-lg text-foreground-muted md:text-xl">
                Campus Hub brings academics, course planning, classrooms, productivity, and student life into one connected platform.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Explore Campus Hub</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Today&apos;s Schedule</span>
                  <span className="text-xs text-foreground-muted">Mon, 12 Aug</span>
                </div>
                {[
                  { time: "09:00 - 10:00", subject: "Database Management Systems", room: "Room 101", status: "completed" },
                  { time: "10:00 - 11:00", subject: "Operating Systems", room: "Room 102", status: "active" },
                  { time: "11:00 - 12:00", subject: "Computer Networks", room: "Room 103", status: "upcoming" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-foreground-muted" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.subject}</p>
                        <p className="text-xs text-foreground-muted">{item.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground-muted">{item.time}</p>
                      <span className={`text-xs font-medium ${item.status === "completed" ? "text-success" : item.status === "active" ? "text-accent" : "text-foreground-muted"}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Statement */}
      <section id="about" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Built around the way students actually work.</h2>
            <p className="text-foreground-muted">
              Plan your courses. Learn with the right tools. Study with focus. Track your progress. Campus Hub connects every step of the academic journey.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              {["Plan", "Learn", "Study", "Track"].map((step) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Everything connected.</h2>
            <p className="mt-2 text-foreground-muted">Core modules designed to reduce friction and improve academic productivity.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/30 hover:bg-surface-muted">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-light text-accent">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FCFS Feature */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Priority-based course allocation.</h2>
              <p className="text-foreground-muted">
                Campus Hub replaces guesswork with a transparent allocation system. Students select subjects, preferred teachers, and available time slots. The system ranks requests by CGPA first, then uses submission time as the tie-breaker.
              </p>
              <ul className="space-y-3">
                {["Choose subjects for the semester", "Select preferred teacher and time slot", "System checks remaining capacity", "Higher CGPA receives higher priority", "Faculty reviews and approves", "Confirmed course appears in timetable"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-sm font-medium text-foreground-muted mb-4">Allocation Workflow</h3>
              <div className="space-y-4">
                {workflow.map((item, i) => (
                  <div key={item.step} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.step}</p>
                      <p className="text-xs text-foreground-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Rooms */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground">DBMS Study Group</h3>
                  <p className="text-xs text-foreground-muted">3 participants studying</p>
                </div>
                <span className="text-xs text-success font-medium">Live</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent text-xs font-bold">A</div>
                  <div className="rounded-md border border-border bg-background p-2 text-xs text-foreground">Can someone explain 3NF?</div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent text-xs font-bold">P</div>
                  <div className="rounded-md border border-border bg-background p-2 text-xs text-foreground">Sure, I have notes on normalization forms.</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Type a message..." className="flex h-9 w-full rounded-md border border-border bg-background px-3 py-2 text-xs" />
                <Button size="sm">Send</Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Study together, wherever you are.</h2>
              <p className="text-foreground-muted">
                Join public study rooms or create private sessions with friends. Chat, share notes, ask questions, and keep each other accountable.
              </p>
              <ul className="space-y-3">
                {studyRoomFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Google Classroom */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Your classroom, integrated.</h2>
              <p className="text-foreground-muted">
                Campus Hub connects directly with Google Classroom and Google Meet. Faculty manage courses and students access assignments, materials, and live sessions without switching platforms.
              </p>
              <div className="space-y-3">
                {["Course creation and enrollment", "Assignments and materials", "Announcements and discussions", "Live sessions via Google Meet"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-border bg-background p-3">
                    <BookOpen className="h-4 w-4 text-accent" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-light text-accent">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">Database Management Systems</h3>
                  <p className="text-xs text-foreground-muted">CS301 - Section A</p>
                </div>
              </div>
              <div className="space-y-2">
                {["Assignment 3: Normalization", "Lecture notes: Week 4", "Quiz: SQL Joins", "Meet link: Join session"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <FileText className="h-4 w-4 text-foreground-muted" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-light text-accent">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">dbms_notes.pdf</h3>
                  <p className="text-xs text-foreground-muted">Processing completed</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Summary</p>
                <p className="text-xs text-foreground-muted">
                  This document covers database normalization, SQL queries, transaction management, and indexing strategies. Key topics include 1NF, 2NF, 3NF, BCNF, ACID properties, and concurrency control.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Turn dense material into clear summaries.</h2>
              <p className="text-foreground-muted">
                Upload textbooks, papers, or lecture notes. The AI summarizer extracts key concepts, definitions, and summaries so you can revise faster.
              </p>
              <ul className="space-y-3">
                {["PDF and document upload", "Structured summary generation", "Key concept extraction", "Revision-friendly output"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Your academic command center.</h2>
            <p className="mt-2 text-foreground-muted">A clear view of classes, deadlines, and progress — designed to keep you focused.</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Today's Classes", value: "3", subtitle: "Next: DBMS at 10:00 AM" },
                { title: "FCFS Status", value: "2", subtitle: "Pending selections" },
                { title: "Library Books", value: "1", subtitle: "Due in 5 days" },
                { title: "Challenges", value: "3", subtitle: "Active challenges" },
              ].map((item) => (
                <div key={item.title} className="rounded-md border border-border p-4">
                  <p className="text-sm font-medium text-foreground-muted">{item.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{item.value}</p>
                  <p className="text-xs text-foreground-muted mt-1">{item.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-border p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Today&apos;s Schedule</h3>
              <div className="space-y-2">
                {[
                  { time: "09:00 - 10:00", subject: "Database Management Systems", room: "Room 101", status: "completed" },
                  { time: "10:00 - 11:00", subject: "Operating Systems", room: "Room 102", status: "active" },
                  { time: "11:00 - 12:00", subject: "Computer Networks", room: "Room 103", status: "upcoming" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-foreground-muted" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.subject}</p>
                        <p className="text-xs text-foreground-muted">{item.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground-muted">{item.time}</p>
                      <span className={`text-xs font-medium ${item.status === "completed" ? "text-success" : item.status === "active" ? "text-accent" : "text-foreground-muted"}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Built for faculty.</h2>
              <p className="text-foreground-muted">
                Manage courses, review student requests, and run classrooms — all from one interface.
              </p>
              <ul className="space-y-3">
                {facultyCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6">
              <h3 className="text-sm font-medium text-foreground-muted mb-4">Faculty Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: BookMarked, label: "Courses" },
                  { icon: ClipboardCheck, label: "Approvals" },
                  { icon: CalendarDays, label: "Timetable" },
                  { icon: BookOpen, label: "Classroom" },
                  { icon: Users, label: "Students" },
                  { icon: FileText, label: "Leave" },
                ].map((action) => (
                  <div key={action.label} className="flex items-center gap-3 rounded-md border border-border p-3">
                    <action.icon className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 rounded-lg border border-border bg-background p-6">
              <h3 className="text-sm font-medium text-foreground-muted mb-4">Platform Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Total Students", value: "1,247" },
                  { label: "Total Faculty", value: "86" },
                  { label: "Active Courses", value: "42" },
                  { label: "Pending Approvals", value: "7" },
                ].map((item) => (
                  <div key={item.label} className="rounded-md border border-border p-3">
                    <p className="text-xs text-foreground-muted">{item.label}</p>
                    <p className="text-lg font-bold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Centralized control for administrators.</h2>
              <p className="text-foreground-muted">
                Manage students, faculty, courses, subjects, timetables, FCFS, security, payments, and platform settings from a single dashboard.
              </p>
              <ul className="space-y-3">
                {adminCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Stay motivated.</h2>
            <p className="mt-2 text-foreground-muted">Earn XP, unlock badges, and maintain streaks as you progress through your academic journey.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Trophy, title: "Badges", desc: "Earn recognition for completing courses, study sessions, and challenges." },
              { icon: Timer, title: "Streaks", desc: "Build consistent study habits with daily and weekly streaks." },
              { icon: Sparkles, title: "Challenges", desc: "Complete structured challenges to earn XP and level up." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-surface p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-light text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Simple, transparent pricing.</h2>
            <p className="mt-2 text-foreground-muted">Plans designed for institutions of every size.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", desc: "For small departments", features: ["Up to 200 students", "Basic course management", "Standard support"] },
              { name: "Growth", desc: "For growing institutions", features: ["Up to 1,000 students", "Advanced analytics", "Priority support", "Google integrations"] },
              { name: "Institution", desc: "For full campus deployment", features: ["Unlimited users", "Custom integrations", "Dedicated support", "Advanced security"] },
            ].map((plan) => (
              <div key={plan.name} className="rounded-lg border border-border bg-background p-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-foreground-muted">{plan.desc}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant="outline">Coming soon</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div key={i} className="rounded-lg border border-border bg-surface">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 text-foreground-muted transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border p-4">
                    <p className="text-sm text-foreground-muted">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="rounded-lg border border-border bg-background p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Your campus, finally connected.</h2>
              <p className="mt-2 text-foreground-muted">Create an account or get in touch to learn more about Campus Hub for your institution.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="mailto:hello@campushub.example.com">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
                  <LayoutDashboard className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold text-foreground">Campus Hub</span>
              </Link>
              <p className="text-sm text-foreground-muted">Unified academic and productivity platform for students, faculty, and administrators.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-foreground-muted hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-foreground-muted hover:text-foreground">Pricing</Link></li>
                <li><Link href="#faq" className="text-sm text-foreground-muted hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-sm text-foreground-muted hover:text-foreground">About</Link></li>
                <li><Link href="#contact" className="text-sm text-foreground-muted hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-sm text-foreground-muted hover:text-foreground">Login</Link></li>
                <li><Link href="/signup" className="text-sm text-foreground-muted hover:text-foreground">Sign up</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-sm text-foreground-muted">Campus Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
