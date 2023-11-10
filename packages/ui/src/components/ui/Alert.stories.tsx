import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "error"],
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    description: {
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  const { variant, title, description } = args;
  return (
    <Alert variant={variant} title={title} onClose={true}>
      {description}
    </Alert>
  );
};

/* Variants */

export const Success: Story = {
  args: {
    variant: "success",
    title: "Something went good",
    description: "Operation completed successfully",
  },
  render,
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Something went wrong",
    description: "Please try again later",
  },
  render,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Something need your attention",
    description: "Please check your input",
  },
  render,
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Something you need to know",
    description: "Please read carefully",
  },
  render,
};

/* Params */

// TODO: implement
// export const Closable: Story = {
//   args: {
//     ...Success.args,
//     onClose: () => {},
//   },
//   render,
// };
