import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn, makeRandomId } from "utils";

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
          "peer h-4 w-4 shrink-0 rounded-[2px] border border-primary ring-offset-background",
          "hover:bg-grey-800",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:hover:bg-white",
          "data-[error]:border-danger-700",
          "transition",
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
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          className="cursor-pointer body-sm-regular peer-disabled:text-grey-600"
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
