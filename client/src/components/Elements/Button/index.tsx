import transientProps from "@/utils/transientProps";
import { FunctionComponent } from "react";
import * as Styled from "./styles";

export interface ButtonProps {
  variant?: "primary" | "support";
  SVG?: FunctionComponent;
  text: string;
  align: "left" | "center" | "right";
}

export default function Button({
  variant = "primary",
  SVG,
  text,
  align,
}: ButtonProps) {
  return (
    <Styled.Wrapper type="button" {...transientProps({ variant, align })}>
      {SVG && <SVG />} {text}
    </Styled.Wrapper>
  );
}
