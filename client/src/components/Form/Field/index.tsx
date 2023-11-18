import { ChangeEventHandler, FocusEventHandler } from "react";
import { IField } from "../form";
import * as Styled from "./styles";

interface FieldProps extends Omit<IField, "label"> {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export default function Field(props: FieldProps) {
  const { id, registration, error, onChange, onBlur, disabled, ...rest } = props;

  return (
    <Styled.Input
      {...(registration
        ? { name: registration.name, ref: registration.ref }
        : { name: id })}
      id={id}
      onChange={event => {
        registration?.onChange(event);
        if (onChange) onChange(event);
      }}
      onBlur={event => {
        registration?.onBlur(event);
        if (onBlur) onBlur(event);
      }}
      $error={!!error}
      {...(disabled && { disabled })}
      {...rest}
    />
  );
}
