"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { Role } from "@/lib/navigation";

interface AppShellProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    role: Role;
  };
  title?: string;
  actions?: React.ReactNode;
  onLogout?: () => void;
}

export function AppShell({ children, user, title, actions }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar role={user.role} currentPath={pathname} />
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <MobileSidebar role={user.role} currentPath={pathname} onClose={() => setMobileOpen(false)} />
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          title={title}
          onMenuClick={() => setMobileOpen(true)}
          user={user}
          actions={actions}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
