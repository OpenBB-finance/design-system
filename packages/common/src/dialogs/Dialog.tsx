import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

import { cn } from "utils";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "BB-DialogOverlay fixed inset-0 z-40 bg-grey-600/30 transition-all dark:bg-dark-900/80",
      "radix-state-open:animate-in radix-state-open:fade-in-0",
      "radix-state-closed:animate-out radix-state-closed:fade-out-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
        "shadow-3 flex w-[calc(100%-1rem*2)] max-w-xl flex-col gap-6 rounded-sm border border-grey-600 bg-white p-6 body-sm-regular",
        "dark:bg-dark-850",
        "md:gap-10 md:p-10 lg:max-w-[750px]",
        "radix-state-open:duration-100 radix-state-open:animate-in radix-state-open:fade-in-0 radix-state-open:zoom-in-95 radix-state-open:slide-in-from-left-1/2 radix-state-open:slide-in-from-top-[48%]",
        "radix-state-closed:duration-200 radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-closed:zoom-out-95 radix-state-closed:slide-out-to-left-1/2 radix-state-closed:slide-out-to-top-[48%]",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        asChild
        className="DialogXButton absolute right-6 top-6 md:right-10 md:top-10"
      >
        <Button variant="outlined" icon className="h-7 w-7 border-none">
          <Icon name="x" className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div className={cn("flex justify-end gap-4", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("pr-10 uppercase subtitle-md-bold", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("body-sm-regular", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
