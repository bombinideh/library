import SVGChevronDown from "@/assets/chevron-down.svg?react";
import SVGUser from "@/assets/user.svg?react";
import Dropdown from "@/components/Elements/Dropdown";
import Title from "@/components/Elements/Title/index.tsx";
import Head from "@/components/Head";
import useAuth from "@/hooks/useAuth";
import { ReactNode, forwardRef } from "react";
import * as Styled from "./styles";

const Header = ({ title }: { title: string }) => {
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

  return (
    <Styled.Header>
      <Title level={3} text={title} />

      <Dropdown
        Button={forwardRef<HTMLButtonElement>((props, ref) => (
          <Styled.ProfileButton {...props} ref={ref}>
            <SVGUser />

            <span>{user?.name}</span>

            <SVGChevronDown />
          </Styled.ProfileButton>
        ))}
        items={userOptions}
        contentPosition="right"
      />
    </Styled.Header>
  );
};

export interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

export default function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <>
      <Head {...(title !== "Página inicial" && { title })} />

      <Styled.Wrapper>
        <Header title={title} />

        <Styled.Content>{children}</Styled.Content>
      </Styled.Wrapper>
    </>
  );
}
