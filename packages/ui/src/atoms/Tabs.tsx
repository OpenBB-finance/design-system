import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/utils";

/**
 * @see {@link https://ui.shadcn.com/docs/components/tabs | Shadcn/ui Docs - Tabs} for more information
 */
export const Tabs = TabsPrimitive.Root;

export const TabListVariants = cva(["BB-TabList flex gap-6 body-sm-medium"]);

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(TabListVariants(), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabTriggerVariants = cva([
  "BB-TabTrigger border-b border-transparent transition",
  /* Light theme */
  "text-grey-600",
  "hover:text-grey-900",
  "disabled:pointer-events-none disabled:opacity-50", // TODO: fix with colors
  "radix-state-active:border-current radix-state-active:text-light-blue-600",
  "[&.active]:border-current [&.active]:text-light-blue-600",
  /* Dark theme */
  "dark:text-grey-400 hover:dark:text-grey-200",
  "dark:radix-state-active:border-current dark:radix-state-active:text-light-blue-400",
  "dark:[&.active]:border-current dark:[&.active]:text-light-blue-400",
]);

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TabTriggerVariants(), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
export const TabsContent = React.forwardRef<
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
