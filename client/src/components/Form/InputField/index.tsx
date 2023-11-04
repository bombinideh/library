import Field from "../Field";
import FieldWrapper from "../FieldWrapper";
import { IField } from "../form";

interface InputFieldProps extends Omit<IField, "type"> {
  type?: "text" | "email";
}

const defaultProps: Required<Pick<InputFieldProps, "type">> = {
  type: "text",
};

export default function InputField(receivedProps: InputFieldProps) {
  const { label, id, error, ...rest } = { ...defaultProps, ...receivedProps };

  return (
    <FieldWrapper label={label} id={id} error={error}>
      <Field id={id} error={error} {...rest} />
    </FieldWrapper>
  );
}
