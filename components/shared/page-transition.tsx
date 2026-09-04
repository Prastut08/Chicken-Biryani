import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

function PageTransition({ className, loading, children, ...props }: PageTransitionProps) {
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-12", className)} {...props}>
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    );
  }

  return <div className={cn("animate-in fade-in duration-200", className)} {...props}>{children}</div>;
}

export { PageTransition };
