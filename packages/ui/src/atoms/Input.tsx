import { cva } from "class-variance-authority";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "~/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "../molecules/Form";
import { CopyButton } from "./CopyButton";
import { Icon } from "./Icon";
import { Label, Message } from "./Label";

const groupVariants = cva(
  [
    "BB-Input group flex w-full items-center gap-2 rounded-sm border body-xs-regular",
    // "data-[focused]:ring-4 data-[focused]:ring-ring", //! focus-visible wont work here, so this is normal focus
    "disabled:cursor-not-allowed",
    "transition",

    "border-grey-300 bg-white text-grey-600",
    "data-[enabled]:hover:bg-white",
    "data-[focused]:text-grey-900", //! focus-visible wont work here, so this is normal focus
    "group-aria-disabled:border-grey-200 group-aria-disabled:bg-grey-200 group-aria-disabled:text-grey-600",

    "dark:border-dark-600 dark:bg-dark-800 dark:text-grey-400",
    "dark:data-[enabled]:hover:bg-dark-700",
    "dark:data-[focused]:text-grey-50", //! focus-visible wont work here, so this is normal focus
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
        sm: "gap-1 pl-2 pr-2 [&_button]:max-h-4",
        md: "gap-2 pl-3 pr-3 [&_button]:max-h-6",
        lg: "gap-2 pl-3 pr-3 [&_button]:max-h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const inputVariants = cva(
  [
    "BB-Input flex w-full border-none bg-transparent",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "disabled:cursor-not-allowed disabled:bg-transparent",
    "focus-visible:outline-none",
    "transition",

    "text-grey-900",
    "placeholder:text-grey-500",
    "focus:placeholder:text-grey-500",
    "disabled:text-grey-400 disabled:placeholder:text-grey-400",

    "dark:text-grey-50",
    "dark:placeholder:text-grey-500",
    "dark:focus:placeholder:text-grey-400",
    "dark:disabled:text-dark-400 dark:disabled:placeholder:text-dark-400",
  ],
  {
    variants: {
      size: {
        sm: "py-1 pl-2",
        md: "py-2 pl-3",
        lg: "py-3 pl-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type ReactInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "size" | "value"
>;

type InputValue = string | number;

export interface InputProps extends ReactInputProps {
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
  size?: "sm" | "md" | "lg";
  value?: InputValue;
  /** Text below input */
  message?: React.ReactNode;
  /** Make it red and display error message */
  error?: boolean;
  /** TODO: Replace password with 🦋. */
  // butterflies?: boolean;
  onChange?: (value: InputValue) => void;
}

/** Plain input component, can be used in form or outside it */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, fwRef) => {
    const {
      // default props
      className,
      type: defaultType = "text",
      placeholder,
      onFocus,
      onBlur,
      // custom props
      label,
      prefix,
      suffix,
      size = "md",
      message,
      onChange,
      disabled,
      readOnly,
      clearable = !readOnly && !disabled,
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
    const isHidden = type === "password";

    const value = props.value ?? ref.current?.value ?? props.defaultValue ?? "";
    const hasValue = !!value;
    const canEdit = !props.disabled && !props.readOnly;

    const state = canEdit && error ? "error" : "default";

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(e.target.value);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(true);
      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      setFocused(false);
      onBlur?.(e);
    }

    function switchReveal() {
      setType(type === "password" ? "text" : "password");
    }

    function clear() {
      const onChange = props.onChange! as (value: string) => void;
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
      !prefix && "pl-0",
    );

    const inputClasses = cn(
      inputVariants({ size }),
      type === "date" && "cursor-text",
      prefix && "pl-0",
    );

    return (
      <div aria-disabled={props.disabled} className="group">
        <Label>{label}</Label>
        <div
          className={groupClasses}
          data-focused={isFocused || null}
          data-enabled={canEdit || null}
        >
          {prefix && <div className="inline-flex flex-[0]">{prefix}</div>}
          <div className="relative h-full min-w-[3rem] flex-1">
            {/* @ts-ignore I didn't spend time for type mismatches */}
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
                className="pointer-events-none absolute bottom-1/2 right-0 -mb-2 h-4 w-4"
              />
            )}
          </div>
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
              <Icon name="x" className="h-4 w-4" />
            </button>
          )}
          {copiable && hasValue && (
            <CopyButton
              className="text-inherit transition-all hover:text-grey-900 group-aria-disabled:bg-transparent dark:hover:text-grey-100"
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
                <Icon name="eye" className="h-4 w-4" />
              ) : (
                <Icon name="eye-off" className="h-4 w-4" />
              )}
            </button>
          )}
          {suffix && (
            <div className="inline-flex flex-[0] items-center">{suffix}</div>
          )}
        </div>
        <Message error={error}>{message}</Message>
      </div>
    );
  },
);
Input.displayName = "Input";

/* Form */

type FormInputProps = Omit<InputProps, "error">;

/** Input field used inside <Form> only. */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { label, message, ...rest } = props;

    return (
      <FormItem className="BB-FormInput group" aria-disabled={props.disabled}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input ref={ref} {...rest} />
        </FormControl>
        <FormMessage>{message}</FormMessage>
      </FormItem>
    );
  },
);
FormInput.displayName = "FormInput";
