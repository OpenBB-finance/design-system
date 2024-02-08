import type { Meta, StoryObj } from "@storybook/react";
import ThemedPreview from "utils/src/ThemedPreview";
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
    <ThemedPreview>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {iconNames.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon {...args} name={name} />
            <span className="text-center text-xs text-grey-300">{name}</span>
          </div>
        ))}
      </div>
    </ThemedPreview>
  );
};

// @ts-expect-error we're not using all the args in this story
export const Default: Story = { render };
