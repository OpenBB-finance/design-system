import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="flex items-end gap-4 p-4">
      <div className="flex w-16 flex-col items-center gap-4">
        <Checkbox {...args} />
      </div>
      <div className="flex w-16 flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:checked</span>
        <Checkbox {...args} checked />
      </div>
      <div className="flex w-16 flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:disabled</span>
        <Checkbox {...args} disabled />
      </div>
      <div className="flex w-16 flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:focus</span>
        <Checkbox {...args} autoFocus />
      </div>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {},
  render,
};

export const WithLabel: Story = {
  args: {
    label: "Remember me",
  },
};

export const MultilineLabel: Story = {
  args: {
    label: (
      <>
        Remember me
        <br />
        on this computer
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    label: "Remember me",
    error: true,
  },
};
