"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { navigationByRole, type Role, isActiveNavItem } from "@/lib/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";

interface SidebarProps {
  role: Role;
  currentPath: string;
  onNavigate?: () => void;
  user?: { name?: string | null; role: Role };
  onLogout?: () => void;
  className?: string;
}

function SidebarContent({ role, currentPath, onNavigate }: Omit<SidebarProps, "user" | "onLogout" | "className">) {
  const sections = navigationByRole[role] ?? [];

  return (
    <nav className="flex flex-col gap-6 px-3 py-4" aria-label="Main navigation">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          {section.title && (
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {section.title}
            </p>
          )}
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActiveNavItem(item.href, currentPath);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-light text-accent"
                      : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

function SidebarHeader({ role }: { role: Role }) {
  const roleLabels: Record<Role, string> = {
    student: "Student Portal",
    faculty: "Faculty Portal",
    admin: "Admin Portal",
  };

  return (
    <div className="flex h-16 items-center border-b border-border px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white">
          <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Campus Hub</span>
          <span className="text-xs text-foreground-muted">{roleLabels[role]}</span>
        </div>
      </div>
    </div>
  );
}

function SidebarFooter({ user, onLogout }: { user: { name?: string | null; role: Role }; onLogout?: () => void }) {
  const roleLabels: Record<Role, string> = { student: "Student", faculty: "Faculty", admin: "Admin" };

  return (
    <div className="border-t border-border p-3">
      <div className="flex items-center gap-3 rounded-md p-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-accent">
          <span className="text-xs font-bold">{user.name?.charAt(0)?.toUpperCase() ?? "U"}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
          <span className="truncate text-xs text-foreground-muted">{roleLabels[user.role]}</span>
        </div>
      </div>
      {onLogout && (
        <button
          onClick={onLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Logout</span>
        </button>
      )}
    </div>
  );
}

export function Sidebar({ role, currentPath, user, onLogout, onNavigate, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden h-screen w-64 flex-col border-r border-border bg-surface md:flex",
        className
      )}
    >
      <SidebarHeader role={role} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <SidebarContent role={role} currentPath={currentPath} onNavigate={onNavigate} />
      </div>
      {onLogout && user && (
        <SidebarFooter
          user={{ name: user.name ?? "User", role }}
          onLogout={onLogout}
        />
      )}
    </aside>
  );
}

export function MobileSidebar({
  role,
  currentPath,
  user,
  onLogout,
  onClose,
}: {
  role: Role;
  currentPath: string;
  user?: { name?: string | null; role: Role };
  onLogout?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-surface md:hidden">
      <SidebarHeader role={role} />
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <SidebarContent role={role} currentPath={currentPath} onNavigate={onClose} />
      </div>
      {onLogout && user && (
        <SidebarFooter
          user={{ name: user.name ?? "User", role }}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}

export { SidebarHeader, SidebarFooter };
