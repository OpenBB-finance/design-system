import type { Meta, StoryObj } from "@storybook/react";

import ThemedPreview from "utils/src/ThemedPreview";
import { Tag } from "./Tag";

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="flex justify-center gap-4">
        <Tag {...args} />
      </div>
    </ThemedPreview>
  );
};

const allColors = [
  "grey",
  "success",
  "warning",
  "danger",
  "light-blue",
  "ruby",
  "purple",
  "yellow",
  "dark-blue",
  "burgundy",
] as const;

const renderAllColors: Story["render"] = (args) => {
  return (
    <ThemedPreview className="flex flex-row">
      <div className="flex flex-col items-center gap-6">
        {allColors.map((color) => (
          <Tag {...args} color={color} key={color} />
        ))}
      </div>
    </ThemedPreview>
  );
};

/* Variants */

export const Default: Story = {
  args: {
    children: "Tag Label",
    color: "success",
  },
  render,
};

export const AllColors: Story = {
  args: {
    children: "Tag Label",
  },
  render: renderAllColors,
};
