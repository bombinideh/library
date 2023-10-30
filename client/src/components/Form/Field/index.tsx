import { UseFormRegisterReturn } from "react-hook-form";
import * as Form from "../styles";

interface FieldProps {
  label: string;
  id: string;
  type?: "text" | "email";
  registration: UseFormRegisterReturn;
  autoComplete?: string;
  autoFocus?: boolean;
}

const defaultProps: Required<Pick<FieldProps, "type">> = {
  type: "text",
};

export default function Field(props: FieldProps) {
  const { label, id, type, registration, ...rest } = { ...defaultProps, ...props };

  return (
    <Form.Wrapper>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      <Form.Input id={id} type={type} {...registration} {...rest} />
    </Form.Wrapper>
  );
}
