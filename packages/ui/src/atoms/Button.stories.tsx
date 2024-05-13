import type { Meta, StoryObj } from "@storybook/react";
import ThemedPreview from "~/utils/ThemedPreview";
import { Button } from "./Button";
import { Icon } from "./Icon";

const meta = {
  title: "Atoms/Button",
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
    <ThemedPreview>
      <div className="flex items-end gap-4">
        <div className="flex flex-col items-center gap-4">
          <Button {...args} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">:disabled</span>
          <Button {...args} disabled={true} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">:focus</span>
          <Button {...args} autoFocus={true} />
        </div>
      </div>
    </ThemedPreview>
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

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Button",
  },
  render,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Button",
  },
  render,
};

export const Danger: Story = {
  args: {
    variant: "danger",
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

export const XtraLarge: Story = {
  args: {
    size: "xl",
    children: "Button",
  },
  render,
};

export const Loading: Story = {
  args: {
    size: "xl",
    loading: true,
    children: "Button",
  },
  render,
};

export const IconSize: Story = {
  args: {
    icon: true,
    children: <Icon name="x" className="size-4" />,
  },
  render,
};
