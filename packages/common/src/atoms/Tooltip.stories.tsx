import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "./Tooltip";

const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="p-4">
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  );
};

export const Default: Story = {
  args: {
    content: "You hovered the button",
  },
  render,
};

export const WithArrow: Story = {
  args: {
    content: "You hovered the button",
    arrow: true,
  },
  render,
};

/* Composed */

const renderComposed: Story["render"] = () => {
  return (
    <div className="p-4">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>You hovered the button</TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>
  );
};

export const Composed: Story = {
  // @ts-expect-error we're not using all the args in this story
  args: {},
  render: renderComposed,
};
