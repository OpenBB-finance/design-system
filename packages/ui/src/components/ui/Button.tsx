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
          "bg-grey-750 text-grey-50",
          "hover:bg-grey-900",
          "disabled:bg-grey-300 disabled:text-grey-400",

          "dark:bg-grey-100 dark:text-grey-800",
          "dark:hover:bg-white",
          "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
        ],
        secondary: [
          "bg-grey-100 text-grey-900",
          "hover:bg-grey-300",
          "disabled:bg-grey-200 disabled:text-grey-300",

          "dark:bg-grey-100 dark:text-grey-800",
          "dark:hover:bg-white",
          "dark:disabled:bg-muted dark:disabled:text-muted-foreground",
        ],
        outlined: [
          "border-dark-300 border text-grey-700",
          "hover:border-grey-600 hover:text-grey-850",
          "focus-visible:ring-grey-200",
          "disabled:border-grey-300 disabled:bg-grey-100 disabled:text-grey-300",

          "dark:border-dark-400 dark:text-grey-300",
          "dark:hover:border-dark-100 dark:hover:text-grey-100",
          "dark:focus-visible:text-grey-100 dark:focus-visible:ring-grey-300",
          "disabled:border-dark-500 disabled:bg-dark-850 disabled:text-dark-600",
        ],
      },
      size: {
        xs: "px-2 py-1 body-xs-medium",
        sm: "h-8 px-3 body-xs-medium",
        md: "h-10 px-4 body-sm-medium",
        lg: "h-12 px-5 body-md-medium",
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
