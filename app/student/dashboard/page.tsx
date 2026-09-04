import RoleLayout from "@/components/layout/role-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard/dashboard-cards";
import { StatusBadge } from "@/components/ui/status-badge";
import { CalendarDays, Clock, FileText, Library, Sparkles, Timer, Users, Trophy, GitBranch } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <RoleLayout allowedRoles={["student"]} role="student">
      <PageHeader title="Dashboard" description="Welcome back. Here&apos;s your academic overview." />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Today&apos;s Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-foreground-muted">Next: DBMS at 10:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">FCFS Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2</div>
            <p className="text-xs text-foreground-muted">Pending selections</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Library Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1</div>
            <p className="text-xs text-foreground-muted">Due in 5 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-foreground-muted">Active challenges</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: GitBranch, label: "FCFS Selection", href: "/student/fcfs" },
                { icon: CalendarDays, label: "Timetable", href: "/student/timetable" },
                { icon: Library, label: "Library", href: "/student/library" },
                { icon: Sparkles, label: "AI Summarizer", href: "/student/summarizer" },
                { icon: Timer, label: "Pomodoro", href: "/student/pomodoro" },
                { icon: Users, label: "Study Rooms", href: "/student/study-rooms" },
                { icon: Trophy, label: "Challenges", href: "/student/challenges" },
                { icon: FileText, label: "Leave", href: "/student/leave" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-md border border-border p-3 transition-colors hover:border-accent/30 hover:bg-surface-muted"
                >
                  <action.icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
}
