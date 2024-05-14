import type { Meta, StoryObj } from "@storybook/react";

import { GhostButton } from "./GhostButton";
import { Icon } from "./Icon";

const meta = {
  title: "Atoms/GhostButton",
  component: GhostButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GhostButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="flex items-end gap-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <GhostButton {...args} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-grey-300 text-xs">:disabled</span>
        <GhostButton {...args} disabled={true} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-grey-300 text-xs">:focus</span>
        <GhostButton {...args} autoFocus={true} />
      </div>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {
    children: "GhostButton",
  },
  render,
};

/* Sizes */

export const XtraSmall: Story = {
  args: {
    size: "xs",
    children: "GhostButton",
  },
  render,
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "GhostButton",
  },
  render,
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "GhostButton",
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
