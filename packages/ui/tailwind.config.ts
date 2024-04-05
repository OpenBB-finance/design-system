import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import radixPlugin from "tailwindcss-radix";
import { bgRadialPlugin } from "./plugins/bg-radial";
import { typographyPlugin } from "./plugins/typography";
import { colors, gradients } from "./src/styles/colors";
import { screens } from "./src/styles/screens";

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        xl: "40px",
      },
      // Define container breakpoints to match Tailwind's default screens, excluding 2xl
      //! WARN: Don't try to get values from default tailwind config, as it will blow up bundle size and cause issues. If you need to override, make it directly in project.
      screens,
    },
    colors,
    extend: {
      colors: {
        accent: colors["light-blue"],

        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          foreground: "var(--tertiary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      backgroundImage: {
        ...gradients,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "light-1": "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
        "light-2": "2px 4px 15px 0px rgba(0, 0, 0, 0.10)",
        "light-3": "0px 2px 10px 0px rgba(0, 0, 0, 0.20)",
        "dark-1": "0px 2px 10px 0px rgba(0, 0, 0, 0.40)",
        "dark-2": "2px 4px 15px 0px rgba(0, 0, 0, 0.60)",
        "dark-3": "0px 2px 10px 0px rgba(0, 0, 0, 0.80)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        /** Used in Alert */
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        /** Used in Alert */
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [radixPlugin, animatePlugin, typographyPlugin, bgRadialPlugin],
} satisfies Config;
