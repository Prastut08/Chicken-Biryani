import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard/dashboard-cards";
import { StatusBadge } from "@/components/ui/status-badge";
import { CalendarDays, BookOpen, Clock, ClipboardCheck, Users, BookMarked, FileText } from "lucide-react";

export default function FacultyDashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back. Here&apos;s your teaching overview." />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Today&apos;s Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2</div>
            <p className="text-xs text-foreground-muted">Next: DBMS at 10:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-foreground-muted">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4</div>
            <p className="text-xs text-foreground-muted">Active this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">120</div>
            <p className="text-xs text-foreground-muted">Across all sections</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "09:00 - 10:00", subject: "Database Management Systems", room: "Room 101", status: "completed" },
                { time: "10:00 - 11:00", subject: "Operating Systems", room: "Room 102", status: "active" },
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
                { icon: BookMarked, label: "Courses", href: "/faculty/courses" },
                { icon: ClipboardCheck, label: "Approvals", href: "/faculty/approvals" },
                { icon: CalendarDays, label: "Timetable", href: "/faculty/timetable" },
                { icon: BookOpen, label: "Classroom", href: "/faculty/classroom" },
                { icon: Users, label: "Students", href: "/faculty/students" },
                { icon: FileText, label: "Leave", href: "/faculty/leave" },
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
    </>
  );
}
