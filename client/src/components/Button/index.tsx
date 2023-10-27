import { ComponentProps, FunctionComponent } from "react";
import * as Styled from "./styles";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "support";
  SVG?: FunctionComponent;
  text: string;
}

export default function Button({ variant = "primary", SVG, text }: ButtonProps) {
  return (
    <Styled.Wrapper type="button" $variant={variant}>
      {SVG && <SVG />} {text}
    </Styled.Wrapper>
  );
}
