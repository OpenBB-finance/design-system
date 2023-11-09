import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "common";
import { Button } from "./Button";

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
        <span className="text-xs text-grey-300">:disabled</span>
        <Button {...args} disabled />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:focus</span>
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

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Button",
  },
  render,
};

/* Sizes */

export const XtraSmall: Story = {
  args: {
    size: "xs",
    children: "Button",
  },
  render,
};

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

export const IconSize: Story = {
  args: {
    icon: true,
    children: <Icon name="x" className="h-4 w-4" />,
  },
  render,
};
