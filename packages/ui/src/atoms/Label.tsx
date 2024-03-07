import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/utils";

/* Label */

const labelVariants = cva([
  "BB-Label mb-1 text-grey-400 body-xs-regular",
  "group-aria-disabled:cursor-not-allowed group-aria-disabled:text-grey-300",
  "peer-disabled:cursor-not-allowed peer-disabled:text-grey-300",

  "dark:text-dark-50",
  "dark:group-aria-disabled:text-dark-200",
  "dark:peer-disabled:text-dark-200",
]);

/**
 * A label styled as a form field label. Can be used outside of Form.
 * Won't be rendered if no children provided.
 */
export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => {
  if (!props.children) return null;
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

/* Message */

interface MessageProps {
  className?: string;
  children?: React.ReactNode;
  error?: boolean;
}

/**
 * A message styled as a hint below form field. Can be used outside of Form.
 * Won't be rendered if no children provided.
 */
export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ className, error, ...props }, ref) => {
    if (!props.children) return null;
    return (
      <div
        ref={ref}
        className={cn(
          "BB-Message mt-1 body-xs-regular",
          error && "text-red-500 body-xs-medium",
          className,
        )}
        {...props}
      />
    );
  },
);
Message.displayName = "Message";
