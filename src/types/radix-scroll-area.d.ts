declare module "@radix-ui/react-scroll-area" {
  import * as React from "react";

  export const Root: React.ComponentType<React.ComponentPropsWithoutRef<"div"> & { children?: React.ReactNode }>;
  export const Viewport: React.ComponentType<React.ComponentPropsWithoutRef<"div"> & { children?: React.ReactNode }>;
  export const ScrollAreaScrollbar: React.ComponentType<React.ComponentPropsWithoutRef<"div"> & { orientation?: "vertical" | "horizontal" }>;
  export const ScrollAreaThumb: React.ComponentType<React.ComponentPropsWithoutRef<"div">>;
  export const Corner: React.ComponentType<React.ComponentPropsWithoutRef<"div">>;

  // Alias exports used in older versions
  export { ScrollAreaScrollbar as Scrollbar, ScrollAreaThumb as Thumb };
  export default {
    Root,
    Viewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    Corner,
  };
}
