import type { Meta, StoryObj } from "@storybook/react";

import ThemedPreview from "utils/src/ThemedPreview";
import { Label } from "./Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="flex items-end gap-4">
        <Select className="w-[180px]" {...args} />
        <Select className="w-[180px]" {...args} label=":disabled" disabled />
        <Select className="w-[180px]" {...args} label=":focus" autoFocus />
      </div>
    </ThemedPreview>
  );
};

/** Example of how to compose select from parts */
function CompositedSelect(args: any) {
  return (
    <div>
      <SelectRoot>
        {args.label && <Label>{args.label}</Label>}
        <SelectTrigger className="w-[180px]" {...args}>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}

const renderComposited: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="flex items-end gap-4">
        <CompositedSelect {...args} />
        <CompositedSelect {...args} label=":disabled" disabled />
        <CompositedSelect {...args} label=":focused" autoFocus />
      </div>
    </ThemedPreview>
  );
};

/* Variants */

const options = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Orange", value: "orange" },
      { label: "Pear", value: "pear" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot" },
      { label: "Beetroot", value: "beetroot" },
      { label: "Broccoli", value: "broccoli" },
    ],
  },
];

export const Primary: Story = {
  args: { options, placeholder: "Theme" },
  render,
};

export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    placeholder: "Theme",
  },
  render,
};

export const SizeXS: Story = {
  args: { ...Primary.args, size: "xs" },
  render,
};

export const SizeSM: Story = {
  args: { ...Primary.args, size: "sm" },
  render,
};

export const SizeLG: Story = {
  args: { ...Primary.args, size: "lg" },
  render,
};

export const Error: Story = {
  args: { ...Primary.args, message: "This field is required", error: true },
  render,
};

export const Composited: Story = {
  // @ts-expect-error no args required
  args: {},
  render: renderComposited,
};
