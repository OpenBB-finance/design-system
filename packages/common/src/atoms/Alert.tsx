import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Icon } from "./Icon";
import { cn } from "utils";
import type { IconName } from "~/icons/icons";

const alertVariants = cva(
  [
    "BB-Alert relative flex w-full items-start gap-2 rounded-md p-4",
    "transition data-[open=false]:duration-300 data-[open=true]:duration-100 data-[open=false]:fade-out data-[open=true]:fade-in",
  ],
  {
    variants: {
      variant: {
        error: "bg-danger-600 text-white",
        success: "bg-success-600 text-white",
        warning: "bg-warning-600 text-white",
        info: "bg-info-600 text-white",
      },
    },
  },
);

const icons = {
  error: "x-outline-circle",
  success: "check-outline-circle",
  warning: "exclamation-outline-triangle",
  info: "exclamation-outline-circle",
} as const;

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  open?: boolean;
  onClose?: () => void;
  icon?: IconName;
  title?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    variant,
    children,
    open = true,
    onClose,
    icon = variant && icons[variant],
    title,
    ...rest
  } = props;

  const isClosable = !!onClose;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      data-open={open}
      {...rest}
    >
      {icon && <Icon name={icon} className="h-[18px] w-[18px]" />}
      <div className="flex flex-1 flex-col gap-2">
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertDescription>{children}</AlertDescription>}
      </div>
      {isClosable && (
        <button
          type="button"
          className="mt-[1px] focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
Alert.displayName = "Alert";

interface AlertTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}
const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("body-xs-bold", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm body-xs-regular", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
