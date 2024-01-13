import SVGX from "@/assets/x-mark.svg?react";
import useEscapeKey from "@/hooks/useEscapeKey";
import motionTransition from "@/utils/motionTransition";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";
import { useTheme } from "styled-components";
import Button, { ButtonProps } from "../Elements/Button";
import Title from "../Elements/Title";
import * as Styled from "./styles";

export interface ModalStateProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

interface ModalProps extends ModalStateProps {
  header?: ReactNode;
  children?: ReactNode;
  title: string;
  action: {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    form?: string;
    variant?: ButtonProps["variant"];
    disabled?: boolean;
  };
}

export default function Modal({
  header,
  children,
  title,
  action,
  showModal,
  setShowModal,
}: ModalProps) {
  const closeOptions = { state: showModal, clearState: () => setShowModal(false) };
  const { transitions } = useTheme();

  useEscapeKey(closeOptions);

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
          <Styled.DefaultHeaderContent>
            <Title level={4} text={title} />

            <Styled.CloseButton
              variant="support"
              SVG={{ Component: SVGX, color: "textSupport1" }}
              onClick={() => setShowModal(false)}
            />
          </Styled.DefaultHeaderContent>

          {header && header}
        </Styled.Header>

        <Styled.Content>{children}</Styled.Content>

        <Styled.Footer>
          <Button
            text="Cancelar"
            variant="support"
            onClick={() => setShowModal(false)}
          />

          <Button
            text={action.text}
            {...(action.form
              ? { type: "submit", form: action.form }
              : { onClick: action.onClick })}
            variant={action.variant || "primary"}
            {...(action.disabled && { disabled: action.disabled })}
          />
        </Styled.Footer>
      </Styled.Dialog>
    </Styled.Wrapper>
  );
}
