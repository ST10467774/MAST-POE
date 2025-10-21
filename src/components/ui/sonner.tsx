"use client";

// Fallback for projects that don't have 'next-themes' installed.
// If you install 'next-themes' later, replace this with:
// import { useTheme } from "next-themes";
const useTheme = () => ({ theme: "system" as "system" | "light" | "dark" | undefined });

import * as React from "react";

type ToasterProps = React.ComponentProps<'div'> & Record<string, any>;

// Dynamically load sonner's Toaster at runtime; if not available use a simple fallback.
const defaultFallback = (props: any) => <div {...props} />;

const Toaster: React.FC<ToasterProps> = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  const [SonnerComponent, setSonnerComponent] = React.useState<React.ComponentType<any>>(() => defaultFallback);

  React.useEffect(() => {
    let mounted = true;
    // @ts-ignore - sonner is an optional runtime dependency; ignore missing types at compile time
    import("sonner")
      .then((mod) => {
        const Comp = (mod && (mod.Toaster ?? mod.default ?? mod)) as React.ComponentType<any>;
        if (mounted && Comp) setSonnerComponent(() => Comp);
      })
      .catch(() => {
        // sonner not available — keep fallback
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SonnerComponent
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
