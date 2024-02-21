import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/react";
import { themes } from "@storybook/theming";
import React from "react";
import "./styles.css";
React; // keep it to prevent unused import deletion

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fff" },
        { name: "dark", value: "#131313" },
      ],
    },
    docs: {
      theme: themes.dark,
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
