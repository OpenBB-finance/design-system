import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "utils";

interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("BB-RadioGroup grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode;
  error?: boolean;
}
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>((props, ref) => {
  const { className, children, label, id: _id, ...rest } = props;
  const randomId = React.useId();
  const id = _id ?? randomId;
  return (
    <div className="flex gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "peer aspect-square h-4 w-4 rounded-full border border-grey-800 text-grey-800 ring-offset-background",
          "flex flex-wrap items-center justify-center",
          "transition",
          "hover:enabled:border-black hover:enabled:text-black",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",

          "dark:border-grey-200 dark:text-grey-200",
          "dark:hover:enabled:border-white dark:hover:enabled:text-white",

          className,
        )}
        id={id}
        {...rest}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-2 w-2 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <label
          className={cn(
            "cursor-pointer body-xs-regular",
            "max-w-[calc(100%-1rem-0.5rem)]",
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
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

interface RadioGroupLabelProps extends React.ComponentPropsWithoutRef<"div"> {}
const RadioGroupLabel = React.forwardRef<
  React.ElementRef<React.FC>,
  RadioGroupLabelProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-1.5 text-grey-400 body-xs-regular",
      "dark:text-dark-50",
      className,
    )}
    {...props}
  />
));
RadioGroupLabel.displayName = "RadioGroupLabel";

export { RadioGroup, RadioGroupItem, RadioGroupLabel };
