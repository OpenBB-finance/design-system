// biome-ignore lint/style/noNamespaceImport: Use all Radix imports
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { cn } from "~/utils";
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
      "radix-state-open:fade-in-0 radix-state-open:animate-in",
      "radix-state-closed:fade-out-0 radix-state-closed:animate-out",
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
        "fixed top-[50%] left-[50%] z-40 translate-x-[-50%] translate-y-[-50%]",
        "body-xs-regular flex w-[calc(100%-1rem*2)] max-w-xl flex-col gap-4 rounded-md bg-white p-4 shadow-3",
        "dark:bg-dark-850",
        "sm:max-w-md",
        "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:animate-in data-[state=open]:duration-100",
        "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:animate-out data-[state=open]:duration-200",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        asChild={true}
        className="DialogXButton absolute top-4 right-4"
      >
        <Button variant="outlined" icon={true} className="h-5 w-5 border-none">
          <Icon name="x" className="h-4 w-4" />
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
  <div className={cn("flex justify-end gap-3", className)} {...props} />
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
    className={cn("body-sm-bold pr-6", className)}
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
    className={cn("body-xs-regular", className)}
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
