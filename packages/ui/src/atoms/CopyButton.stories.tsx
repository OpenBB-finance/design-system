import type { Meta, StoryObj } from "@storybook/react";

import { CopyButton } from "./CopyButton";

const meta = {
  title: "Atoms/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Variants */

export const Primary: Story = {
  args: {
    text: "You were hacked!",
  },
};
