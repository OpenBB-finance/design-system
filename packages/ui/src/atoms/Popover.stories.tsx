import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "./Popover";

const meta = {
  title: "Atoms/Popover",
  component: PopoverContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="p-4">
      <PopoverRoot {...args}>
        <PopoverTrigger>
          <Button>Click me</Button>
        </PopoverTrigger>
        <PopoverContent>{args.content}</PopoverContent>
      </PopoverRoot>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {
    content: "You hovered the button",
  },
  render,
};
