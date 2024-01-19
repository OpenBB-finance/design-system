import type { StorybookConfig } from "@storybook/react-vite";

import { dirname, join } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    {
      directory: "../../../packages/common/src/stories/**",
      titlePrefix: "Common",
      files: "*.mdx",
    },
    {
      directory: "../../../packages/common/src/**",
      titlePrefix: "Common",
      files: "*.stories.*",
    },
    {
      directory: "../../../packages/ui/src/**",
      titlePrefix: "@openbb-ui",
      files: "*.stories.*",
    },
    {
      directory: "../../../packages/ui-pro/src/**",
      titlePrefix: "@openbb-ui-pro",
      files: "*.stories.*",
    },
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    {
      name: getAbsolutePath("@storybook/addon-themes"),
      options: {},
    },
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
