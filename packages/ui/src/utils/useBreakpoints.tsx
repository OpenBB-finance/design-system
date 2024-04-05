import { useContext, useEffect, useState } from "react";
import { capitalizeString } from ".";
import { DesignSystemContext } from "./DesignSystemContext";
import { screens as defaultScreens } from "../styles/screens";

const isClient = typeof window === "object";

type UseBreakpointsResult = { width: number } & { [key: string]: boolean };

/**
 * Hook to check if screen width is within a certain breakpoint.
 * Uses Tailwind's screen sizes by default, but can also check for additional screen sizes.
 * Allows Tailwind syntax like `sm`, `md`, `lg`, `xl`, and `2xl`,
 * max screen sizes in Tailwind syntax like `max-sm` and `max-xl`, and in camelCase like `maxSm` and `maxXl`,
 * as well as custom screen sizes like `min-[640px]` and `max-[1600px]`.
 *
 * @param additionalScreens - Additional screen widths to check for, in pixels.
 * @returns Object with keys for each breakpoint and additional screens, and boolean values for each and the current screen width in `width` key.
 *
 * @see https://tailwindcss.com/docs/responsive-design
 */
export function useBreakpoints(additionalScreens?: number[]) {
  const { tailwind } = useContext(DesignSystemContext);
  const { screens } = tailwind.theme ?? { screens: defaultScreens };

  const [width, setWidth] = useState(isClient ? window.innerWidth : 1200);

  useEffect(() => {
    if (!isClient) return;
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const result = { width } as UseBreakpointsResult;

  for (const name in screens) {
    const minWidth = parseInt(screens[name as keyof typeof screens]);
    result[name] = width >= minWidth;
    result[`max-${name}`] = width < minWidth;
    result[`max${capitalizeString(name)}`] = width < minWidth;
  }

  if (additionalScreens) {
    for (const minWidth of additionalScreens) {
      result[`min-[${minWidth}px]`] = width >= minWidth;
      result[`max-[${minWidth}px]`] = width < minWidth;
    }
  }

  return result;
}
