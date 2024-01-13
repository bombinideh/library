import SVGSpinner from "@/assets/spinner.svg?react";
import transientProps from "@/utils/transientProps";
import { DefaultTheme } from "styled-components";
import * as Styled from "./styles";

export interface SpinnerProps {
  size?: string;
  padding?: string;
  color?: keyof DefaultTheme["colors"];
}

const defaultProps = {
  size: "24px",
  padding: "0",
  color: "textSupport1",
};

export default function Spinner(props: SpinnerProps) {
  const { size, padding, color } = { ...defaultProps, ...props };

  return (
    <Styled.Wrapper {...transientProps({ size, padding, color })}>
      <SVGSpinner aria-label="Carregando..." />
    </Styled.Wrapper>
  );
}
