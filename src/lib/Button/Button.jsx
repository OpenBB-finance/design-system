import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef((props, ref) => {
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
    primary: "_openbb-btn",
    secondary: "_openbb-btn-secondary",
    tertiary: "_openbb-btn-tertiary",
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
});

/*<Spinner
            className={cx(
              loadingText ? "relative" : "absolute",
              loadingText ? `mr-2` : "mr-0"
            )}
            size="sm"
            />*/
