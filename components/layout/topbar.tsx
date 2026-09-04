"use client";

import * as React from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";

interface TopbarProps {
  title?: string;
  onMenuClick?: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
  actions?: React.ReactNode;
  onLogout?: () => void;
}

export function Topbar({ title, onMenuClick, user, actions, onLogout }: TopbarProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/60 md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground-muted hover:bg-surface-muted hover:text-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        {title && (
          <h1 className="text-lg font-semibold text-foreground md:text-xl">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground-muted hover:bg-surface-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
        </button>
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-foreground hover:bg-surface-muted"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light text-accent">
                <span className="text-xs font-bold">{user.name?.charAt(0)?.toUpperCase() ?? "U"}</span>
              </div>
              <span className="hidden md:inline">{user.name}</span>
              <ChevronDown className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border border-border bg-surface py-1 shadow-md">
                <div className="border-b border-border px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-foreground-muted">{user.email}</p>
                  <p className="text-xs text-foreground-muted">{user.role}</p>
                </div>
                <a
                  href={`/${user.role}/profile`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-surface-muted"
                >
                  Profile
                </a>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-surface-muted"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
