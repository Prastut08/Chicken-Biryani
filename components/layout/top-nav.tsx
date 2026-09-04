import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  breadcrumbs?: { label: string; href?: string }[];
}

function TopNav({ className, breadcrumbs, children, ...props }: TopNavProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-surface/60",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-foreground-subtle">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        {children}
      </div>
      <div className="flex items-center gap-2">{/* User menu slot */}</div>
    </header>
  );
}

export { TopNav };
