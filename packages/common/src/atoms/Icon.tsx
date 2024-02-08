import React from "react";
import { cn } from "utils";
import type { IconName } from "~/icons/icons";

interface Props extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon(props: Props) {
  const { name, className, size = 16, ...rest } = props;

  return (
    <svg
      className={cn("BB-Icon block", className)}
      width={size}
      height={size}
      {...rest}
    >
      <use xlinkHref={`/__spritemap#sprite-${name}`} />
    </svg>
  );
}
Icon.displayName = "Icon";
