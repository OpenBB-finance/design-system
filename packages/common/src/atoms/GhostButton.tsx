import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "utils";

export const ghostButtonVariants = cva(
  [
    "BB-GhostButton group inline-flex w-fit items-center justify-center rounded-sm px-1 ring-offset-background",
    "focus-visible:px-0 focus-visible:outline-none focus-visible:ring-4",
    "disabled:pointer-events-none",
    "transition",

    "border-grey-700 text-grey-700",
    "hover:border-accent-400 hover:text-grey-850",
    "focus-visible:ring-grey-200",
    "disabled:border-grey-300 disabled:text-grey-300",

    "dark:border-grey-300 dark:text-grey-300",
    "dark:hover:border-white dark:hover:text-white",
    "dark:focus-visible:border-grey-500",
    "dark:disabled:border-dark-200 dark:disabled:text-dark-200",
  ],
  {
    variants: {
      size: {
        xs: "gap-1 rounded-md body-xs-medium",
        sm: "gap-2 rounded-md body-xs-medium",
        md: "gap-2 rounded-md body-sm-medium",
        lg: "gap-3 rounded-md body-md-medium",
      },
      icon: {
        true: "aspect-square p-1 [&>.border-b]:border-0",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface GhostButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ghostButtonVariants> {
  /** Apply props and styles to child component  */
  asChild?: boolean;
}

export const GhostButton = React.forwardRef<
  HTMLButtonElement,
  GhostButtonProps
>((props, ref) => {
  const {
    className,
    size = "md",
    icon = false,
    asChild = false,
    children,
    ...rest
  } = props;
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(ghostButtonVariants({ size, icon }), className)}
      ref={ref}
      {...rest}
    >
      <span className="inline-flex items-center justify-center border-b border-inherit transition group-focus-visible:rounded-md group-focus-visible:px-1">
        {children}
      </span>
    </Comp>
  );
});
GhostButton.displayName = "GhostButton";
