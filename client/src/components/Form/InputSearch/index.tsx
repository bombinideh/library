import { ChangeEventHandler } from "react";
import FieldWrapper from "../FieldWrapper";
import { IField } from "../form";
import * as Styled from "./styles";

interface InputSearchProps
  extends Pick<IField, "id" | "autoComplete" | "autoFocus"> {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function InputSearch({ id, ...rest }: InputSearchProps) {
  return (
    <FieldWrapper id={id}>
      <Styled.Field id={id} type="search" {...rest} />
    </FieldWrapper>
  );
}
