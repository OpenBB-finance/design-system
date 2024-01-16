import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Button } from "../ui";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Dialogs/ConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  const { children, ...rest } = args;
  const trigger = <Button>Open</Button>;

  return (
    <ConfirmDialog trigger={trigger} {...rest}>
      {children}
    </ConfirmDialog>
  );
};

const renderStateful: Story["render"] = (args) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { open: _open = false, onClose, children, ...rest } = args;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(_open);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>

      <ConfirmDialog open={open} onClose={() => setOpen(false)} {...rest}>
        {children}
      </ConfirmDialog>
    </>
  );
};

/* Variants */

export const Stateless: Story = {
  args: {
    title: "Do you really want to delete thing?",
    description: "This action cannot be undone.",
  },
  render,
};

export const Stateful: Story = {
  args: {
    open: true,
    title: "Do you really want to delete thing?",
    description: "This action cannot be undone.",
  },
  render: renderStateful,
};
