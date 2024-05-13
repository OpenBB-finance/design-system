import type { Meta, StoryObj } from "@storybook/react";
import ThemedPreview from "~/utils/ThemedPreview";
import { Avatar } from "./Avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Test */

const sizes = ["xs", "sm", "md", "lg"] as const;
const src = "https://avatars.githubusercontent.com/u/80064875?s=200&v=4";

const renderTest: Story["render"] = () => {
  return (
    <ThemedPreview>
      <div className="grid grid-cols-4 gap-4">
        {sizes.map((size) => (
          <div className="flex h-full items-center justify-center" key={size}>
            <Avatar size={size} src={src} fallback="AA" />
          </div>
        ))}
        {sizes.map((size) => (
          <div className="flex h-full items-center justify-center" key={size}>
            <Avatar size={size} fallback="AA" className="bg-accent-100 text-black" />
          </div>
        ))}
        {sizes.map((size) => (
          <div className="flex h-full items-center justify-center" key={size}>
            <Avatar size={size} />
          </div>
        ))}
      </div>
    </ThemedPreview>
  );
};

export const Test: Story = {
  render: renderTest,
};

/* Component */

const render: Story["render"] = (args) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Avatar {...args} />
    </div>
  );
};

export const Default: Story = {
  args: {
    src,
    alt: "OpenBB",
  },
  render,
};

export const Fallback: Story = {
  args: {
    src: "https://openbb.co/", // invalid or undefined src
    fallback: "AA",
    size: "lg",
  },
  render,
};

export const Icon: Story = {
  args: {
    icon: "code",
    size: "lg",
  },
  render,
};
