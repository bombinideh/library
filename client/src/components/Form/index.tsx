import { FormEventHandler, ReactNode } from "react";
import * as Styled from "./styles";

interface FormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  id?: string;
}

export default function Form({ children, onSubmit, id }: FormProps) {
  return (
    <Styled.Form onSubmit={onSubmit} id={id} noValidate>
      {children}
    </Styled.Form>
  );
}
