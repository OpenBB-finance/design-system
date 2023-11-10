import type * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "utils";
import { Label } from "./Label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};
FormField.displayName = "FormField";

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}
const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    const id = React.useId();
    const classNames = cn("group space-y-1", className);

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={classNames} {...rest} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return (
    <Label ref={ref} className={className} htmlFor={formItemId} {...props} />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}
/** Shows validation error or children content by default */
const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    const elementClasses = cn(
      "body-xs-regular",
      error && "text-danger-500",
      className,
    );

    return (
      <span ref={ref} id={formMessageId} className={elementClasses} {...rest}>
        {body}
      </span>
    );
  },
);
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
