import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import type { FC } from "react";
import { z } from "zod";
import ThemedPreview from "~/utils/ThemedPreview";
import { Form, FormField, useForm } from "../molecules/Form";
import { Button } from "./Button";
import type { TextareaProps } from "./Textarea";
import { FormTextarea, Textarea } from "./Textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea as FC<TextareaProps>,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story["render"] = (args) => {
  return (
    <ThemedPreview>
      <div className="w-60 p-4">
        <Textarea label="Full name" {...args} />
      </div>
    </ThemedPreview>
  );
};

const formSchema = z.object({
  name: z.string().min(6).max(50),
  port: z.coerce.number().gte(1).lte(65535),
});

type TForm = z.infer<typeof formSchema>;

const renderInForm: Story["render"] = (args) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: args.defaultValue as string,
    },
  });

  function handleSubmit(values: TForm) {
    console.info("✅ Valid form submitted with values:", values);
  }

  return (
    <ThemedPreview>
      <Form {...form}>
        <form
          className="flex w-60 flex-col gap-4 p-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            name="port"
            control={form.control}
            render={({ field }) => {
              return <FormTextarea {...args} {...field} />;
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ThemedPreview>
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

export const Readonly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
    placeholder: "Muted placeholder",
  },
  render,
};

export const ReadonlyWithValue: Story = {
  args: {
    ...WithValue.args,
    readOnly: true,
  },
  render,
};

export const ResizingCorner: Story = {
  args: {
    ...Default.args,
    className: "resize-y",
    message: "Hint: just add `resize-y` class to make it resizable",
  },
  render,
};

export const Copiable: Story = {
  args: {
    ...WithValue.args,
    defaultValue: "Albus Percival Wulfric Brian Dumbledore",
    copiable: true,
  },
  render,
};

export const DisabledCopiable: Story = {
  args: {
    ...DisabledWithValue.args,
    copiable: true,
  },
  render,
};

export const ReadonlyCopiable: Story = {
  args: {
    ...ReadonlyWithValue.args,
    readOnly: true,
    copiable: true,
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

export const ErrorState: Story = {
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
    label: "Port",
    placeholder: "A number from 1 to 65535",
    message: "Try to submit empty form",
  },
  render: renderInForm,
};
