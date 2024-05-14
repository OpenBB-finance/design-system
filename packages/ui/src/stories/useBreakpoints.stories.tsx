import type { Meta, StoryObj } from "@storybook/react";
import { DesignSystemContext } from "~/utils/DesignSystemContext";

import { useContext } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import { Button } from "~/atoms/Button";
import { useBreakpoints } from "~/utils/useBreakpoints";
import tailwindConfig from "../../tailwind.config";
const tailwind = resolveConfig(tailwindConfig);

const meta = {
  title: "useBreakpoints",
  // component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (_args) => {
  return (
    <DesignSystemContext.Provider value={{ tailwind }}>
      <TestBreakpoints />
    </DesignSystemContext.Provider>
  );
};

function TestBreakpoints() {
  const { tailwind } = useContext(DesignSystemContext);
  const screens = (tailwind.theme?.screens ?? {}) as Record<string, string>;
  const { width, ...bp } = useBreakpoints();

  if (!screens) { return null; }
  return (
    <div className="body-sm-medium max-w-2xl overflow-hidden border border-grey-600">
      <div className="grid grid-cols-6 bg-grey-300 text-center">
        <div className="border-r border-r-grey-600 bg-green-300 p-2">
          default (xs):
          <br />
          always
        </div>
        <div className="border-r border-r-grey-600 p-2 sm:bg-green-300">
          sm:
          <br />
          &gt;={screens.sm}
        </div>
        <div className="border-r border-r-grey-600 p-2 md:bg-green-300">
          md:
          <br />
          &gt;={screens.md}
        </div>
        <div className="border-r border-r-grey-600 p-2 lg:bg-green-300">
          lg:
          <br />
          &gt;={screens.lg}
        </div>
        <div className="border-r border-r-grey-600 p-2 xl:bg-green-300">
          xl:
          <br />
          &gt;={screens.xl}
        </div>
        <div className="p-2 2xl:bg-green-300">
          2xl:
          <br />
          &gt;={screens["2xl"]}
        </div>
      </div>
      <div className="body-xl-bold p-2 text-center">width: {width}px</div>
      <div className="grid grid-cols-6 bg-grey-300 text-center">
        <div className="border-r border-r-grey-600 p-2 max-sm:bg-green-300">
          max-sm:
          <br />
          &lt;{screens.sm}
        </div>
        <div className="border-r border-r-grey-600 p-2 max-md:bg-green-300">
          max-md:
          <br />
          &lt;{screens.md}
        </div>
        <div className="border-r border-r-grey-600 p-2 max-lg:bg-green-300">
          max-lg:
          <br />
          &lt;{screens.lg}
        </div>
        <div className="border-r border-r-grey-600 p-2 max-xl:bg-green-300">
          max-xl:
          <br />
          &lt;{screens.xl}
        </div>
        <div className="border-r border-r-grey-600 p-2 max-2xl:bg-green-300">
          max-2xl:
          <br />
          &lt;{screens["2xl"]}
        </div>
        <div className="bg-green-300 p-2 text-green-800">
          <i>(out of scope)</i>
        </div>
      </div>
      <div className="p-2 text-center">
        <code>const bp = useBreakpoints();</code>
      </div>
      <hr />
      <div className="grid grid-cols-2">
        <div className="space-y-2 p-2 text-center">
          <div>Button size based on breakpoint:</div>
          <Button size={bp.lg ? "lg" : bp.md ? "md" : "sm"}>
            size = {bp.lg ? "lg" : bp.md ? "md" : "sm"}
          </Button>
        </div>
        <div className="space-y-2 p-2 text-center">
          <div>Button variant based on breakpoint:</div>
          <Button variant={bp.maxMd ? "secondary" : bp.maxLg ? "primary" : "accent"}>
            variant = {bp.maxMd ? "secondary" : bp.maxLg ? "primary" : "accent"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  args: {},
  render,
};
