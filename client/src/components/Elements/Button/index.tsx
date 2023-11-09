import transientProps from "@/utils/transientProps";
import { FunctionComponent } from "react";
import * as Styled from "./styles";

interface ButtonProps {
  className?: string;
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "support";
  SVG?: {
    Component?: FunctionComponent;
    element?: string;
    shape?: string;
  };
  text?: string;
  align?: "left" | "center" | "right";
}

export type ButtonDefaultProps = Omit<Required<ButtonProps>, "className"> & {
  SVG: Omit<Required<NonNullable<ButtonProps["SVG"]>>, "Component">;
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

export default function Button(props: ButtonProps) {
  const { className, type, variant, SVG, text, align } = {
    ...defaultProps,
    ...props,
    SVG: {
      ...defaultProps.SVG,
      ...props.SVG,
    },
  };

  return (
    <Styled.Wrapper
      className={className}
      type={type}
      $SVGElement={SVG.element}
      $SVGShape={SVG.shape}
      {...transientProps({ variant, align })}
    >
      {SVG.Component && <SVG.Component />}
      {text && text}
    </Styled.Wrapper>
  );
}
