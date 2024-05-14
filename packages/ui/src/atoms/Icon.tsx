import type React from "react";
import type { IconName } from "~/icons/icons";
import { cn } from "~/utils";

export type { IconName } from "~/icons/icons";

interface Props extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  /** @deprecated use tailwind class e.g. `size-4` instead */
  size?: number;
}

export function Icon(props: Props) {
  const { name, className, size = 16, ...rest } = props;

  return (
    <svg
      className={cn("BB-Icon block size-4", className)}
      width={size}
      height={size}
      {...rest}
    >
      <use xlinkHref={`${Icon.defaultUrl}#sprite-${name}`} />
    </svg>
  );
}
Icon.displayName = "Icon";
/**
 * Sometimes it's not possible to copy a file from node_modules into bundle, so we can use this defaultUrl to point to the spritemap file
 */
Icon.defaultUrl = "/__spritemap";
