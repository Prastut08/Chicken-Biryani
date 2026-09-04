import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({ className, defaultValue, value, onValueChange, children, ...props }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = value ?? internalValue;

  const handleChange = (newValue: string) => {
    if (!value) setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<TabsContextValue>, {
            activeValue,
            onValueChange: handleChange,
          });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  activeValue?: string;
  onValueChange?: (value: string) => void;
}

function TabsList({ className, activeValue, onValueChange, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-surface-muted p-1 text-foreground-muted",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeValue?: string;
  onValueChange?: (value: string) => void;
}

function TabsTrigger({
  className,
  value,
  activeValue,
  onValueChange,
  ...props
}: TabsTriggerProps) {
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => onValueChange?.(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-surface text-foreground shadow-sm"
          : "text-foreground-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeValue?: string;
}

function TabsContent({ className, value, activeValue, ...props }: TabsContentProps) {
  if (value !== activeValue) return null;

  return (
    <div
      role="tabpanel"
      data-state={activeValue === value ? "active" : "inactive"}
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}

type TabsContextValue = {
  activeValue: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

TabsList.contextType = TabsContext;
TabsTrigger.contextType = TabsContext;
TabsContent.contextType = TabsContext;

export { Tabs, TabsList, TabsTrigger, TabsContent };
