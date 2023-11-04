import { ChangeEventHandler, FocusEventHandler } from "react";
import { IField } from "../form";
import * as Styled from "./styles";

interface FieldProps extends Omit<IField, "label"> {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export default function Field(props: FieldProps) {
  const { registration, error, onChange, onBlur, ...rest } = props;

  return (
    <Styled.Input
      name={registration.name}
      ref={registration.ref}
      onChange={event => {
        registration.onChange(event);
        if (onChange) onChange(event);
      }}
      onBlur={event => {
        registration.onBlur(event);
        if (onBlur) onBlur(event);
      }}
      $error={!!error}
      {...rest}
    />
  );
}
