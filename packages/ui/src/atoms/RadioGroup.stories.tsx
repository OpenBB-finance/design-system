import type { Meta, StoryObj } from "@storybook/react";

import { cn } from "~/utils";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

const meta = {
  title: "Atoms/RadioGroup",
  component: RadioGroupItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <RadioGroup className="flex items-end gap-4 p-4" defaultValue="2">
      <div
        className={cn("flex flex-col items-center gap-4", args.label ? "w-32" : "w-16")}
      >
        <RadioGroupItem {...args} value="1" />
      </div>
      <div
        className={cn("flex flex-col items-center gap-4", args.label ? "w-32" : "w-16")}
      >
        <span className="text-grey-300 text-xs">:checked</span>
        <RadioGroupItem {...args} value="2" />
      </div>
      <div
        className={cn("flex flex-col items-center gap-4", args.label ? "w-32" : "w-16")}
      >
        <span className="text-grey-300 text-xs">:disabled</span>
        <RadioGroupItem {...args} disabled={true} value="3" />
      </div>
      <div
        className={cn("flex flex-col items-center gap-4", args.label ? "w-32" : "w-16")}
      >
        <span className="text-grey-300 text-xs">:focus</span>
        <RadioGroupItem {...args} autoFocus={true} value="4" />
      </div>
    </RadioGroup>
  );
};

/* Variants */

export const Primary: Story = {
  args: {
    value: "",
  },
  render,
};

export const WithLabel: Story = {
  args: {
    ...Primary.args,
    label: "Remember me",
  },
  render,
};

export const MultilineLabel: Story = {
  args: {
    ...Primary.args,
    label: (
      <>
        Remember me
        <br />
        on this computer
      </>
    ),
  },
  render,
};

export const ErrorState: Story = {
  args: {
    ...Primary.args,
    label: "Remember me",
    error: true,
  },
  render,
};
