// biome-ignore lint/style/noNamespaceImport: Use all Radix imports
import * as PopoverPrimitive from "@radix-ui/react-popover";
import React from "react";
import { cn } from "~/utils";
import { DropdownMenuContentVariants } from "./DropdownMenu";
import type { TooltipProps } from "./Tooltip";
import { tooltipArrowClasses } from "./Tooltip";

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export interface ContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  ContentProps
>((props, ref) => {
  const { className, align = "center", sideOffset = 4, ...rest } = props;

  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn("BB-Popover", DropdownMenuContentVariants(), className)}
        {...rest}
      />
    </PopoverPortal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export interface PopoverArrowProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow> {}

export const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  PopoverArrowProps
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      className={cn(
        "BB-PopoverArrow",
        tooltipArrowClasses,
        "bg-white text-grey-750 dark:bg-dark-750 dark:text-grey-200",
        className,
      )}
      {...rest}
    />
  );
});
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;

/* Composed Component */

export interface PopoverProps extends TooltipProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** `Popover` is a hint, same as `Tooltip`, but appears on click or manually */
export const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  PopoverProps
>((props, ref) => {
  const {
    children,
    content,
    arrow = false,
    open,
    onOpenChange,
    ...contentProps
  } = props;
  return (
    <PopoverRoot {...{ open, onOpenChange }}>
      <PopoverTrigger asChild={true}>{children}</PopoverTrigger>
      <PopoverPortal>
        <PopoverContent ref={ref} {...contentProps}>
          {content}
          {arrow && <PopoverArrow />}
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
});
Popover.displayName = "Popover";
