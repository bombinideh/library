import { ComponentProps } from "react";
import * as Form from "../styles";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  id: string;
  type?: "text" | "email";
}

export default function Input({ id, label, type = "text", ...rest }: InputProps) {
  return (
    <Form.Wrapper>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      <Form.Input id={id} name={id} type={type} {...rest} />
    </Form.Wrapper>
  );
}
