import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "common";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Variants */

export const Default: Story = {
  args: {
    placeholder: "Enter name",
  },
};

export const Focus: Story = {
  args: {
    autoFocus: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Muted placeholder",
  },
};

export const DisabledWithValue: Story = {
  args: {
    disabled: true,
    value: "Muted text",
  },
};

export const WithValue: Story = {
  args: {
    value: "Albus Percival Wulfric Brian Dumbledore",
  },
};

export const Password: Story = {
  args: {
    value: "Password",
    type: "password",
    clearable: false,
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    prefix: <Icon name="calendar" className="h-4 w-4" />,
    suffix: <Icon name="calendar" className="h-4 w-4" />,
  },
};

export const Error: Story = {
  args: {
    value: "Wrong input",
    error: true,
  },
};
