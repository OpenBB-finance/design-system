import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React from "react";
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
          "bg-grey-750 text-white",
          "hover:bg-grey-800",
          "disabled:bg-grey-300 disabled:text-grey-400",

          "dark:bg-white dark:text-dark-900",
          "dark:hover:bg-grey-100",
          "dark:disabled:bg-dark-600 dark:disabled:text-dark-400",
        ],
        secondary: [
          "bg-grey-100 text-grey-900",
          "hover:bg-grey-200",
          "disabled:bg-grey-200 disabled:text-grey-300",

          "dark:bg-dark-500 dark:text-white",
          "dark:hover:bg-dark-700",
          "dark:focus-visible:ring-dark-200",
          "dark:disabled:bg-dark-800 dark:disabled:text-dark-500",
        ],
        outlined: [
          "border border-grey-300 text-grey-900",
          "hover:border-grey-600",
          "disabled:border-grey-300 disabled:text-grey-300",

          "dark:border-dark-400 dark:text-white",
          "dark:hover:border-dark-50",
          "dark:focus-visible:ring-grey-300",
          "dark:disabled:border-dark-500 dark:disabled:text-dark-600",
        ],
        accent: [
          "bg-accent-600 text-white",
          "hover:bg-accent-700",
          "focus-visible:ring-accent-600/30",
          "disabled:bg-accent-900 disabled:text-dark-400",
          "dark:focus-visible:ring-accent-600/50",
        ],
        ai: [
          "bg-ai-500 text-white",
          "hover:bg-ai-700",
          "focus-visible:ring-ai-600/30",
          "disabled:bg-ai-800 disabled:text-grey-500",
          "dark:focus-visible:ring-ai-600/50",
        ],
        warning: [
          "bg-warning-500 text-white",
          "hover:bg-warning-600",
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
        xs: "body-xs-medium h-6 px-2 [&_.BB-Icon]:size-3",
        sm: "body-xs-medium h-8 px-3",
        md: "body-sm-medium h-10 px-4",
        lg: "body-md-medium h-12 px-5",
        xl: "body-lg-medium h-14 px-5",
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
          <Loader2 className="size-3/4 min-w-fit flex-[0] animate-spin" />
          {loadingChildren}
        </>
      ) : (
        children
      )}
    </Comp>
  );
});
Button.displayName = "Button";
