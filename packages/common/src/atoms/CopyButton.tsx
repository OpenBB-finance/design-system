import { useState } from "react";

import type { ButtonProps } from "common";
import { Button, Icon } from "common";
import { sleep } from "utils";

import { Popover } from "./Popover";

interface Props extends ButtonProps {
  text: string;
}

export function CopyButton(props: Props) {
  const { text, onClick, ...buttonProps } = props;

  const [open, setOpen] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
      await sleep(1000);
      setOpen(false);
    } catch (err) {
      console.error("CopyButton error:", err);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen} content="Copied">
      <Button
        size="sm"
        variant="secondary"
        icon
        {...buttonProps}
        onClick={handleClick}
      >
        <Icon name="copy-03" />
      </Button>
    </Popover>
  );
}
CopyButton.displayName = "CopyButton";
