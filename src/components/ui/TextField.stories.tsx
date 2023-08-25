import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField } from "./Form";
import { TextField } from "./TextField";

const meta = {
  title: "UI/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  name: z.string().min(6).max(50),
});

type TForm = z.infer<typeof formSchema>;

const render: Story["render"] = (args) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function handleSubmit(values: TForm) {
    console.log(`✅ Valid form submitted with values:`, values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return <TextField {...field} {...args} />;
          }}
        />
      </form>
    </Form>
  );
};

/* Variants */

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter name",
    name: "name",
  },
  render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: "Disabled with value",
  },
  render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    value: "short",
    error: true,
    message: "Name must be at least 6 characters long",
  },
  render,
};
