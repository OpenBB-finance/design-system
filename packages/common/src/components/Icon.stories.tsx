import type { Meta, StoryObj } from "@storybook/react";
import "virtual:svg-icons-register";

import { useMemo } from "react";
import { Icon } from "./Icon";

const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const names = useMemo(() => {
    const res: string[] = [];
    document
      .querySelectorAll("#__svg__icons__dom__ > symbol")
      .forEach((symbol) => {
        const id = (symbol.getAttribute("id") ?? "").replace("icon-", "");
        res.push(id);
      });
    return res.filter(Boolean);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {names.map((name: string) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon {...args} name={name} />
          <span className="text-xs text-grey-300">{name}</span>
        </div>
      ))}
    </div>
  );
};

/* Variants */

export const Primary: Story = {
  render,
};
