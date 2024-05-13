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
          <span className="text-grey-300 text-xs">:checked</span>
          <Checkbox {...args} checked={true} />
        </div>
        <div className="flex w-16 flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">:disabled</span>
          <Checkbox {...args} disabled={true} />
        </div>
        <div className="flex w-16 flex-col items-center gap-4">
          <span className="text-grey-300 text-xs">:focus</span>
          <Checkbox {...args} autoFocus={true} />
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

export const ErrorState: Story = {
  args: {
    label: "Remember me",
    error: true,
  },
  render: renderSimple,
};
