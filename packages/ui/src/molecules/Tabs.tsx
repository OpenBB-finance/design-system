// biome-ignore lint/style/noNamespaceImport: Use all Radix imports
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "~/utils";

interface TabsContextValue {
  variant?: "default" | "filled";
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: "default",
});

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    TabsContextValue {}

/**
 * @see {@link https://ui.shadcn.com/docs/components/tabs | Shadcn/ui Docs - Tabs} for more information
 */
export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant, ...props }, ref) => (
  <TabsContext.Provider value={{ variant }}>
    <TabsPrimitive.Root ref={ref} className={cn("BB-Tabs", className)} {...props} />
  </TabsContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

export const TabListVariants = cva(["BB-TabList flex"], {
  variants: {
    variant: {
      default: "body-sm-medium gap-6",
      filled: "body-xs-medium gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(TabListVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabTriggerVariants = cva(["BB-TabTrigger transition"], {
  variants: {
    variant: {
      default: [
        "border-transparent border-b",
        "disabled:pointer-events-none disabled:opacity-50", // TODO: fix with colors
        /* Light theme */
        "text-grey-600",
        "hover:text-grey-900",
        "radix-state-active:border-current radix-state-active:text-light-blue-600",
        "[&.active]:border-current [&.active]:text-light-blue-600",
        /* Dark theme */
        "dark:text-grey-400 hover:dark:text-grey-200",
        "dark:radix-state-active:border-current dark:radix-state-active:text-light-blue-400",
        "dark:[&.active]:border-current dark:[&.active]:text-light-blue-400",
      ],
      filled: [
        "text-nowrap rounded-t-sm px-2.5",
        "disabled:pointer-events-none disabled:opacity-50", // TODO: fix with colors
        /* Light theme */
        "bg-grey-100 text-grey-500",
        "hover:text-grey-750",
        "radix-state-active:bg-light-blue-600 radix-state-active:text-grey-50",
        "[&.active]:bg-light-blue-600 [&.active]:text-grey-50",
        /* Dark theme */
        "dark:bg-dark-700 dark:text-dark-50",
        "dark:hover:text-grey-200",
        "dark:radix-state-active:bg-light-blue-600 dark:radix-state-active:text-grey-50",
        "dark:[&.active]:bg-light-blue-600 dark:[&.active]:text-grey-50",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(TabTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={className} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
