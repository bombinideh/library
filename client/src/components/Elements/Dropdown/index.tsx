import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";
import motionTransition from "@/utils/motionTransition";
import transientProps from "@/utils/transientProps";
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

export interface DropdownItem {
  text: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface DropdownProps {
  className?: string;
  Button: ForwardRefExoticComponent<React.RefAttributes<HTMLButtonElement>>;
  items: DropdownItem[];
  contentPositionX?: "left" | "right";
  wrapperWidth?: string;
}

export type DropdownDefaultProps = Required<Pick<DropdownProps, "contentPositionX">>;

const defaultProps: DropdownDefaultProps = {
  contentPositionX: "left",
};

export default function Dropdown(props: DropdownProps) {
  const { className, Button, items, contentPositionX, wrapperWidth } = {
    ...defaultProps,
    ...props,
  };
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeDropdown = () => setShow(false);
  const closeOptions = { state: show, clearState: closeDropdown };
  const { transitions } = useTheme();

  useClickOutside({ ...closeOptions, ref: wrapperRef });
  useEscapeKey(closeOptions);

  return (
    <Styled.Wrapper
      className={className}
      $wrapperWidth={wrapperWidth}
      ref={wrapperRef}
    >
      <Styled.Button
        className={`${show ? "open" : ""}`}
        as={Button}
        type="button"
        onClick={() => setShow(!show)}
      />

      <AnimatePresence>
        {show && (
          <Styled.Content
            onClick={closeDropdown}
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
