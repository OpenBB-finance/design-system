import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";
import { cn } from "~/utils";

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("BB-ScrollArea relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className="h-full w-full rounded-[inherit]"
      style={{ overflow: "auto" }}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar orientation="vertical" />
    {/* <ScrollBar orientation="horizontal" /> */}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "BB-ScrollBar flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-[7px] border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-[7px] flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <div
      className={cn("h-full w-full transition-colors", "bg-grey-100 dark:bg-dark-400")}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative min-h-1 min-w-1 flex-1 cursor-grab rounded-full transition-colors active:cursor-grabbing",
          "bg-grey-400 hover:bg-[#7f7e7e]",
          "dark:bg-grey-400 dark:hover:bg-[#8d8e94]",
        )}
      />
    </div>
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
