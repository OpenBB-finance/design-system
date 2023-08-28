import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils";

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
          "bg-primary text-primary-foreground",
          "hover:bg-white",
          "active:bg-grey-200",
          "disabled:bg-muted disabled:text-muted-foreground",
        ],
        secondary: [
          "border border-border bg-background text-secondary-foreground",
          "hover:border-white hover:text-white",
          "active:bg-grey-850 active:text-white",
          "disabled:border-grey-700 disabled:bg-grey-850 disabled:text-muted-foreground",
          "focus-visible:text-white",
        ],
        tertiary: [
          "bg-tertiary text-tertiary-foreground",
          "hover:bg-grey-800 hover:text-white",
          "active:bg-grey-700 active:text-white",
          "disabled:bg-muted disabled:text-muted-foreground",
          "focus-visible:text-white",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive-500",
          "active:bg-destructive-700",
          "disabled:opacity-50",
        ],
        ghost: "hover:bg-accent hover:text-accent-foreground",
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
