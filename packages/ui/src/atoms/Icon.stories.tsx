import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "~/utils";
import ThemedPreview from "~/utils/ThemedPreview";
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
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-6 md:grid-cols-4">
        {iconNames.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <Icon {...args} name={name} />
            <span className="text-center text-grey-300 text-xs">{name}</span>
          </div>
        ))}
      </div>
    </ThemedPreview>
  );
};

const renderHearts: Story["render"] = (args) => {
  const sizes = ["size-3", "size-4", "size-6", "size-10"];
  const strokes = [
    "stroke-0.5",
    "stroke-1",
    "stroke-1.5",
    "stroke-2",
    "stroke-2.5",
    "stroke-3",
    "stroke-4",
    "stroke-5",
    "[--stroke-width:10]",
  ];
  return (
    <ThemedPreview>
      <div className="grid grid-cols-5 items-center justify-items-center gap-4 stroke-1 stroke-[1.5]">
        <div />
        {sizes.map((size) => (
          <div key={size}>{size}</div>
        ))}
        {strokes.flatMap((stroke) => (
          <Fragment key={stroke}>
            <div className="justify-self-start">{stroke}</div>
            {sizes.map((size) => (
              <Icon key={`${size} ${stroke}`} {...args} className={cn(size, stroke)} />
            ))}
          </Fragment>
        ))}
      </div>
    </ThemedPreview>
  );
};

// @ts-expect-error we're not using all the args in this story
export const Default: Story = { render };

export const SizesAndStrokes: Story = {
  render: renderHearts,
  args: { name: "heart" },
};
