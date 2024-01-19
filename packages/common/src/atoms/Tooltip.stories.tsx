import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta = {
  title: "Atoms/Tooltip",
  component: TooltipContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>You hovered the button</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/* Variants */

export const Primary: Story = {
  render,
};
