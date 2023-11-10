import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

import { cn, makeRandomId } from "utils";
import { Icon } from "..";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  error?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>((props, ref) => {
  const {
    className,
    label,
    error,
    id = makeRandomId(props.name),
    ...rest
  } = props;

  return (
    <div className="flex gap-2">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "BB-Checkbox peer h-4 w-4 shrink-0 rounded-[2px] border ring-offset-background",
          "disabled:cursor-not-allowed",
          "data-[error]:!border-danger-500",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring ",
          "transition",
          // Light theme
          "border-grey-400",
          "hover:border-grey-600 hover:bg-grey-50",
          "focus-visible:bg-white focus-visible:text-white",
          "disabled:border-grey-300 disabled:bg-grey-100",
          "data-[state=checked]:border-grey-800 data-[state=checked]:bg-grey-800 data-[state=checked]:text-grey-100",
          "data-[state=checked]:hover:border-grey-900 data-[state=checked]:hover:bg-grey-900 data-[state=checked]:hover:text-white",
          "data-[state=checked]:disabled:border-grey-300 data-[state=checked]:disabled:bg-grey-300 data-[state=checked]:disabled:text-grey-400",
          // Dark theme
          "dark:border-dark-50",
          "dark:hover:border-grey-400 dark:hover:bg-grey-850",
          "dark:focus-visible:border-dark-100 dark:focus-visible:bg-transparent dark:focus-visible:text-grey-900",
          "dark:disabled:border-dark-400 dark:disabled:bg-dark-800",
          "dark:data-[state=checked]:border-grey-50 dark:data-[state=checked]:bg-grey-50 dark:data-[state=checked]:text-grey-900",
          "dark:data-[state=checked]:hover:border-grey-200 dark:data-[state=checked]:hover:bg-grey-200 dark:data-[state=checked]:hover:text-grey-900",
          "dark:data-[state=checked]:disabled:border-dark-400 dark:data-[state=checked]:disabled:bg-dark-400 dark:data-[state=checked]:disabled:text-dark-800",

          label && "mt-[3px]",
          className,
        )}
        id={id}
        data-error={error}
        {...rest}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Icon name="check" size={16} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          className={cn(
            "cursor-pointer body-sm-regular",
            "peer-disabled:cursor-not-allowed",
            "transition",
            // Light theme
            "text-grey-900",
            "peer-disabled:text-grey-400",
            // Dark theme
            "dark:text-grey-100",
            "dark:peer-disabled:text-grey-500",
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
