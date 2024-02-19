import type { Meta, StoryObj } from "@storybook/react";
import { waitFor, within } from "@storybook/testing-library";
import { useState } from "react";

import { sleep } from "utils";
import { Button } from "../atoms";
import { ConfirmDialog } from "./ConfirmDialog";

const meta = {
  title: "Molecules/ConfirmDialog",
  component: ConfirmDialog,
  parameters: {
    layout: "centered",
    chromatic: { delay: 1000 },
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
    onConfirm: () => console.log("Confirmed!"),
  },
  render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);
    const button = canvas.getByRole("button", { name: "Open" });
    button.click();
    await waitFor(() => canvas.getByRole("dialog"));
    await sleep(500);
  },
};

export const Stateful: Story = {
  args: {
    open: true,
    ...Stateless.args,
  },
  render: renderStateful,
  parameters: { chromatic: { delay: 500 } },
};
