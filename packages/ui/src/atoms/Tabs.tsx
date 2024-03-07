import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "~/utils";

const Tabs = TabsPrimitive.Root;

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("BB-tabs inline-flex gap-10 body-sm-medium", className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "border-b border-transparent pb-0.5 text-grey-600 transition",
      "hover:text-grey-900",
      "disabled:pointer-events-none disabled:opacity-50", // TODO: fix with colors
      "data-[state=active]:border-light-blue-600 data-[state=active]:text-light-blue-600",
      "dark:text-grey-400 hover:dark:text-grey-200",
      "dark:data-[state=active]:border-light-blue-400 dark:data-[state=active]:text-light-blue-400",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-4", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
