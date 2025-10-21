"use client";

import * as React from "react";
import { cn } from "./utils";

// Minimal, dependency-free ScrollArea replacement.
// Radix primitives are DOM-only and can cause runtime failures in non-web targets
// (or when bundlers can't resolve package types). This lightweight component uses
// a simple scrollable container and a no-op scrollbar element so the app runs
// consistently across environments.

type Props = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };

function ScrollArea({ className, children, ...props }: Props) {
  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-auto", className)}
      {...(props as any)}
    >
      <div
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] outline-none"
      >
        {children}
      </div>
      <ScrollBar />
      <div data-slot="scroll-area-corner" />
    </div>
  );
}

function ScrollBar({ className }: { className?: string }) {
  // Render a decorative element; not functional like Radix's scrollbar but
  // sufficient to avoid runtime import errors and keep layout similar.
  return (
    <div
      data-slot="scroll-area-scrollbar"
      className={cn("pointer-events-none absolute right-0 top-0 h-full w-2.5", className)}
      aria-hidden
    />
  );
}

export { ScrollArea, ScrollBar };
