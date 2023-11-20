import { FormEventHandler, ReactNode } from "react";
import * as Styled from "./styles";

interface FormProps {
  className?: string;
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  id?: string;
}

export default function Form({ className, children, onSubmit, id }: FormProps) {
  return (
    <Styled.Form className={className} onSubmit={onSubmit} id={id} noValidate>
      {children}
    </Styled.Form>
  );
}
