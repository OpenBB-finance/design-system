import plugin from "tailwindcss/plugin";

export const strokeWidthPlugin = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      stroke: (value) => ({
        "--stroke-width": value,
        strokeWidth: "var(--stroke-width)",
      }),
    },
    { values: theme("strokeWidth"), type: "any" },
  );
});
