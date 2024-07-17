import { cva } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "~/utils";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../molecules/Form";
import { CopyButton } from "./CopyButton";
import { Icon } from "./Icon";
import { Label, Message } from "./Label";

const groupVariants = cva(
  [
    "BB-Input group body-xs-regular flex w-full min-w-[3rem] items-center gap-2 rounded-sm border",
    //! native focus and focus-visible won't work here, so data-focused and data-focus-visible are used instead
    "data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
    "data-[has-suffix]:pr-1 data-[has-prefix]:pl-1",
    "group-aria-disabled:cursor-not-allowed",
    "transition",
    /* Light theme */
    "border-grey-300 bg-white text-grey-900",
    "data-[enabled]:hover:border-grey-500",
    "data-[focused]:border-grey-600 data-[focused]:hover:border-grey-600",
    "data-[focus-visible]:ring-grey-300",
    "group-aria-disabled:border-grey-200 group-aria-disabled:bg-grey-100 group-aria-disabled:text-grey-600",
    /* Dark theme */
    "dark:border-dark-400 dark:bg-dark-800 dark:text-grey-100",
    "dark:data-[enabled]:hover:border-dark-50",
    "dark:data-[focused]:border-grey-100 dark:data-[focused]:hover:border-grey-100",
    "dark:data-[focus-visible]:ring-dark-50",
    "dark:group-aria-disabled:border-dark-700 dark:group-aria-disabled:bg-dark-800 dark:group-aria-disabled:text-dark-200",
  ],
  {
    variants: {
      state: {
        error: "!border-red-500",
        default: "",
      },
      size: {
        //! Keep pl and pr, don't use px! It's overriding below.
        "2xs": "!leading-4 gap-1 pr-2 pl-2 [&_.BB-Icon]:size-3 [&_button]:max-h-3",
        xs: "gap-1 pr-2 pl-2 [&_button]:max-h-4",
        sm: "gap-2 pr-3 pl-3 data-[has-suffix]:pr-2 data-[has-prefix]:pl-2 [&_button]:max-h-6",
        md: "gap-2 pr-3 pl-3 data-[has-suffix]:pr-2 data-[has-prefix]:pl-2 [&_button]:max-h-8",
      },
    },
    defaultVariants: {
      state: "default",
      size: "sm",
    },
  },
);

const inputVariants = cva(
  [
    "BB-Input flex w-full border-none bg-transparent",
    "file:border-0 file:bg-transparent file:font-medium file:text-sm",
    "disabled:cursor-not-allowed disabled:bg-transparent",
    "focus-visible:outline-none",
    "transition",
    /* Light theme */
    "text-grey-900",
    "placeholder:text-grey-400",
    "disabled:text-grey-400 disabled:placeholder:text-grey-400",
    /* Dark theme */
    "dark:text-grey-100",
    "dark:placeholder:text-dark-100",
    "dark:disabled:text-dark-200 dark:disabled:placeholder:text-dark-200",
  ],
  {
    variants: {
      size: {
        "2xs": "py-0 pl-1",
        xs: "py-0.5 pl-2",
        sm: "py-1.5 pl-3",
        md: "py-3 pl-3",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

type ReactInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "size" | "value" | "defaultValue" | "type"
>;

export interface InputProps extends ReactInputProps {
  type?: "text" | "password" | "date" | "email" | "datetime-local" | "tel";
  value?: string | number; //? Not sure about number values, if we don't support onChange for them. But needed for zod validation.
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  /** Add floating label. Requires `placeholder`. */
  label?: React.ReactNode;
  /** When value is not empty, x icon appears to clear input. */
  clearable?: boolean;
  /** Show copy icon appears to copy input value. */
  copiable?: boolean;
  /** Show eye icon to reveal and hide password. Password is hidden by default. */
  revealable?: boolean;
  /** Add React element inside border before input. */
  prefix?: React.ReactNode;
  /** Add React element inside border after input. */
  suffix?: React.ReactNode;
  size?: "2xs" | "xs" | "sm" | "md";
  /** Text below input */
  message?: React.ReactNode;
  /** Make it red and display error message */
  error?: boolean;
  /** TODO: Replace password with 🦋. */
  // butterflies?: boolean;
  // Test purposes
  "data-focused"?: boolean;
}

/** Plain input component, can be used in form or outside it */
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, fwRef) => {
  const {
    // default props
    className,
    type: defaultType = "text",
    placeholder,
    onFocus,
    onBlur,
    onClick: onMouseDown,
    // custom props
    label,
    prefix,
    suffix,
    size = "sm",
    message,
    onChange,
    disabled,
    readOnly,
    clearable = !(readOnly || disabled),
    copiable = false,
    revealable = defaultType === "password",
    error,
    // butterflies = revealable,
    ...rest
  } = props;

  // Uncontrolled state support
  const localRef = useRef<HTMLInputElement>(null);
  const ref = (fwRef as React.RefObject<HTMLInputElement>) ?? localRef;

  const [type, setType] = useState(defaultType ?? "text");
  const [isFocused, setFocused] = useState(false);
  const [focusVisible, setFocusVisible] = useState(true);
  const isHidden = type === "password";

  const value = props.value ?? ref.current?.value ?? props.defaultValue ?? "";
  const hasValue = !!value;
  const canEdit = !(props.disabled || props.readOnly);

  const hasPrefix = !!prefix;
  const showCopyButton = copiable && hasValue;
  const showRevealButton = revealable;
  const showClearButton = clearable && hasValue && canEdit;
  const hasSuffix = !!suffix || showCopyButton || showRevealButton || showClearButton;

  const state = canEdit && error ? "error" : "default";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore Argument of type 'string' is not assignable to parameter of type 'never'.ts(2345)
    onChange?.(e.target.value);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocused(true);
    onFocus?.(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setFocused(false);
    setFocusVisible(true);
    onBlur?.(e);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLInputElement>) {
    setFocusVisible(false);
    onMouseDown?.(e);
  }

  function switchReveal() {
    setType(type === "password" ? "text" : "password");
  }

  function clear() {
    const onChange = props.onChange;
    if (onChange) {
      onChange("");
    } else {
      const input = ref.current;
      if (input) {
        input.value = "";
      }
    }
  }

  useEffect(() => {
    setType(defaultType ?? "text");
  }, [defaultType]);

  const groupClasses = cn(
    groupVariants({ state, size }),
    className,
    !hasPrefix && "pl-0",
    !hasSuffix && "pr-0",
  );

  const inputClasses = cn(
    inputVariants({ size }),
    type === "date" && "cursor-text",
    hasPrefix && "pl-0",
    hasSuffix && "pr-0",
  );

  return (
    <div aria-disabled={props.disabled} className="group">
      <Label>{label}</Label>
      <div
        className={groupClasses}
        data-focused={(isFocused && !focusVisible) || props["data-focused"] || null}
        data-focus-visible={(isFocused && focusVisible) || null}
        data-enabled={canEdit || null}
        data-has-prefix={hasPrefix || null}
        data-has-suffix={hasSuffix || null}
        onMouseDown={handleMouseDown}
      >
        {prefix && <div className="inline-flex flex-[0]">{prefix}</div>}
        <div className="relative h-full flex-1">
          <input
            key="qwe"
            type={type}
            className={cn("peer", inputClasses)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error}
            ref={ref}
            defaultValue={props.defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ fontSize: "inherit", lineHeight: "inherit" }}
            {...rest}
          />

          {defaultType === "date" && (
            <Icon
              name="calendar"
              className="-mb-2 pointer-events-none absolute right-0 bottom-1/2 size-4"
            />
          )}
        </div>
        {copiable && hasValue && (
          <CopyButton
            className="bg-transparent text-inherit transition-all hover:text-grey-900 group-aria-disabled:bg-transparent dark:bg-transparent dark:hover:text-grey-100"
            text={value as string}
            tabIndex={-1}
          />
        )}
        {revealable && (
          <button
            type="button"
            className="inline-flex flex-[0] bg-transparent text-inherit transition-all hover:text-grey-900 dark:hover:text-grey-100"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              switchReveal();
            }}
          >
            {isHidden ? (
              <Icon name="eye" className="size-4" />
            ) : (
              <Icon name="eye-off" className="size-4" />
            )}
          </button>
        )}
        {suffix && <div className="inline-flex flex-[0] items-center">{suffix}</div>}
        {clearable && hasValue && canEdit && (
          <button
            type="button"
            className="inline-flex flex-[0] bg-transparent text-inherit transition-all hover:text-grey-900 dark:hover:text-grey-100"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              clear();
            }}
          >
            <Icon name="x" className="size-4" />
          </button>
        )}
      </div>
      <Message error={error}>{message}</Message>
    </div>
  );
});
Input.displayName = "Input";

/* Form */

type FormInputProps = Omit<InputProps, "error">;

/** Input field used inside <Form> only. */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { label, message, ...rest } = props;
    const { error } = useFormField();

    return (
      <FormItem className="BB-FormInput group" aria-disabled={props.disabled}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input ref={ref} error={!!error} {...rest} />
        </FormControl>
        <FormMessage>{message}</FormMessage>
      </FormItem>
    );
  },
);
FormInput.displayName = "FormInput";
