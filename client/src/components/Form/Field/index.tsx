import * as Form from "../styles";

interface FieldProps {
  label: string;
  id: string;
  type?: "text" | "email";
  autoComplete?: string;
  autoFocus?: boolean;
}

export default function Field({ id, label, type = "text", ...rest }: FieldProps) {
  return (
    <Form.Wrapper>
      <Form.Label htmlFor={id}>{label}</Form.Label>

      <Form.Input id={id} name={id} type={type} {...rest} />
    </Form.Wrapper>
  );
}
