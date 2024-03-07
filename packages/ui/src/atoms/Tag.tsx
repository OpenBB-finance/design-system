import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/utils";

/* Tag */

const tagVariants = cva(
  [
    "BB-Tag inline-flex items-center justify-center rounded-full px-1.5 body-xs-regular",
  ],
  {
    variants: {
      color: {
        grey: "bg-grey-300/30 text-grey-600 dark:bg-dark-200/30 dark:text-dark-50",

        success:
          "bg-success-300/30 text-success-600 dark:bg-success-500/30 dark:text-success-300",
        warning:
          "bg-warning-400/30 text-warning-600 dark:bg-warning-400/30 dark:text-warning-300",
        danger:
          "bg-danger-500/30 text-danger-600 dark:bg-danger-500/30 dark:text-danger-400",

        "light-blue":
          "bg-light-blue-300/30 text-light-blue-600 dark:bg-light-blue-500/30 dark:text-light-blue-300",
        ruby: "bg-ruby-300/30 text-ruby-300 dark:bg-ruby-300/30 dark:text-ruby-300",
        purple:
          "bg-purple-300/30 text-purple-400 dark:bg-purple-300/30 dark:text-purple-200",
        yellow:
          "bg-yellow-600/30 text-yellow-700 dark:bg-yellow-600/30 dark:text-yellow-600",
        "dark-blue":
          "bg-dark-blue-400/30 text-dark-blue-500 dark:bg-dark-blue-500/30 dark:text-dark-blue-300",
        burgundy:
          "bg-[#C747994D]/30 text-burgundy-500 dark:bg-[#C747994D]/30 dark:text-burgundy-300",
      },
    },
    defaultVariants: {
      color: "grey",
    },
  },
);

type SpanProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "color">;
export interface TagProps extends SpanProps, VariantProps<typeof tagVariants> {}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, color, ...props }, ref) => {
    if (!props.children) return null;
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ color }), className)}
        {...props}
      />
    );
  },
);
Tag.displayName = "Tag";
