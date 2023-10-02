import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils";
import { Icon } from "./Icon";

const alertVariants = cva(
  [
    "BB-Alert relative flex w-full items-start gap-4 rounded-md border p-4",
    "transition data-[open=false]:duration-300 data-[open=true]:duration-100 data-[open=false]:fade-out data-[open=true]:fade-in",
    // "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    // "[&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  ],
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        error:
          "border-danger-600 bg-danger-200 text-grey-900 [&>svg]:text-danger-600",
        success:
          "border-success-600 bg-success-100 text-grey-900 [&>svg]:text-success-600",
        warning:
          "border-warning-600 bg-warning-200 text-grey-900 [&>svg]:text-warning-600",
        info: "border-info-600 bg-info-200 text-grey-900 [&>svg]:text-info-700",
      },
    },
    defaultVariants: {
      variant: "default",
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  open?: boolean;
  onClose?: () => void;
  icon?: string;
  title?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    variant,
    children,
    open = true,
    onClose,
    icon = icons[variant],
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
        <AlertDescription>{children}</AlertDescription>
      </div>
      {isClosable && (
        <button
          type="button"
          className="focus:outline-none"
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
    <h5 ref={ref} className={cn("body-sm-bold", className)} {...props} />
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
