import plugin from "tailwindcss/plugin";

export const strokeWidthPlugin = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      stroke: (value) => ({
        "--stroke-width": value,
        strokeWidth: `var(--stroke-width)`,
      }),
    },
    { values: theme("strokeWidth"), type: "any" },
  );
});
