import type { Meta, StoryObj } from "@storybook/react";

import { Form } from "./Form";

const meta = {
  title: "UI/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return <Form>olo</Form>;
};

/* Variants */

export const Primary: Story = {
  args: {},
  render,
};
