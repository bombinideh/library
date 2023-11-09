import { FunctionComponent, MouseEventHandler, useState } from "react";
import { NavLink } from "react-router-dom";
import * as Styled from "./styles";

type OnClick = MouseEventHandler<HTMLButtonElement>;

interface Option {
  text: string;
  to?: string;
  onClick?: OnClick;
}

interface DropdownProps {
  Button: FunctionComponent<{ onClick: OnClick }>;
  items: Option[];
}

export default function Dropdown({ Button, items }: DropdownProps) {
  const [show, setShow] = useState(false);

  return (
    <Styled.Wrapper>
      <Button onClick={() => setShow(!show)} />

      {show && (
        <Styled.Content>
          {items.map(({ text, to, onClick }) => (
            <Styled.Item
              key={text}
              {...(to && { as: NavLink, to })}
              {...(onClick && { as: "button", type: "button", onClick })}
            >
              {text}
            </Styled.Item>
          ))}
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
}
