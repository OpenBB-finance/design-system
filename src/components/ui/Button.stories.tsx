import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-4">
        <Button {...args} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">disabled</span>
        <Button {...args} disabled />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">focused</span>
        <Button {...args} autoFocus />
      </div>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {
    children: "Button",
  },
  render,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
  render,
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
  render,
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
  render,
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
  render,
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
  render,
};

/* Sizes */

export const Small: Story = {
  args: {
    size: "sm",
    children: "Button",
  },
  render,
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Button",
  },
  render,
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: "!",
  },
  render,
};
