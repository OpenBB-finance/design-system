import React from "react";
import { cn } from "utils";

interface Props extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export function Icon(props: Props) {
  const { name, className, size = 16, ...rest } = props;

  return (
    <svg
      className={cn("BB-Icon inline-block", className)}
      width={size}
      height={size}
      {...rest}
    >
      <use xlinkHref={`/__spritemap#sprite-${name}`} fill="currentColor" />
    </svg>
  );
}
Icon.displayName = "Icon";
