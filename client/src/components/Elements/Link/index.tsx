import { FunctionComponent } from "react";
import * as Styled from "./styles";

export interface LinkProps {
  className?: string;
  SVG?: FunctionComponent;
  text: string;
  to: string;
  align?: "left" | "center" | "right";
}

export default function Link({
  className,
  SVG,
  text,
  to,
  align = "left",
}: LinkProps) {
  return (
    <Styled.Wrapper className={className} to={to} $align={align}>
      {SVG && <SVG />}
      {text}
    </Styled.Wrapper>
  );
}
