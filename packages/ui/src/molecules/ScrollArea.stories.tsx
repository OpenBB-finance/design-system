import type { Meta, StoryObj } from "@storybook/react";
import ThemedPreview from "~/utils/ThemedPreview";
import { ScrollArea } from "./ScrollArea";

const meta = {
  title: "Molecules/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderVertical: Story["render"] = () => {
  return (
    <ThemedPreview>
      <ScrollArea className="h-40 w-60" type="always">
        <div className="h-96 w-60">Scroll down</div>
      </ScrollArea>
    </ThemedPreview>
  );
};

const renderHorizontal: Story["render"] = () => {
  return (
    <ThemedPreview>
      <ScrollArea className="h-40 w-60" type="always">
        <div className="h-40 w-96">
          <b>WIP! This one might work not correct!</b>
          <br />
          Scroll right
        </div>
      </ScrollArea>
    </ThemedPreview>
  );
};

/* Variants */

export const Vertical: Story = {
  args: {},
  render: renderVertical,
};

export const Horizontal: Story = {
  args: {},
  render: renderHorizontal,
};
