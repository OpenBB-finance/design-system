import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "common";
import { z } from "zod";
import { Form, FormField, useForm } from "./Form";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

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
      name: (args.defaultValue as string) ?? "",
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
            return <Input {...field} {...args} />;
          }}
        />
      </form>
    </Form>
  );
};

/* Variants */

export const Default: Story = {
  args: {
    label: "Full name",
    placeholder: "Enter name",
    message: "Name should contain first and last name",
  },
  render,
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    defaultValue: "Albus Percival Wulfric Brian Dumbledore",
  },
  render,
};

export const Focus: Story = {
  args: {
    ...Default.args,
    autoFocus: true,
  },
  render,
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    placeholder: "Muted placeholder",
  },
  render,
};

export const DisabledWithValue: Story = {
  args: {
    ...Default.args,
    disabled: true,
    defaultValue: "Muted text",
  },
  render,
};

export const Password: Story = {
  args: {
    defaultValue: "Password",
    type: "password",
    clearable: false,
  },
  render,
};

export const PrefixAndSuffix: Story = {
  args: {
    ...Default.args,
    prefix: <Icon name="calendar" className="h-4 w-4" />,
    suffix: <Icon name="calendar" className="h-4 w-4" />,
  },
  render,
};

export const DatePicker: Story = {
  args: {
    type: "date",
    label: "Date of birth",
    defaultValue: "2019-03-12",
  },
  render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    defaultValue: "Wrong",
  },
  render,
};
