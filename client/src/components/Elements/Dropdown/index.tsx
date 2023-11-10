import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";
import {
  ForwardRefExoticComponent,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import * as Styled from "./styles";

type OnClick = MouseEventHandler<HTMLButtonElement>;

export interface DropdownProps {
  Button: ForwardRefExoticComponent<React.RefAttributes<HTMLButtonElement>>;
  items: Array<{
    text: string;
    to?: string;
    onClick?: OnClick;
  }>;
  contentPosition?: "left" | "right";
  wrapperWidth?: string;
}

export type DropdownDefaultProps = Required<Pick<DropdownProps, "contentPosition">>;

const defaultProps: DropdownDefaultProps = {
  contentPosition: "left",
};

export default function Dropdown(props: DropdownProps) {
  const { Button, items, contentPosition, wrapperWidth } = {
    ...defaultProps,
    ...props,
  };
  const [show, setShow] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeOptions = { state: show, clearState: () => setShow(false) };

  useClickOutside({ ...closeOptions, ref: buttonRef });
  useEscapeKey(closeOptions);

  return (
    <Styled.Wrapper $wrapperWidth={wrapperWidth}>
      <Styled.Button
        as={Button}
        type="button"
        ref={buttonRef}
        onClick={() => setShow(!show)}
      />

      {show && (
        <Styled.Content
          $contentPosition={contentPosition}
          $wrapperWidth={wrapperWidth}
        >
          {items.map(({ text, to, onClick }) => (
            <Styled.Item
              key={text}
              {...(to && { as: NavLink, to })}
              {...(onClick && { as: "button", type: "button", onClick })}
              $wrapperWidth={wrapperWidth}
            >
              {text}
            </Styled.Item>
          ))}
        </Styled.Content>
      )}
    </Styled.Wrapper>
  );
}
