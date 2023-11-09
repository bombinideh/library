import transientProps from "@/utils/transientProps";
import * as Styled from "./styles";

export interface TitleProps {
  level: 1 | 2 | 3 | 4;
  text: string;
  weight?: 400 | 500 | 700;
  align?: "left" | "center" | "right";
  isHeadingElement?: boolean;
}

export type TitleDefaultProps = Required<Omit<TitleProps, "level" | "text">>;

const defaultProps: TitleDefaultProps = {
  weight: 500,
  align: "left",
  isHeadingElement: true,
};

export default function Title(props: TitleProps) {
  const { level, text, weight, align, isHeadingElement } = {
    ...defaultProps,
    ...props,
  };

  return (
    <Styled.Wrapper
      {...(isHeadingElement && { as: `h${level}` })}
      {...transientProps({ level, weight, align })}
    >
      {text}
    </Styled.Wrapper>
  );
}
