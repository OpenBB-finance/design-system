import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "common";
import { sleep } from "utils";

import { Popover } from "./Popover";

interface Props {
  text: string;
  className?: string;
}

export function CopyButton(props: Props) {
  const { text, className } = props;

  const [open, setOpen] = useState(false);

  async function handleClick() {
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
      <button
        type="button"
        className={twMerge(
          "BB-CopyButton rounded-md bg-grey-850/50 p-2 text-foreground backdrop-blur-sm",
          "hover:bg-grey-800 hover:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "transition",
          className,
        )}
        onClick={handleClick}
      >
        <Icon name="copy" className="h-4 w-4" />
      </button>
    </Popover>
  );
}
CopyButton.displayName = "CopyButton";
