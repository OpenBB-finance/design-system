import { clsx, type ClassValue } from "clsx";
import { typographyClassGroup } from "~/../plugins/typography";
import { extendTailwindMerge } from "tailwind-merge";

type AdditionalClassGroupIds = "typography";

export const twMerge = extendTailwindMerge<AdditionalClassGroupIds>({
  extend: {
    classGroups: {
      typography: typographyClassGroup,
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
