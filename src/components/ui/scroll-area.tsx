"use client";

import * as React from "react";
import { Platform, ScrollView, View } from "react-native";
import { cn } from "./utils";

// Cross-platform ScrollArea:
// - On web: render a div with overflow-auto so existing tailwind classes work.
// - On native (Android/iOS): use react-native ScrollView to avoid DOM-only primitives.

type WebProps = React.HTMLAttributes<HTMLDivElement>;
type NativeProps = React.ComponentProps<typeof ScrollView>;
type Props = ({ className?: string } & Partial<WebProps> & Partial<NativeProps>) & { children?: React.ReactNode };

function ScrollArea({ className, children, ...props }: Props) {
  if (Platform.OS === "web") {
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

  // Native path (Android / iOS)
  return (
    <ScrollView
      data-slot="scroll-area"
      style={{ flex: 1 }}
      {...(props as any)}
    >
      <View data-slot="scroll-area-viewport" style={{ flex: 1 }}>
        {children}
      </View>
    </ScrollView>
  );
}

function ScrollBar({ className }: { className?: string }) {
  if (Platform.OS === "web") {
    return (
      <div
        data-slot="scroll-area-scrollbar"
        className={cn("pointer-events-none absolute right-0 top-0 h-full w-2.5", className)}
        aria-hidden
      />
    );
  }

  // On native we don't render a decorative scrollbar element.
  return null;
}

export { ScrollArea, ScrollBar };
