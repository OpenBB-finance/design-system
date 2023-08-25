import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils";

const labelVariants = cva([
  "text-grey-400 body-xs-medium",
  "group-disabled:cursor-not-allowed group-disabled:text-grey-600",
  // group modifiers works, not sure about peer
  "peer-disabled:cursor-not-allowed peer-disabled:text-grey-600",
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
