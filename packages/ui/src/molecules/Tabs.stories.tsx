import type { Meta, StoryObj } from "@storybook/react";
import ThemedPreview from "~/utils/ThemedPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <Tabs defaultValue="1" variant={args.variant}>
        <TabsList>
          <TabsTrigger value="1">Tab 1</TabsTrigger>
          <TabsTrigger value="2">Tab 2</TabsTrigger>
          <TabsTrigger value="3">Tab 3</TabsTrigger>
        </TabsList>
        <div className="bg-grey-100 p-4 dark:bg-dark-700">
          <TabsContent value="1">Tab 1 content</TabsContent>
          <TabsContent value="2">Tab 2 content</TabsContent>
          <TabsContent value="3">Tab 3 content</TabsContent>
        </div>
      </Tabs>
    </ThemedPreview>
  );
};

/* Variants */

export const Default: Story = {
  args: {},
  render,
};

export const Filled: Story = {
  args: { variant: "filled" },
  render,
};
