import { cva } from "class-variance-authority";
import { useEffect, useState, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import CopyButton from "../General/CopyButton";
import CalendarIcon from "../Icons/Calendar";
import CloseIcon from "../Icons/Close";
import EyeIcon from "../Icons/Eye";
import EyeOffIcon from "../Icons/EyeOff";

type ReactInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "prefix" | "size" | "value"
>;

interface Props extends ReactInputProps {
  clearable?: boolean;
  copiable?: boolean;
  revealable?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  value: string | undefined;
  error?: boolean;
  message?: React.ReactNode;
  onChange?: (value: string) => void;
}

export default function TextField(props: Props) {
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

  const wrapperClasses = twMerge(
    wrapperVariants({ size }),
    value ? "!border-white text-white" : "text-grey-400",
    isFocused ? "border-white" : "border-grey-600",
    error ? "border-red-500" : "",
    className,
  );

  const messageClasses = twMerge(
    "mt-1 text-xs text-grey-400 transition",
    error ? "text-red-500" : "",
  );

  return (
    <>
      <div className={wrapperClasses}>
        {prefix && <div className="flex-shrink">{prefix}</div>}
        <div className="relative min-w-[3rem] flex-1">
          <input
            type={type}
            className={twMerge(
              "bg-transparent m-0 w-full border-none p-0 placeholder:text-grey-400 focus:text-white focus:outline-none focus:ring-0",
              type === "date" ? "cursor-text" : "",
            )}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            aria-invalid={error}
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
        {suffix && (
          <div className="flex flex-shrink items-center">{suffix}</div>
        )}
      </div>
      {message && <div className={messageClasses}>{message}</div>}
    </>
  );
}

const wrapperVariants = cva(
  [
    "BB-TextField flex w-full items-center gap-2 rounded-md border text-white",
    "hover:border-grey-200 hover:text-grey-200",
    "transition-all",
  ],
  {
    variants: {
      state: {
        "read-only": "pointer-events-none",
        disabled: "pointer-events-none border-grey-700 text-grey-600",
        focus: "border-white",
      },
      size: {
        sm: "h-7 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-4 text-sm",
      },
    },
  },
);
