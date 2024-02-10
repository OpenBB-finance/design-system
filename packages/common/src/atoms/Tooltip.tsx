import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "utils";

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;

export const tooltipContentClasses = cn([
  "shadow-1 z-50 max-w-xs overflow-hidden rounded-sm px-2 py-1 outline-none body-xs-regular",
  "bg-white text-grey-600",
  "dark:bg-dark-600 dark:text-grey-100",
  "animate-in fade-in-0 zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2",
]);

export const tooltipArrowClasses = cn(["fill-white dark:fill-dark-600"]);

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>((props, ref) => {
  const { className, sideOffset = 4, ...rest } = props;
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("BB-Tooltip", tooltipContentClasses, className)}
      {...rest}
    />
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipArrowProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {}

export const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  TooltipArrowProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TooltipPrimitive.Arrow
      ref={ref}
      className={cn("BB-TooltipArrow", tooltipArrowClasses, className)}
      {...rest}
    />
  );
});
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

/* Composed Component */

export interface TooltipProps
  extends Omit<React.ComponentProps<typeof TooltipContent>, "content"> {
  content: React.ReactNode;
  arrow?: boolean;
}

/** `Tooltip` is a hint that appears on hover */
export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipTrigger>,
  TooltipProps
>((props) => {
  const { children, content, arrow = false, ...contentProps } = props;
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent {...contentProps}>
            {content}
            {arrow && <TooltipArrow />}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
});
Tooltip.displayName = "Tooltip";
