import type { Meta, StoryObj } from "@storybook/react";

import ThemedPreview from "~/utils/ThemedPreview";
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
    <ThemedPreview>
      <div className="flex items-end gap-4">
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
    </ThemedPreview>
  );
};

const renderSimple: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <Checkbox {...args} />
    </ThemedPreview>
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
  render: renderSimple,
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
  render: renderSimple,
};

export const Error: Story = {
  args: {
    label: "Remember me",
    error: true,
  },
  render: renderSimple,
};
