import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";
import motionTransition from "@/utils/motionTransition";
import { AnimatePresence } from "framer-motion";
import {
  ForwardRefExoticComponent,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "styled-components";
import * as Styled from "./styles";
import transientProps from "@/utils/transientProps";

type OnClick = MouseEventHandler<HTMLButtonElement>;

export interface DropdownProps {
  className?: string;
  Button: ForwardRefExoticComponent<React.RefAttributes<HTMLButtonElement>>;
  items: Array<{
    text: string;
    to?: string;
    onClick?: OnClick;
  }>;
  contentPositionX?: "left" | "right";
  wrapperWidth?: string;
}

export type DropdownDefaultProps = Required<
  Pick<DropdownProps, "contentPositionX">
>;

const defaultProps: DropdownDefaultProps = {
  contentPositionX: "left",
};

export default function Dropdown(props: DropdownProps) {
  const { className, Button, items, contentPositionX, wrapperWidth } = {
    ...defaultProps,
    ...props,
  };
  const [show, setShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeOptions = { state: show, clearState: () => setShow(false) };
  const { transitions } = useTheme();

  useClickOutside({ ...closeOptions, ref: buttonRef });
  useEscapeKey(closeOptions);

  return (
    <Styled.Wrapper className={className} $wrapperWidth={wrapperWidth}>
      <Styled.Button
        className={`${show ? "open" : ""}`}
        as={Button}
        type="button"
        ref={buttonRef}
        onClick={() => setShow(!show)}
      />

      <AnimatePresence>
        {show && (
          <Styled.Content
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={motionTransition(transitions.element)}
            {...transientProps({ contentPositionX, wrapperWidth })}
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
      </AnimatePresence>
    </Styled.Wrapper>
  );
}
