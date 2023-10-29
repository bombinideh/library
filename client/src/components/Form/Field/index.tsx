import { ComponentProps } from "react";
import * as Form from "../styles";

interface FieldProps extends ComponentProps<"input"> {
  label: string;
  id: string;
  type?: "text" | "email";
}

export default function Field({ id, label, type = "text", ...rest }: FieldProps) {
  return (
    <Form.Wrapper>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      <Form.Input id={id} name={id} type={type} {...rest} />
    </Form.Wrapper>
  );
}
