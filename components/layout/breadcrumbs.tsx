import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
  className?: string;
}

function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-foreground-subtle">/</span>}
          {item.href ? (
            <a href={item.href} className="text-foreground-muted hover:text-foreground">
              {item.label}
            </a>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export { Breadcrumbs };
