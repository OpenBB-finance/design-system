import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "utils";

const buttonVariants = cva(
  [
    "BB-Button inline-flex items-center justify-center gap-2 rounded-sm font-normal ring-offset-background",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
    "disabled:pointer-events-none",
    "transition",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-grey-900 text-grey-200",
          "hover:bg-black",
          "active:bg-grey-800",
          "disabled:bg-muted disabled:text-muted-foreground",

          "dark:bg-grey-100 dark:text-grey-800",
          "dark:hover:bg-white",
          "dark:active:bg-grey-200",
          "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
        ],
        secondary: [
          "border border-grey-700 bg-transparent text-grey-700",
          "hover:border-black hover:text-black",
          "active:bg-grey-850 active:text-black",
          "disabled:border-grey-300 disabled:bg-grey-50 disabled:text-muted-foreground",
          "focus-visible:text-black",

          "dark:border-grey-300 dark:text-grey-300",
          "dark:hover:border-white dark:hover:text-white",
          "dark:active:bg-grey-850 dark:active:text-white",
          "dark:disabled:border-grey-700 dark:disabled:bg-grey-850 dark:disabled:text-muted-foreground",
          "dark:focus-visible:text-white",
        ],
        tertiary: [
          "bg-grey-100 text-grey-850",
          "hover:bg-grey-200 hover:text-black",
          "active:bg-grey-300 active:text-black",
          "disabled:bg-muted disabled:text-muted-foreground",
          "focus-visible:text-black",

          "dark:bg-grey-900 dark:text-grey-50",
          "dark:hover:bg-grey-800 dark:hover:text-white",
          "dark:active:bg-grey-700 dark:active:text-white",
          "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
          "dark:focus-visible:text-white",
        ],
        danger: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-danger-500",
          "active:bg-danger-700",
          "disabled:opacity-50",
        ],
        ghost: [
          "text-grey-800",
          "hover:text-black",
          "active:text-grey-800",
          "focus-visible:text-black",
          "disabled:text-grey-400",

          "dark:text-grey-200",
          "dark:hover:text-white",
          "dark:active:text-grey-200",
          "dark:focus-visible:text-white",
          "dark:disabled:text-grey-600",
        ],
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs/[1.125rem]",
        md: "h-10 px-6 py-0.5 text-sm/[1.25rem]",
        lg: "h-12 rounded-md px-8 text-base/6",
      },
      icon: {
        true: "aspect-square p-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Apply props and styles to child component  */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "primary",
      size = "md",
      icon = false,
      asChild = false,
      ...rest
    } = props;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, icon }), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
