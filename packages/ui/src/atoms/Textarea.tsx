import { cva } from "class-variance-authority";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "~/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "../molecules/Form";
import { CopyButton } from "./CopyButton";

const textareaVariants = cva(
  [
    "BB-Textarea body-xs-regular flex min-h-[80px] w-full rounded-sm border",
    "resize-none",
    "focus:outline-none focus:data-[focus-visible]:ring-2",
    "disabled:cursor-not-allowed",
    "transition",
    /* Light theme */
    "border-grey-300 bg-white text-grey-900 placeholder:text-grey-400",
    "hover:enabled:border-grey-500",
    "data-[focused]:border-grey-600 data-[focused]:hover:border-grey-600",
    "data-[focus-visible]:ring-grey-300",
    "disabled:border-grey-200 disabled:bg-grey-100 disabled:text-grey-400 disabled:placeholder:text-grey-400",

    /* Dark theme */
    "dark:border-dark-400 dark:bg-dark-800 dark:text-grey-100 dark:placeholder:text-dark-100",
    "dark:hover:enabled:border-dark-50",
    "dark:data-[focused]:border-grey-100 dark:data-[focused]:hover:border-grey-100",
    "dark:data-[focus-visible]:ring-dark-50",
    "dark:disabled:border-dark-700 dark:disabled:bg-dark-800 dark:disabled:text-dark-200 dark:disabled:placeholder:text-dark-200",
  ],
  {
    variants: {
      state: {
        error: "!border-red-500",
        default: "",
      },
      size: {
        sm: "p-3",
      },
    },
    defaultVariants: {
      state: "default",
      size: "sm",
    },
  },
);

type ReactTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
>;

export interface TextareaProps extends ReactTextareaProps {
  /** Show copy icon appears to copy input value. */
  copiable?: boolean;
  /** Make its height auto expandable depending on value. Default is `true` */
  autoheight?: boolean;
  /** Add floating label. Requires `placeholder`. */
  label?: React.ReactNode;
  /** Text below input */
  message?: React.ReactNode;
  /** Make it red and display error message */
  error?: boolean;
  onChange?: (value: string) => void;
  // Test purposes
  "data-focused"?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, fwRef) => {
    const {
      autoheight = true,
      copiable,
      className,
      error,
      onChange,
      onFocus,
      onBlur,
      onMouseDown,
      ...rest
    } = props;

    const ref = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(fwRef, () => ref.current!);

    const [isFocused, setFocused] = useState(false);
    const [focusVisible, setFocusVisible] = useState(true);

    const value = props.value ?? ref.current?.value ?? props.defaultValue ?? "";
    const hasValue = !!value;
    const canEdit = !(props.disabled || props.readOnly);

    const state = canEdit && error ? "error" : "default";

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      onChange?.(event.target.value);
    }

    function handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
      setFocused(true);
      onFocus?.(e);
    }

    function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
      setFocused(false);
      setFocusVisible(true);
      onBlur?.(e);
    }

    function handleMouseDown(e: React.MouseEvent<HTMLTextAreaElement>) {
      setFocusVisible(false);
      onMouseDown?.(e);
    }

    useEffect(() => {
      if (autoheight) {
        const textarea = ref?.current;
        if (textarea) {
          const borders = 2;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight + borders}px`;
        }
      }
    });

    return (
      <div className="group relative">
        <textarea
          className={cn(textareaVariants({ state }), className)}
          ref={ref}
          data-focused={(isFocused && !focusVisible) || props["data-focused"] || null}
          data-focus-visible={(isFocused && focusVisible) || null}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseDown={handleMouseDown}
          {...rest}
        />
        {copiable && hasValue && (
          <CopyButton
            size="xs"
            className="absolute top-2 right-2 text-inherit transition-all hover:text-grey-900 group-aria-disabled:bg-transparent dark:hover:text-grey-100"
            text={value as string}
            tabIndex={-1}
          />
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

/* Form */

type FormTextareaProps = Omit<TextareaProps, "error">;

/** Input field used inside <Form> only. */
export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (props, ref) => {
    const { label, message, ...rest } = props;

    return (
      <FormItem className="BB-FormTextarea group" aria-disabled={props.disabled}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea ref={ref} {...rest} />
        </FormControl>
        <FormMessage>{message}</FormMessage>
      </FormItem>
    );
  },
);
FormTextarea.displayName = "FormTextarea";
