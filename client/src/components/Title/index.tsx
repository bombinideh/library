import transientProps from "@/utils/transientProps";
import * as Styled from "./styles";

export interface TitleProps {
  level: 1 | 2 | 3 | 4;
  text: string;
  weight?: 400 | 500 | 700;
  align?: "left" | "center" | "right";
}

export default function Title({
  level,
  text,
  weight = 500,
  align = "left",
}: TitleProps) {
  return (
    <Styled.Wrapper as={`h${level}`} {...transientProps({ level, weight, align })}>
      {text}
    </Styled.Wrapper>
  );
}
