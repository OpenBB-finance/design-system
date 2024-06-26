import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react";

import { z } from "zod";
import { FormTextarea } from "~/atoms/Textarea";
import ThemedPreview from "~/utils/ThemedPreview";
import { Button } from "../atoms/Button";
import { Checkbox } from "../atoms/Checkbox";
import { FormInput } from "../atoms/Input";
import { FormSelect } from "../atoms/Select";
import { Form, FormControl, FormField, FormItem, useForm } from "./Form";

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

const render: Story["render"] = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(values: TForm) {
    console.info("✅ Valid form submitted with values:", values);
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
                  <FormInput label="This one is disabled" disabled={true} {...field} />
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
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
                    disabled={true}
                    {...field}
                  />
                );
              }}
            />
          </div>

          <div />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              name="textarea1"
              render={({ field }) => {
                return <FormTextarea label="Just an empty textarea" {...field} />;
              }}
            />
            <FormField
              name="textarea2"
              render={({ field }) => {
                return (
                  <FormTextarea
                    label="Just an textarea"
                    placeholder="Placeholder is here"
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="textarea3"
              render={({ field }) => {
                return (
                  <FormTextarea
                    label="Just an textarea"
                    defaultValue="With value"
                    {...field}
                  />
                );
              }}
            />

            <FormField
              name="textarea4"
              render={({ field }) => {
                return (
                  <FormTextarea
                    label="This one is disabled"
                    disabled={true}
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="textarea5"
              render={({ field }) => {
                return (
                  <FormTextarea
                    label="This one is disabled"
                    placeholder="Placeholder is here"
                    disabled={true}
                    {...field}
                  />
                );
              }}
            />
            <FormField
              name="textarea6"
              render={({ field }) => {
                return (
                  <FormTextarea
                    label="This one is disabled"
                    defaultValue="With value"
                    disabled={true}
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
                        defaultChecked={true}
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
                      <Checkbox label="Disabled checkbox" disabled={true} {...field} />
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
                        defaultChecked={true}
                        disabled={true}
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
