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
  focusOnOpen?: boolean;
  closeOnClickOutside?: boolean;
}

const defaultProps = {
  contentPositionX: "left",
  focusOnOpen: false,
  closeOnClickOutside: true,
} as const;

export default function Dropdown(props: DropdownProps) {
  const {
    className,
    Button,
    items,
    contentPositionX,
    wrapperWidth,
    focusOnOpen,
    closeOnClickOutside,
  } = {
    ...defaultProps,
    ...props,
  };
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeDropdown = () => setShow(false);
  const closeOptions = { state: show, clearState: closeDropdown };
  const { transitions } = useTheme();

  useClickOutside({ ...closeOptions, ref: wrapperRef, active: closeOnClickOutside });
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
        onClick={() => {
          setShow(!show);

          if (focusOnOpen && !show) {
            setTimeout(() => {
              contentRef.current?.scrollIntoView({ behavior: "smooth" });
            }, transitions.element.duration);
          }
        }}
      />

      <AnimatePresence>
        {show && (
          <Styled.Content
            ref={contentRef}
            onClick={closeDropdown}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={motionTransition(transitions.element)}
            {...transientProps({ contentPositionX, wrapperWidth })}
          >
            {items.length ? (
              items.map(({ text, to, onClick }) => (
                <Styled.Item
                  key={text}
                  {...(to && { as: NavLink, to })}
                  {...(onClick && { as: "button", type: "button", onClick })}
                  $wrapperWidth={wrapperWidth}
                >
                  {text}
                </Styled.Item>
              ))
            ) : (
              <Styled.EmptyItems>Nenhuma opção disponível.</Styled.EmptyItems>
            )}
          </Styled.Content>
        )}
      </AnimatePresence>
    </Styled.Wrapper>
  );
}
