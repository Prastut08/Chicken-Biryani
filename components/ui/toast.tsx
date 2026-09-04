import * as React from "react";
import { cn } from "@/lib/utils/cn";

const ToastContext = React.createContext<{
  dismiss: (id: string) => void;
} | null>(null);

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "error";
  duration?: number;
}

export function useAppToast() {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const addToast = React.useCallback((toast: ToastProps) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration ?? 4000);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, dismiss };
}

function ToastItem({ toast, dismiss }: { toast: ToastProps & { id: string }; dismiss: (id: string) => void }) {
  const variantStyles = {
    default: "border-border bg-surface",
    success: "border-success/20 bg-success-light",
    warning: "border-warning/20 bg-warning-light",
    error: "border-error/20 bg-error-light",
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-sm transition-all",
        variantStyles[toast.variant ?? "default"]
      )}
    >
      <div className="flex-1 space-y-1">
        {toast.title && (
          <p className="text-sm font-medium text-foreground">{toast.title}</p>
        )}
        {toast.description && (
          <p className="text-sm text-foreground-muted">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => dismiss(toast.id)}
        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
        aria-label="Dismiss"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} dismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { ToastProvider, ToastItem };
