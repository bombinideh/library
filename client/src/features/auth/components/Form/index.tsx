import { ReactNode } from "react";
import * as Styled from "./styles";

interface FormProps {
  children: ReactNode;
}

export default function Form({ children }: FormProps) {
  return <Styled.Form>{children}</Styled.Form>;
}
