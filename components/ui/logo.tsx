"use client";

import React from "react";
import { LOGO_BASE64 } from "@/lib/logo-data";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  alt?: string;
}

export function Logo({ className, imageClassName, alt = "Campus Hub Logo" }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-xl bg-black p-1 shadow border border-amber-500/30", className)}>
      <img
        src={LOGO_BASE64}
        alt={alt}
        className={cn("h-full w-full object-contain", imageClassName)}
      />
    </div>
  );
}
