import RoleLayout from "@/components/layout/role-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboard/dashboard-cards";
import { StatusBadge } from "@/components/ui/status-badge";
import { GraduationCap, School, BookOpen, GitBranch, Shield, Wallet, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <RoleLayout allowedRoles={["admin"]} role="admin">
      <PageHeader title="Dashboard" description="Welcome back. Here's your platform overview." />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-foreground-muted">Active enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Total Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">86</div>
            <p className="text-xs text-foreground-muted">Across departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Active Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">42</div>
            <p className="text-xs text-foreground-muted">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground-muted">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7</div>
            <p className="text-xs text-foreground-muted">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Student enrollment", detail: "STU001 enrolled in BTech CSE", time: "2 minutes ago", status: "success" },
                { action: "Course approval", detail: "DBMS Section A approved by Dr. Rajesh Kumar", time: "15 minutes ago", status: "success" },
                { action: "FCFS request", detail: "New course selection request submitted", time: "1 hour ago", status: "pending" },
                { action: "Payment", detail: "Tuition fee payment received from STU042", time: "3 hours ago", status: "paid" },
                { action: "Security alert", detail: "Multiple failed login attempts detected", time: "5 hours ago", status: "warning" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-foreground-muted">{item.detail}</p>
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
                { icon: GraduationCap, label: "Students", href: "/admin/students" },
                { icon: School, label: "Faculty", href: "/admin/faculty" },
                { icon: BookOpen, label: "Courses", href: "/admin/courses" },
                { icon: GitBranch, label: "FCFS", href: "/admin/fcfs" },
                { icon: Shield, label: "Security", href: "/admin/security" },
                { icon: Wallet, label: "Payments", href: "/admin/payments" },
                { icon: Settings, label: "Settings", href: "/admin/settings" },
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
