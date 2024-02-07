import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Checkbox, FormSelect } from "common";
import ThemedPreview from "utils/src/ThemedPreview";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, useForm } from "./Form";
import { FormInput } from "./Input";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3 (disabled)", disabled: true },
];

const meta = {
  title: "Molecules/Form",
  // component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

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
  });

  function handleSubmit(values: TForm) {
    console.log(`✅ Valid form submitted with values:`, values);
  }

  return (
    <ThemedPreview>
      <Form {...form}>
        <form
          className="flex w-[600px] flex-col gap-4 p-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid grid-cols-3 gap-4">
            <FormField
              name="input1"
              render={({ field }) => {
                return <FormInput label="Just an empty input" {...field} />;
              }}
            />
            <FormField
              name="input2"
              render={({ field }) => {
                return (
                  <FormInput
                    label="Just an input"
                    placeholder="Placeholder is here"
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="input3"
              render={({ field }) => {
                return (
                  <FormInput
                    label="Just an input"
                    defaultValue="With value"
                    {...field}
                  />
                );
              }}
            />

            <FormField
              name="input4"
              render={({ field }) => {
                return (
                  <FormInput label="This one is disabled" disabled {...field} />
                );
              }}
            />
            <FormField
              name="input5"
              render={({ field }) => {
                return (
                  <FormInput
                    label="This one is disabled"
                    placeholder="Placeholder is here"
                    disabled
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="input6"
              render={({ field }) => {
                return (
                  <FormInput
                    label="This one is disabled"
                    defaultValue="With value"
                    disabled
                    {...field}
                  />
                );
              }}
            />
          </div>

          <div />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              name="select1"
              render={({ field }) => {
                return (
                  <FormSelect
                    label="Just an empty select"
                    options={options}
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="select2"
              render={({ field }) => {
                return (
                  <FormSelect
                    label="Just a select"
                    placeholder="Placeholder is here"
                    options={options}
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="select3"
              render={({ field }) => {
                return (
                  <FormSelect
                    label="Just a select"
                    defaultValue="2"
                    options={options}
                    {...field}
                  />
                );
              }}
            />

            <FormField
              name="select4"
              render={({ field }) => {
                return (
                  <FormSelect
                    label="This one is disabled"
                    options={options}
                    disabled
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="select5"
              render={({ field }) => {
                return (
                  <FormSelect
                    label="This one is disabled"
                    placeholder="Placeholder is here"
                    options={options}
                    disabled
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="select6"
              render={({ field }) => {
                return (
                  <FormSelect
                    label="This one is disabled"
                    defaultValue="2"
                    options={options}
                    disabled
                    {...field}
                  />
                );
              }}
            />
          </div>

          <div />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="checkbox1"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox label="Unchecked checkbox" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="checkbox2"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        label="Checked checkbox"
                        defaultChecked
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />

            <FormField
              name="checkbox3"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox label="Disabled checkbox" disabled {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="checkbox4"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        label="Disabled checked checkbox"
                        defaultChecked
                        disabled
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <div />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ThemedPreview>
  );
};

/* Variants */

export const Test: Story = {
  render,
};
