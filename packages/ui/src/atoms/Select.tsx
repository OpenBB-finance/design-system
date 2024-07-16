// biome-ignore lint/style/noNamespaceImport: Use all Radix imports
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import React, { useMemo, useState } from "react";
import type { CanBeImmutable } from "~/utils";
import { cn } from "~/utils";
import { FormItem, FormLabel, FormMessage, useFormField } from "../molecules/Form";
import { DropdownMenuContentVariants, DropdownMenuItemVariants } from "./DropdownMenu";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Label, Message } from "./Label";

/** Show search input after this number of options if showSearch is "auto" */
export const SELECT_SHOW_SEARCH_AFTER = 20;

export const SelectTriggerVariants = cva(
  [
    "BB-Select body-xs-regular flex w-full items-center justify-between rounded-sm border [&>span]:line-clamp-1",
    "focus-visible:outline-none focus-visible:ring-2",
    "disabled:cursor-not-allowed",
    "transition",
    /* Light theme */
    "border-grey-300 bg-white text-grey-900 data-[placeholder]:text-grey-400",
    "hover:enabled:border-grey-500",
    "focus-visible:ring-grey-300",
    "disabled:border-grey-200 disabled:bg-grey-100 disabled:text-grey-400 disabled:data-[placeholder]:text-grey-400",
    /* Dark theme */
    "dark:border-dark-400 dark:bg-dark-800 dark:text-grey-100 dark:data-[placeholder]:text-dark-100",
    "dark:hover:enabled:border-dark-50",
    "dark:focus-visible:ring-dark-50",
    "dark:disabled:border-dark-700 dark:disabled:bg-dark-800 dark:disabled:text-dark-200 dark:disabled:data-[placeholder]:text-dark-200",
  ],
  {
    variants: {
      size: {
        "2xs": "!leading-4 h-[18px] gap-1 px-2",
        xs: "h-6 gap-2 px-2 py-0.5",
        sm: "h-8 gap-2 px-3 py-1.5",
        md: "h-10 gap-2 px-3 py-3",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export const SelectContentVariants = cva(DropdownMenuContentVariants(), {
  variants: {
    position: {
      popper:
        "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1",
      "item-aligned": "",
    },
  },
});

export const SelectRoot = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof SelectTriggerVariants> {}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size = "sm", ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(SelectTriggerVariants({ size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild={true}>
      <Icon name="chevron-down" className="size-4 text-grey-600 dark:text-grey-400" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectScrollUpButtonProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> {}
export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <Icon name="chevron-up" className="size-4 text-grey-600" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

interface SelectScrollDownButtonProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> {}
export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <Icon name="chevron-down" className="size-4 text-grey-600 dark:text-grey-400" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// @ts-ignore props overlapping
interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof SelectContentVariants> {
  renderSearch?: React.ReactNode;
}

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", renderSearch, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(SelectContentVariants({ position }), "space-y-0 p-0", className)}
      position={position}
      {...props}
    >
      {renderSearch}
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "h-full w-full p-2",
          position === "popper" &&
            "h-radix-select-trigger-height min-w-[var(--radix-select-trigger-width)]",
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
export const SelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectGroupLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "body-xs-regular mb-1.5 text-grey-400",
      "dark:text-dark-50",
      className,
    )}
    {...props}
  />
));
SelectGroupLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
export const SelectItem = React.forwardRef<
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
        <Icon name="check" className="size-4 text-grey-600 dark:text-grey-400" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
export const SelectSeparator = React.forwardRef<
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
  options: CanBeImmutable<SelectOption[]>;
}

interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    VariantProps<typeof SelectTriggerVariants> {
  // Model
  options: CanBeImmutable<SelectOption[] | SelectOptionGroup[]>;
  onChange?: SelectPrimitive.SelectProps["onValueChange"];
  // Search
  /** Show search input inside the options list */
  showSearch?: boolean | "auto";
  filterFn?: (search: string, option: SelectOption) => boolean;
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
export const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectProps
>((props, ref) => {
  const {
    // Model
    options,
    onChange,
    // Search
    showSearch = "auto",
    filterFn = defaultSearchFn,
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

  const flatOptions = useMemo(() => {
    return options.flatMap((option) => {
      if (typeof option === "object" && "options" in option) {
        return option.options;
      }
      return option;
    });
  }, [options]);

  const [search, setSearch] = useState("");
  const isSearchVisible =
    showSearch === "auto" ? flatOptions.length > SELECT_SHOW_SEARCH_AFTER : showSearch;

  const filteredOptions = useMemo(() => {
    if (!search) {
      return new Set(flatOptions);
    }
    const filteredArray = flatOptions.filter((option) => filterFn(search, option));
    return new Set(filteredArray);
  }, [flatOptions, search, filterFn]);

  function renderSearch() {
    if (!isSearchVisible) {
      return null;
    }
    return (
      <div className="px-2">
        <Input
          className="w-fit"
          placeholder="Search"
          autoFocus={true}
          value={search}
          onChange={setSearch}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    );
  }

  function renderGroup(group: SelectOptionGroup) {
    const options = group.options.map((option) => renderOption(option)).filter(Boolean);
    const isVisible = options.length > 0;
    if (!isVisible) {
      return null;
    }

    return (
      <SelectGroup key={group.label}>
        <SelectGroupLabel>{group.label}</SelectGroupLabel>
        {options}
      </SelectGroup>
    );
  }

  function renderOption(option: SelectOption) {
    const isVisible = filteredOptions.has(option);
    if (!isVisible) {
      return null;
    }

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
          translate="no"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <Message error={error}>{message}</Message>
      </div>
      <SelectContent renderSearch={renderSearch()}>
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
export const FormSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  FormSelectProps
>((props, ref) => {
  const { label, message, ...rest } = props;
  const { error } = useFormField();

  return (
    <FormItem className="BB-FormSelect group" aria-disabled={props.disabled}>
      <FormLabel>{label}</FormLabel>
      <Select ref={ref} error={!!error} {...rest} />
      <FormMessage>{message}</FormMessage>
    </FormItem>
  );
});
FormSelect.displayName = "FormSelect";

function defaultSearchFn(search: string, option: SelectOption) {
  if (typeof option === "string") {
    return searchIgnoreCase(option, search);
  }
  const { label, value } = option;
  return searchIgnoreCase(label, search) || searchIgnoreCase(value, search);
}

function searchIgnoreCase(str: string, substr: string) {
  return str.toLowerCase().includes(substr.toLowerCase());
}
