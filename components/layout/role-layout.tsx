import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth/session";

interface RoleLayoutProps {
  children: React.ReactNode;
  allowedRoles: string[];
  role: "student" | "faculty" | "admin";
  title?: string;
}

export default async function RoleLayout({ children, allowedRoles, role: _role, title }: RoleLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(`/${user.role}/dashboard`);
  }

  const roleTitles: Record<string, string> = {
    student: "Student Portal",
    faculty: "Faculty Portal",
    admin: "Admin Portal",
  };

  return (
    <AppShell
      user={{
        name: user.name ?? undefined,
        email: undefined,
        role: user.role as "student" | "faculty" | "admin",
      }}
      title={title ?? roleTitles[user.role]}
    >
      {children}
    </AppShell>
  );
}
