import { INotification, defaultNotification } from "@/@types/notification";
import SVGCheck from "@/assets/check.svg?react";
import SVGExclamation from "@/assets/exclamation.svg?react";
import SVGX from "@/assets/x-mark.svg?react";
import motionTransition from "@/utils/motionTransition";
import { ReactNode } from "react";
import { useTheme } from "styled-components";
import * as Styled from "./styles";

export type Variants<T> = Record<NonNullable<INotification["variant"]>, T>;

export default function Notification(props: INotification) {
  const { variant, duration, text } = { ...defaultNotification, ...props };
  const icons: Variants<ReactNode> = {
    info: <SVGExclamation />,
    error: <SVGX />,
    success: <SVGCheck />,
  };
  const { transitions } = useTheme();

  return (
    <Styled.Wrapper
      $variant={variant}
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 15 }}
      transition={motionTransition(transitions.notification)}
    >
      <Styled.Icon $variant={variant}>{icons[variant]}</Styled.Icon>

      <Styled.Text>{text}</Styled.Text>

      <Styled.TimeBar
        $variant={variant}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </Styled.Wrapper>
  );
}
