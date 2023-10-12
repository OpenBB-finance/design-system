import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta = {
  title: "UI/RadioGroup",
  component: RadioGroupItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <RadioGroup className="flex items-end gap-4" defaultValue="2">
      <div className="flex w-16 flex-col items-center gap-4">
        <RadioGroupItem {...args} value="1" />
      </div>
      <div className="flex w-16 flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:checked</span>
        <RadioGroupItem {...args} value="2" />
      </div>
      <div className="flex w-16 flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:disabled</span>
        <RadioGroupItem {...args} disabled value="3" />
      </div>
      <div className="flex w-16 flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:focus</span>
        <RadioGroupItem {...args} autoFocus value="4" />
      </div>
    </RadioGroup>
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
