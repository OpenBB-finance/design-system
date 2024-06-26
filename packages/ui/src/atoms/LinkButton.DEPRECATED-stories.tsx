import type { Meta, StoryObj } from "@storybook/react";

import ThemedPreview from "~/utils/ThemedPreview";
import { Icon } from "./Icon";
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
    <ThemedPreview>
      <div className="flex items-end gap-4 p-4">
        <div className="flex flex-col items-center gap-4">
          <LinkButton {...args} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">:disabled</span>
          <LinkButton {...args} disabled={true} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">:focus</span>
          <LinkButton {...args} autoFocus={true} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">icon</span>
          <LinkButton variant={args.variant} icon={true}>
            <Icon name="copy" className="h-[18px] w-[18px]" />
          </LinkButton>
        </div>
      </div>
    </ThemedPreview>
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
