import transientProps from "@/utils/transientProps";
import { ComponentProps, FunctionComponent, forwardRef } from "react";
import * as Styled from "./styles";
import { DefaultTheme } from "styled-components";

export interface ButtonProps {
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "support" | "danger";
  SVG?: {
    Component?: FunctionComponent;
    element?: string;
    shape?: string;
    color?: keyof DefaultTheme["colors"];
  };
  text?: string;
  align?: "left" | "center" | "right";
}

type ButtonComponentProps = ButtonProps & ComponentProps<"button">;

export type ButtonDefaultProps = Required<ButtonProps> & {
  SVG: Omit<Required<NonNullable<ButtonProps["SVG"]>>, "Component" | "color">;
};

const defaultProps: ButtonDefaultProps = {
  variant: "primary",
  type: "button",
  SVG: {
    element: "path",
    shape: "stroke",
  },
  text: "",
  align: "left",
};

const Button = forwardRef<HTMLButtonElement, ButtonComponentProps>((props, ref) => {
  const { children, type, variant, SVG, text, align, ...rest } = {
    ...defaultProps,
    ...props,
    SVG: {
      ...defaultProps.SVG,
      ...props.SVG,
    },
  };

  return (
    <Styled.Wrapper
      type={type}
      $SVGElement={SVG.element}
      $SVGShape={SVG.shape}
      $SVGColor={SVG.color}
      {...transientProps({ variant, align })}
      {...rest}
      ref={ref}
    >
      {SVG.Component && <SVG.Component />}
      {text && <span>{text}</span>}
      {children}
    </Styled.Wrapper>
  );
});

export default Button;
