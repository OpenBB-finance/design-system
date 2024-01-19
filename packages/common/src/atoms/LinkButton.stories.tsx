import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "common";
import { LinkButton } from "./LinkButton";

const meta = {
  title: "Atoms/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="flex items-end gap-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <LinkButton {...args} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:disabled</span>
        <LinkButton {...args} disabled />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:focus</span>
        <LinkButton {...args} autoFocus />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">icon</span>
        <LinkButton variant={args.variant} icon>
          <Icon name="copy" className="h-[18px] w-[18px]" />
        </LinkButton>
      </div>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {
    children: "LinkButton",
  },
  render,
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "LinkButton",
  },
  render,
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "LinkButton",
  },
  render,
};
