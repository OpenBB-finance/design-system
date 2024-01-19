import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";

import { Icon } from "common";
import { cn } from "utils";

import { CopyButton } from "./CopyButton";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./Form";

const groupVariants = cva(
  [
    "BB-Input group flex w-full items-center gap-2 rounded-sm border body-xs-regular",
    // "data-[focused]:ring-4 data-[focused]:ring-ring", //! focus-visible won't work here, so this is normal focus
    "transition-all",

    "border-grey-300 bg-white text-grey-600",
    "hover:bg-white",
    "data-[focused]:text-grey-900", //! focus-visible won't work here, so this is normal focus

    "dark:border-dark-600 dark:bg-dark-800 dark:text-grey-400",
    "dark:hover:bg-dark-700",
    "data-[focused]:text-grey-50", //! focus-visible won't work here, so this is normal focus
  ],
  {
    variants: {
      state: {
        readOnly: "pointer-events-none",
        disabled:
          "pointer-events-none border-grey-200 bg-grey-100 text-grey-600 dark:border-dark-700 dark:bg-dark-750 dark:text-dark-200",
        error: "!border-red-500",
        default: "",
      },
      size: {
        sm: "px-2",
        md: "px-3",
        lg: "px-3",
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

    "text-grey-900",
    "placeholder:text-grey-600",
    "focus:placeholder:text-grey-500 dark:focus:placeholder:text-grey-400",
    "disabled:text-grey-300 disabled:placeholder:text-grey-300",

    "dark:text-grey-50",
    "dark:hover:placeholder:text-grey-300",
  ],
  {
    variants: {
      size: {
        sm: "py-1",
        md: "py-2",
        lg: "py-3",
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
  value?: string;
  /** Text below input */
  message?: React.ReactNode;
  // /** Make it red and display error message */
  // error?: React.ReactNode;
  /** TODO: Replace password with 🦋. */
  // butterflies?: boolean;
  onChange?: (value: string) => void;
}

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
      // butterflies = revealable,
      ...rest
    } = props;

    const { error } = useFormField();

    // Uncontrolled state support
    const localRef = React.useRef<HTMLInputElement>(null);
    const ref = (fwRef as React.RefObject<HTMLInputElement>) ?? localRef;

    const [type, setType] = useState(defaultType ?? "text");
    const [isFocused, setFocused] = useState(false);

    const isHidden = type === "password";
    const state = readOnly
      ? "readOnly"
      : props.disabled
      ? "disabled"
      : error
      ? "error"
      : "default";

    const value = props.value ?? ref.current?.value ?? props.defaultValue ?? "";
    const hasValue = !!value;

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

    const groupClasses = cn(groupVariants({ state, size }), className);

    const inputClasses = cn(
      inputVariants({ size }),
      type === "date" && "cursor-text",
    );

    return (
      <FormItem aria-disabled={disabled}>
        <FormLabel>{label}</FormLabel>
        <div className={groupClasses} data-focused={isFocused || null}>
          {prefix && <div className="flex-shrink">{prefix}</div>}
          <div className="relative h-full min-w-[3rem] flex-1">
            <FormControl>
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
            </FormControl>
            {defaultType === "date" && (
              <Icon
                name="calendar"
                className="pointer-events-none absolute bottom-1/2 right-0 -mb-2 h-4 w-4"
              />
            )}
          </div>
          {clearable && hasValue && (
            <button
              type="button"
              className="bg-transparent text-inherit transition-all hover:text-grey-900 dark:hover:text-grey-100"
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
              className="bg-transparent text-inherit transition-all hover:text-grey-900 dark:hover:text-grey-100"
              text={value as string}
            />
          )}
          {revealable && (
            <button
              type="button"
              className="bg-transparent text-inherit transition-all hover:text-grey-900 dark:hover:text-grey-100"
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
            <div className="flex flex-shrink items-center">{suffix}</div>
          )}
        </div>
        <FormMessage className="body-xs-medium">{message}</FormMessage>
      </FormItem>
    );
  },
);
Input.displayName = "Input";