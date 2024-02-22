import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Atoms/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">Tab 1</TabsTrigger>
          <TabsTrigger value="2">Tab 2</TabsTrigger>
          <TabsTrigger value="3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="1">Tab 1 content</TabsContent>
        <TabsContent value="2">Tab 2 content</TabsContent>
        <TabsContent value="3">Tab 3 content</TabsContent>
      </Tabs>
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  args: {},
  render,
};
