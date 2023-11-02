import { FormEventHandler, ReactNode } from "react";
import * as Styled from "./styles";

interface FormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <Styled.Form onSubmit={onSubmit} noValidate>
      {children}
    </Styled.Form>
  );
}
