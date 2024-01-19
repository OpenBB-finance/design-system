import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

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
      <Popover {...args}>
        <PopoverTrigger>
          <Button>Click me</Button>
        </PopoverTrigger>
        <PopoverContent>You clicked the button</PopoverContent>
      </Popover>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  render,
};
