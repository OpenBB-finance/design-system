import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "utils";

const labelVariants = cva([
  "text-grey-400 body-xs-regular",
  "group-aria-disabled:cursor-not-allowed group-aria-disabled:text-grey-300",
  "peer-disabled:cursor-not-allowed peer-disabled:text-grey-300",

  "dark:text-dark-100",
  "dark:group-aria-disabled:text-dark-200",
  "dark:peer-disabled:text-dark-200",
]);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
