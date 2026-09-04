import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

function LoadingState({ className, text = "Loading...", ...props }: LoadingStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 p-12", className)}
      {...props}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      <p className="text-sm text-foreground-muted">{text}</p>
    </div>
  );
}

export { LoadingState };
