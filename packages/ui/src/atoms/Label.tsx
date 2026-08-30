// biome-ignore lint/style/noNamespaceImport: Use all Radix imports
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "~/utils";

/* Label */

const labelVariants = cva([
  "BB-Label body-xs-regular mb-1 inline-block",
  "group-aria-disabled:cursor-not-allowed",
  "peer-disabled:cursor-not-allowed",
  /* Light Theme */
  "text-grey-600",
  "group-aria-disabled:text-grey-400",
  "peer-disabled:text-grey-400",
  /* Dark Theme */
  "dark:text-grey-200",
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
  if (!props.children) {
    return null;
  }
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
    if (!props.children) {
      return null;
    }
    return (
      <div
        ref={ref}
        className={cn(
          "BB-Message body-xs-regular mt-1",
          error && "body-xs-medium text-red-500",
          className,
        )}
        {...props}
      />
    );
  },
);
Message.displayName = "Message";
