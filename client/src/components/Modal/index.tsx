import SVGX from "@/assets/x-mark.svg?react";
import useEscapeKey from "@/hooks/useEscapeKey";
import motionTransition from "@/utils/motionTransition";
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useTheme } from "styled-components";
import Button, { ButtonProps } from "../Elements/Button";
import Title from "../Elements/Title";
import * as Styled from "./styles";

export interface ModalStateProps {
  showState: boolean;
  setShowState: Dispatch<SetStateAction<boolean>>;
}

interface ModalProps extends ModalStateProps {
  children?: ReactNode;
  title: string;
  action: {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    form?: string;
    variant?: ButtonProps["variant"];
  };
}

export default function Modal({
  children,
  title,
  action,
  showState,
  setShowState,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeModal = () => setShowState(false);
  const closeOptions = { state: showState, clearState: closeModal };
  const { transitions } = useTheme();

  useEscapeKey(closeOptions);

  useEffect(() => {
    contentRef.current?.scroll({ top: 100 });
  }, []);

  return (
    <Styled.Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionTransition(transitions.element)}
    >
      <Styled.Dialog
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={motionTransition(transitions.element)}
      >
        <Styled.Header>
          <Title level={4} text={title} />

          <Styled.CloseButton
            variant="support"
            SVG={{ Component: SVGX, color: "textSupport1" }}
            onClick={closeModal}
          />
        </Styled.Header>

        <Styled.Content ref={contentRef}>{children}</Styled.Content>

        <Styled.Footer>
          <Button text="Cancelar" variant="support" onClick={closeModal} />

          <Button
            text={action.text}
            {...(action.form
              ? { type: "submit", form: action.form }
              : { onClick: action.onClick })}
            variant={action.variant || "primary"}
          />
        </Styled.Footer>
      </Styled.Dialog>
    </Styled.Wrapper>
  );
}
