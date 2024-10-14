// biome-ignore lint/style/noNamespaceImport: Use all Radix imports
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";
import type { IconName } from "~/icons/icons";
import { cn } from "~/utils";
import { Icon } from "./Icon";

const avatarVariants = cva(
  [
    "BB-Avatar relative flex aspect-square shrink-0 overflow-hidden rounded-full",
    "bg-orange-400 text-white",
  ],
  {
    variants: {
      size: {
        xs: "subtitle-2xs-medium w-6",
        sm: "body-xs-medium w-8",
        md: "subtitle-sm-medium w-10",
        lg: "subtitle-md-medium w-12",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

/* Radix parts */

interface AvatarRootProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}
export const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarRootProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
));
AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}
export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  icon?: IconName;
}
export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, children, icon = "user", ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "BB-AvatarFallback flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
    {...props}
  >
    {children ? children : <Icon name={icon} className="h-1/2 w-1/2" />}
  </AvatarPrimitive.Fallback>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* Composed molecule */

export interface AvatarProps extends AvatarRootProps {
  src?: string;
  alt?: string;
  icon?: IconName;
  fallback?: React.ReactNode;
  /** Delay in milliseconds to show the fallback */
  delayMs?: number;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, icon, fallback, delayMs, ...props }, ref) => {
    return (
      <AvatarRoot {...props} ref={ref}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback icon={icon} delayMs={delayMs}>
          {fallback}
        </AvatarFallback>
      </AvatarRoot>
    );
  },
);
Avatar.displayName = AvatarPrimitive.Root.displayName;
