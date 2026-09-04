import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  success: "bg-success-light text-success border-success/20",
  approved: "bg-success-light text-success border-success/20",
  active: "bg-success-light text-success border-success/20",
  completed: "bg-success-light text-success border-success/20",
  paid: "bg-success-light text-success border-success/20",
  pending: "bg-warning-light text-warning border-warning/20",
  warning: "bg-warning-light text-warning border-warning/20",
  rejected: "bg-error-light text-error border-error/20",
  error: "bg-error-light text-error border-error/20",
  failed: "bg-error-light text-error border-error/20",
  cancelled: "bg-surface-muted text-foreground-muted border-border",
  inactive: "bg-surface-muted text-foreground-muted border-border",
  default: "bg-surface-muted text-foreground-muted border-border",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  const style = statusStyles[normalized] ?? statusStyles.default;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
