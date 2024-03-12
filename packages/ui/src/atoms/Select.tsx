import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/utils";
import { FormItem, FormLabel, FormMessage } from "../molecules/Form";
import {
  DropdownMenuContentVariants,
  DropdownMenuItemVariants,
} from "./DropdownMenu";
import { Icon } from "./Icon";
import { Label, Message } from "./Label";

export const SelectTriggerVariants = cva(
  [
    "BB-Select flex w-full items-center justify-between rounded-sm border body-xs-regular [&>span]:line-clamp-1",
    "transition",
    /* Light theme */
    "border-grey-200 bg-white text-grey-900 data-[placeholder]:text-grey-500",
    "hover:enabled:text-grey-900",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-300",
    "disabled:cursor-not-allowed disabled:border-grey-200 disabled:bg-grey-200 disabled:text-grey-400 disabled:data-[placeholder]:text-grey-400",
    /* Dark theme */
    "dark:border-dark-600 dark:bg-dark-800 dark:text-grey-50 dark:data-[placeholder]:text-grey-500",
    "dark:hover:enabled:border-dark-400 dark:hover:enabled:bg-dark-600 dark:hover:enabled:text-grey-300",
    "dark:focus-visible:ring-dark-50",
    "dark:disabled:border-dark-750 dark:disabled:bg-dark-800 dark:disabled:text-dark-400 dark:disabled:data-[placeholder]:text-dark-400",
  ],
  {
    variants: {
      size: {
        xs: "gap-1 px-1",
        sm: "gap-2 px-2 py-1",
        md: "gap-2 p-2",
        lg: "gap-2 p-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const SelectContentVariants = cva(DropdownMenuContentVariants(), {
  variants: {
    position: {
      popper:
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      "item-aligned": "",
    },
  },
});

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof SelectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size = "md", ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(SelectTriggerVariants({ size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon
        name="chevron-down"
        size={16}
        className="text-grey-600 dark:text-grey-400"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectScrollUpButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollUpButton
  > {}
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <Icon name="chevron-down" size={16} className="text-grey-600" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

interface SelectScrollDownButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollDownButton
  > {}
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <Icon
      name="chevron-down"
      size={16}
      className="text-grey-600 dark:text-grey-400"
    />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

// @ts-ignore props overlapping
interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof SelectContentVariants> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        SelectContentVariants({ position }),
        "space-y-0 p-0",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "space-y-2 p-2",
          position === "popper" &&
            "w-full min-w-[var(--radix-select-trigger-width)] h-radix-select-trigger-height",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

interface SelectGroupLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
const SelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectGroupLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "mb-1.5 text-grey-400 body-xs-regular",
      "dark:text-dark-50",
      className,
    )}
    {...props}
  />
));
SelectGroupLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(DropdownMenuItemVariants(), className)}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon
          name="check"
          size={16}
          className="text-grey-600 dark:text-grey-400"
        />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Composed Select

export interface SelectOptionObject {
  label: string;
  value: string;
  disabled?: boolean;
}
export type SelectOption = SelectOptionObject | string;

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    VariantProps<typeof SelectTriggerVariants> {
  // Model
  options: SelectOption[] | SelectOptionGroup[];
  onChange?: SelectPrimitive.SelectProps["onValueChange"];
  // Trigger
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  // Other components
  label?: React.ReactNode;
  message?: React.ReactNode;
  error?: boolean;
}
/** Plain select component, can be used in form or outside it */
const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectProps
>((props, ref) => {
  const {
    // Model
    options,
    onChange,
    // Trigger
    className,
    placeholder,
    size,
    autoFocus,
    // Other components
    label,
    message,
    error,
    ...rest
  } = props;

  function renderGroup(group: SelectOptionGroup) {
    return (
      <SelectGroup key={group.label}>
        <SelectGroupLabel>{group.label}</SelectGroupLabel>
        {group.options.map((option) => renderOption(option))}
      </SelectGroup>
    );
  }

  function renderOption(option: SelectOption) {
    const value = typeof option === "string" ? option : option.value;
    const label = typeof option === "string" ? option : option.label;
    return (
      <SelectItem key={value} value={value}>
        {label}
      </SelectItem>
    );
  }

  return (
    <SelectRoot onValueChange={onChange} {...rest}>
      <div className="BB-Select group" aria-disabled={props.disabled}>
        <Label>{label}</Label>
        <SelectTrigger
          ref={ref}
          className={className}
          size={size}
          autoFocus={autoFocus}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <Message error={error}>{message}</Message>
      </div>
      <SelectContent>
        {options.map((option) =>
          typeof option === "object" && "options" in option
            ? renderGroup(option)
            : renderOption(option),
        )}
      </SelectContent>
    </SelectRoot>
  );
});
Select.displayName = "Select";

/* Form */

type FormSelectProps = Omit<SelectProps, "error">;

/** Select field used inside <Form> only. */
const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  FormSelectProps
>((props, ref) => {
  const { label, message, ...rest } = props;

  return (
    <FormItem className="BB-FormSelect group" aria-disabled={props.disabled}>
      <FormLabel>{label}</FormLabel>
      <Select ref={ref} {...rest} />
      <FormMessage>{message}</FormMessage>
    </FormItem>
  );
});
FormSelect.displayName = "FormSelect";

export {
  FormSelect,
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};

