import React from "react";
import "virtual:svg-icons-register";
import { cn } from "~/utils";

interface Props extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export function Icon(props: Props) {
  const { name, className, ...rest } = props;

  const symbolId = `#icon-${name}`;
  const iconClasses = cn("h-6 w-6", className);

  return (
    <svg className={iconClasses} {...rest}>
      <use href={symbolId} fill="currentColor" />
    </svg>
  );
}
