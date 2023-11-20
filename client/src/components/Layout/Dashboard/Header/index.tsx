import SVGChevronDown from "@/assets/chevron-down.svg?react";
import SVGUser from "@/assets/user.svg?react";
import Dropdown from "@/components/Elements/Dropdown";
import { appPrivateName } from "@/config";
import useAuth from "@/hooks/useAuth";
import motionTransition from "@/utils/motionTransition";
import { forwardRef } from "react";
import { useTheme } from "styled-components";
import * as Styled from "./styles";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { user, signOut } = useAuth();
  const userOptions = [
    {
      text: "Minha conta",
      to: "/conta",
    },
    {
      text: "Alterar tema",
      onClick: () => {},
    },
    {
      text: "Sair",
      onClick: signOut,
    },
  ];
  const { transitions } = useTheme();

  return (
    <Styled.Wrapper>
      <Styled.Container
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={motionTransition(transitions.route)}
      >
        <Styled.Title level={3} text={title} title={title} headingElement="h1" />

        <Styled.MobileTitle level={4} text={appPrivateName} />

        <Dropdown
          Button={forwardRef<HTMLButtonElement>((props, ref) => (
            <Styled.ProfileButton {...props} ref={ref}>
              <SVGUser />

              <span>{user?.name.split(" ")[0]}</span>

              <SVGChevronDown />
            </Styled.ProfileButton>
          ))}
          items={userOptions}
          contentPositionX="right"
        />
      </Styled.Container>
    </Styled.Wrapper>
  );
}
