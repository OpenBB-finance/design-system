import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Icon } from "common";
import { z } from "zod";
import { Form, FormField, useForm } from "./Form";
import { FormInput, Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <div className="w-60 p-4">
      <Input label="Full name" {...args} />
    </div>
  );
};

const formSchema = z.object({
  name: z.string().min(6).max(50),
});

type TForm = z.infer<typeof formSchema>;

const renderInForm: Story["render"] = (args) => {
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
      <form
        className="flex w-60 flex-col gap-4 p-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return <FormInput {...args} {...field} />;
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

/* Variants */

export const Default: Story = {
  args: {
    label: "Full name",
    placeholder: "Enter name",
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
    ...WithValue.args,
    disabled: true,
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

export const Message: Story = {
  args: {
    ...Default.args,
    message: "Info message is here",
  },
  render,
};

export const Error: Story = {
  args: {
    ...Default.args,
    defaultValue: "Wrong",
    message: "Something went wrong",
    error: true,
  },
  render,
};

export const InFormValidation: Story = {
  args: {
    ...Default.args,
    label: "Full name",
    message: "Try to submit empty form",
  },
  render: renderInForm,
};
