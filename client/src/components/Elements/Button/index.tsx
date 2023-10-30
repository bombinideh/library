import transientProps from "@/utils/transientProps";
import { FunctionComponent } from "react";
import * as Styled from "./styles";

export interface ButtonProps {
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "support";
  SVG?: FunctionComponent;
  text: string;
  align: "left" | "center" | "right";
}

const defaultProps: Required<Pick<ButtonProps, "type" | "variant">> = {
  variant: "primary",
  type: "button",
};

export default function Button(props: ButtonProps) {
  const { type, variant, SVG, text, align } = { ...defaultProps, ...props };

  return (
    <Styled.Wrapper type={type} {...transientProps({ variant, align })}>
      {SVG && <SVG />} {text}
    </Styled.Wrapper>
  );
}
