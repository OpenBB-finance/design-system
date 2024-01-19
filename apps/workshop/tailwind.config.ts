// tailwind config is required for editor support
import conf from "@openbb/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [
    // ...conf.content,
    "../../packages/common/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/ui-pro/src/**/*.{js,jsx,ts,tsx,mdx}",
    "../../packages/utils/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [conf],
} satisfies Config;
