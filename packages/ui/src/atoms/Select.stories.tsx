import type { Meta, StoryObj } from "@storybook/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ThemedPreview from "~/utils/ThemedPreview";
import { Form, FormField, useForm } from "../molecules/Form";
import { Button } from "./Button";
import { Label } from "./Label";
import {
  FormSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="flex items-end gap-4">
        <Select className="w-[180px]" {...args} />
        <Select className="w-[180px]" {...args} label=":disabled" disabled />
        <Select className="w-[180px]" {...args} label=":focus" autoFocus />
      </div>
    </ThemedPreview>
  );
};

/** Example of how to compose select from parts */
function ComposedSelect(args: any) {
  return (
    <div>
      <SelectRoot>
        <Label>{args.label}</Label>
        <SelectTrigger className="w-[180px]" {...args}>
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}

const renderComposed: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="flex items-end gap-4">
        <ComposedSelect {...args} />
        <ComposedSelect {...args} label=":disabled" disabled />
        <ComposedSelect {...args} label=":focused" autoFocus />
      </div>
    </ThemedPreview>
  );
};

const formSchema = z.object({
  theme: z.string().min(1, "This field is required"),
});

type TForm = z.infer<typeof formSchema>;

const renderInForm: Story["render"] = (args) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: args.defaultValue as string,
    },
  });

  function handleSubmit(values: TForm) {
    console.info(`✅ Valid form submitted with values:`, values);
  }

  return (
    <Form {...form}>
      <form
        className="flex w-60 flex-col gap-4 p-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="theme"
          control={form.control}
          render={({ field }) => {
            return <FormSelect {...args} {...field} />;
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

/* Variants */

const options = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] as const;

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Orange", value: "orange" },
      { label: "Pear", value: "pear" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot" },
      { label: "Beetroot", value: "beetroot" },
      { label: "Broccoli", value: "broccoli" },
    ],
  },
] as const;

export const Default: Story = {
  args: { options, label: "Theme", placeholder: "Theme" },
  render,
};

export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    placeholder: "Theme",
  },
  render,
};

export const SizeXS: Story = {
  args: { ...Default.args, size: "xs" },
  render,
};

export const SizeSM: Story = {
  args: { ...Default.args, size: "sm" },
  render,
};

export const SizeLG: Story = {
  args: { ...Default.args, size: "lg" },
  render,
};

export const Error: Story = {
  args: { ...Default.args, message: "This field is required", error: true },
  render,
};

export const Composed: Story = {
  // @ts-expect-error no args required
  args: {},
  render: renderComposed,
};

export const InFormValidation: Story = {
  args: {
    ...Default.args,
    message: "Try to submit empty form",
  },
  render: renderInForm,
};
