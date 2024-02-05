import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "../icons/icons";
import { Icon } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon {...args} name={name} />
          <span className="text-xs text-grey-300">{name}</span>
        </div>
      ))}
    </div>
  );
};

// @ts-expect-error we're not using all the args in this story
export const Default: Story = { render };
