import { ButtonHTMLAttributes, forwardRef } from "react";
import { DefaultProps } from "../../utils/types";
import clsx from "clsx";

interface IButtonProps extends DefaultProps {
  /* Shows loading spinner */
  loading?: boolean;
  /* Makes button disabled */
  disabled?: boolean;
  /* Makes button active */
  active?: boolean;
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /* Set the original html type of button */
  type?: "button" | "reset" | "submit";
  /* Adds icon before button label */
  leftIcon?: React.ReactElement;
  /* Adds icon after button label */
  rightIcon?: React.ReactElement;
  /* Set the button color */
  color?: string;
  /* Size of the button */
  size?: "sm" | "md" | "xs";
  /** Controls button appearance */
  variant?: "primary" | "secondary" | "tertiary";
  /* React node */
  children?: React.ReactNode;
}
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IButtonProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      disabled: _disabled,
      loading,
      active,
      loadingText,
      type,
      leftIcon,
      rightIcon,
      children,
      className,
      color,
      variant = "primary",
      size = "md",
      ...rest
    } = props;
    const disabled = _disabled || loading;
    const variants = {
      primary: "_btn",
      secondary: "_btn-secondary",
      tertiary: "_btn-tertiary",
    };
    const sizes = {
      xs: "h-8 text-xs",
      sm: "h-10 text-sm",
      md: "h-12 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        type={type}
        data-active={active ? "true" : undefined}
        data-color={color ? color : undefined}
        className={clsx(variants[variant], sizes[size], className)}
        {...rest}
      >
        {leftIcon && !loading ? leftIcon : null}
        {loading && null}
        {loading
          ? loadingText || <span className="opacity-0">{children}</span>
          : children}
        {rightIcon && !loading ? rightIcon : null}
      </button>
    );
  }
);

/*<Spinner
            className={cx(
              loadingText ? "relative" : "absolute",
              loadingText ? `mr-2` : "mr-0"
            )}
            size="sm"
            />*/
