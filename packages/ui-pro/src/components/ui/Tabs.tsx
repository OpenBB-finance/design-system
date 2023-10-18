import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "utils";

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
      // "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "pb-0.5",
      "text-grey-600 hover:border-grey-900 hover:text-grey-900",
      "data-[state=active]:border-b data-[state=active]:border-light-blue-600 data-[state=active]:text-light-blue-600",
      "dark:text-grey-400 hover:dark:text-grey-200",
      "dark:data-[state=active]:border-light-blue-400 dark:data-[state=active]:text-light-blue-400",
      // "data-[state=inactive]:text-grey-600 hover:data-[state=inactive]:border-grey-900 hover:data-[state=inactive]:text-grey-900",
      // "dark:data-[state=inactive]:text-grey-400 hover:dark:data-[state=inactive]:text-grey-200",
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
