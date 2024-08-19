import { cva } from "class-variance-authority";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "~/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "../molecules/Form";
import { CopyButton } from "./CopyButton";

const textareaVariants = cva(
  [
    "BB-Textarea body-xs-regular flex min-h-[80px] w-full rounded-sm border",
    "resize-none",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed",
    "transition",

    "border-grey-300 bg-white text-grey-900",
    "data-[enabled]:hover:bg-white",
    "disabled:border-grey-200 disabled:bg-grey-200 disabled:text-grey-600",

    "dark:border-dark-600 dark:bg-dark-800 dark:text-grey-50",
    "dark:data-[enabled]:hover:bg-dark-700",
    "dark:disabled:border-dark-700 dark:disabled:bg-dark-800 dark:disabled:text-dark-200 dark:disabled:placeholder:text-dark-400",
  ],
  {
    variants: {
      state: {
        error: "!border-red-500",
        default: "",
      },
      size: {
        md: "p-3",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

export type ReactTextareaProps = Omit<
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
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, fwRef) => {
    const { autoheight = true, copiable, className, error, onChange, ...rest } = props;

    const ref = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(fwRef, () => ref.current!);

    const value = props.value ?? ref.current?.value ?? props.defaultValue ?? "";
    const hasValue = !!value;
    const canEdit = !(props.disabled || props.readOnly);

    const state = canEdit && error ? "error" : "default";

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      onChange?.(event.target.value);
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
          onChange={handleChange}
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

export type FormTextareaProps = Omit<TextareaProps, "error">;

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
