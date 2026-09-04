import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
}

function DropdownMenu({
  open,
  onOpenChange,
  trigger,
  children,
  align = "end",
}: DropdownMenuProps) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onOpenChange?.(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, onOpenChange]);

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        onClick={() => onOpenChange?.(!open)}
        className="inline-flex"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {trigger}
      </button>
      {open && (
        <div
          ref={menuRef}
          className={cn(
            "absolute z-50 mt-2 min-w-[8rem] rounded-md border border-border bg-surface py-1 shadow-md",
            alignmentClasses[align]
          )}
          role="menu"
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<DropdownMenuContextValue>, {
                onClose: () => onOpenChange?.(false),
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}

function DropdownMenuItem({ className, onClose, children, ...props }: DropdownMenuItemProps) {
  return (
    <button
      role="menuitem"
      className={cn(
        "flex w-full items-center px-2 py-1.5 text-sm text-foreground hover:bg-surface-muted focus:bg-surface-muted focus:outline-none",
        className
      )}
      onClick={(event) => {
        props.onClick?.(event);
        onClose?.();
      }}
      {...props}
    >
      {children}
    </button>
  );
}

interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

type DropdownMenuContextValue = {
  onClose?: () => void;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

DropdownMenuItem.contextType = DropdownMenuContext;

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
