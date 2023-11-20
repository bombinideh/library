import transientProps from "@/utils/transientProps";
import { HTMLMotionProps, m } from "framer-motion";
import * as Styled from "./styles";

export type Level = 1 | 2 | 3 | 4;
export type Heading = `h${Level}`;

export interface TitleProps extends HTMLMotionProps<Heading> {
  className?: string;
  level: Level;
  text: string;
  weight?: 400 | 500 | 700;
  align?: "left" | "center" | "right";
  headingElement?: Heading;
  title?: string;
}

export type TitleDefaultProps = Required<Pick<TitleProps, "weight" | "align">>;

const defaultProps: TitleDefaultProps = {
  weight: 500,
  align: "left",
};

export default function Title(props: TitleProps) {
  const { className, level, text, weight, align, headingElement, ...rest } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Styled.Wrapper
      className={className}
      {...(headingElement && { as: m[headingElement] })}
      {...transientProps({ level, weight, align })}
      {...rest}
    >
      {text}
    </Styled.Wrapper>
  );
}
