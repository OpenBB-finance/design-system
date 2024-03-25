import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "~/utils";

export const buttonVariants = cva(
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

          "dark:bg-grey-100 dark:text-dark-600",
          "dark:hover:bg-grey-50 dark:hover:text-grey-700",
          "dark:focus-visible:bg-grey-200 dark:focus-visible:text-grey-750",
          "dark:disabled:bg-dark-600 dark:disabled:text-dark-400",
        ],
        secondary: [
          "bg-grey-100 text-grey-900",
          "hover:bg-grey-300",
          "disabled:bg-grey-200 disabled:text-grey-300",

          "dark:bg-dark-600 dark:text-grey-200",
          "dark:hover:bg-dark-600 dark:hover:text-white",
          "dark:focus-visible:bg-dark-700 dark:focus-visible:text-white",
          "dark:disabled:bg-dark-800 dark:disabled:text-dark-500",
        ],
        outlined: [
          "border border-grey-300 text-grey-700",
          "hover:border-grey-600 hover:text-grey-850",
          "focus-visible:ring-grey-200",
          "disabled:border-grey-300 disabled:bg-grey-100 disabled:text-grey-300",

          "dark:border-dark-400 dark:text-grey-300",
          "dark:hover:border-dark-100 dark:hover:text-grey-100",
          "dark:focus-visible:text-grey-100 dark:focus-visible:ring-grey-300",
          "dark:disabled:border-dark-500 dark:disabled:bg-dark-850 dark:disabled:text-dark-600",
        ],
        accent: [
          "bg-accent-600 text-white",
          "hover:bg-accent-700",
          "focus-visible:ring-accent-600/30",
          "disabled:bg-accent-900 disabled:text-grey-500",
          "dark:focus-visible:ring-accent-600/50",
        ],
        warning: [
          "bg-warning-600 text-white",
          "hover:bg-warning-700",
          "focus-visible:ring-warning-600/30",
          "disabled:bg-warning-900 disabled:text-grey-500",
          "dark:focus-visible:ring-warning-600/50",
        ],
        danger: [
          "bg-danger-600 text-white",
          "hover:bg-danger-700",
          "focus-visible:ring-danger-600/30",
          "disabled:bg-danger-900 disabled:text-grey-500",
          "dark:focus-visible:ring-danger-600/50",
        ],
      },
      size: {
        xs: "px-2 py-1 body-xs-medium",
        sm: "h-8 px-3 body-xs-medium",
        md: "h-10 px-4 body-sm-medium",
        lg: "h-12 px-5 body-md-medium",
        xl: "h-14 px-5 body-lg-medium",
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
  loading?: boolean;
  loadingChildren?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = "primary",
      size = "md",
      icon = false,
      disabled = false,
      asChild = false,
      loading = false,
      loadingChildren = "Loading...",
      ...rest
    } = props;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, icon }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <>
            <Loader2 className="size-3/4 animate-spin" />
            {loadingChildren}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";
