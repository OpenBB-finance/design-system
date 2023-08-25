import React from "react";
import "virtual:svg-icons-register";
import { cn } from "~/utils";

interface Props extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export function Icon(props: Props) {
  const { name, className, size = 16, ...rest } = props;

  const symbolId = `#icon-${name}`;
  const iconClasses = cn("BB-Icon", className);

  return (
    <svg className={iconClasses} width={size} height={size} {...rest}>
      <use href={symbolId} fill="currentColor" />
    </svg>
  );
}
