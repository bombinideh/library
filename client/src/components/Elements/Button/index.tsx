import transientProps from "@/utils/transientProps";
import { ComponentProps, FunctionComponent } from "react";
import * as Styled from "./styles";

export interface ButtonProps extends ComponentProps<"button"> {
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