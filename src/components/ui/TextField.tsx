import { type ReactNode } from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./Form";
import { Input, type InputProps } from "./Input";

interface Props extends Omit<InputProps, "id"> {
  label: ReactNode;
  message?: ReactNode;
}

export function TextField(props: Props) {
  const { error: fieldError } = useFormField();
  const { label, message, error = !!fieldError, ...inputProps } = props;

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input className="bg-grey-900" error={error} {...inputProps} />
      </FormControl>
      <FormMessage>{message}</FormMessage>
    </FormItem>
  );
}

TextField.displayName = "TextField";
