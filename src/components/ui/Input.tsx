import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { cn } from "~/utils";

const groupVariants = cva(
  [
    "BB-TextField group flex w-full items-center gap-2 rounded-sm border border-input text-grey-600",
    "hover:border-grey-200 hover:text-grey-200",
    "data-focus:border-white",
    "transition-all",
  ],
  {
    variants: {
      state: {
        readOnly: "pointer-events-none",
        disabled: "pointer-events-none border-grey-700 text-grey-600",
        focus: "border-white",
        error: "border-destructive",
        default: "",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-4 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const inputVariants = cva([
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
  "placeholder:text-muted-foreground",
  "file:bg-transparent file:border-0 file:text-sm file:font-medium",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "focus-visible:outline-none",
]);

type ReactInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "size" | "value"
>;

export interface InputProps extends ReactInputProps {
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
  value: string | undefined;
  /** Make it red. */
  error?: boolean;
  onChange?: (value: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    // default props
    className,
    type: defaultType = "text",
    placeholder,
    value,
    onFocus,
    onBlur,
    // custom props
    prefix,
    suffix,
    size = "md",
    error = false,
    message,
    onChange,
    readOnly = props.readOnly || !onChange,
    clearable = !readOnly,
    copiable = false,
    revealable = defaultType === "password",
    ...rest
  } = props;

  const [type, setType] = useState(defaultType ?? "text");
  const [isFocused, setFocused] = useState(false);

  const isHidden = type === "password";
  const state = readOnly
    ? "readOnly"
    : props.disabled
    ? "disabled"
    : isFocused
    ? "focus"
    : error
    ? "error"
    : "default";

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

  useEffect(() => {
    setType(defaultType ?? "text");
  }, [defaultType]);

  const groupClasses = cn(
    groupVariants({ state, size }),
    value && "text-white border-white",
    className,
  );

  const inputClasses = cn(inputVariants(), type === "date" && "cursor-text");

  return (
    <div className={groupClasses}>
      {prefix && <div className="flex-shrink">{prefix}</div>}
      <div className="relative min-w-[3rem] flex-1">
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          readOnly={readOnly}
          aria-invalid={error}
          ref={ref}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ fontSize: "inherit", lineHeight: "inherit" }}
          {...rest}
        />
        {defaultType === "date" && (
          <CalendarIcon className="pointer-events-none absolute bottom-1/2 right-0 -mb-2 h-4 w-4" />
        )}
      </div>
      {clearable && !!value && (
        <button
          type="button"
          className="bg-transparent text-grey-400 transition-all hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onChange?.("");
          }}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
      {copiable && !!value && (
        <CopyButton
          className="bg-transparent hover:bg-transparent hover:text-white"
          text={value}
        />
      )}
      {revealable && (
        <button
          type="button"
          className="bg-transparent text-grey-400 transition-all hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            switchReveal();
          }}
        >
          {isHidden ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )}
        </button>
      )}
      {suffix && <div className="flex flex-shrink items-center">{suffix}</div>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
