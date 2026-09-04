import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  topNav?: React.ReactNode;
}

function DashboardShell({ className, sidebar, topNav, children, ...props }: DashboardShellProps) {
  return (
    <div className={cn("flex h-screen", className)} {...props}>
      {sidebar}
      <div className="flex flex-1 flex-col overflow-hidden">
        {topNav}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">{children}</main>
      </div>
    </div>
  );
}

export { DashboardShell };
