import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

const meta = {
  title: "Atoms/Alert",
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
    children: {
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  const { variant, title, children } = args;
  return (
    <Alert variant={variant} title={title} onClose={true}>
      {children}
    </Alert>
  );
};

/* Variants */

export const Success: Story = {
  args: {
    variant: "success",
    title: "Something went good",
    children: "Operation completed successfully",
  },
  render,
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Something went wrong",
    children: "Please try again later",
  },
  render,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Something need your attention",
    children: "Please check your input",
  },
  render,
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Something you need to know",
    children: "Please read carefully",
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
