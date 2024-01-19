import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Atoms/Select",
  component: SelectTrigger,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

function SelectComponent(args: any) {
  return (
    <div className="p-4">
      <Select>
        <SelectTrigger className="w-[180px]" {...args}>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

const render: Story["render"] = (args) => {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-4">
        <SelectComponent {...args} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:disabled</span>
        <SelectComponent {...args} disabled />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-xs text-grey-300">:focus</span>
        <SelectComponent {...args} autoFocus />
      </div>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {},
  render,
};

export const SizeXS: Story = {
  args: { size: "xs" },
  render,
};

export const SizeSM: Story = {
  args: { size: "sm" },
  render,
};

export const SizeLG: Story = {
  args: { size: "lg" },
  render,
};
