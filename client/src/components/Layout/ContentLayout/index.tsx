import Dropdown from "@/components/Elements/Dropdown";
import Title from "@/components/Elements/Title/index.tsx";
import Head from "@/components/Head";
import useAuth from "@/hooks/useAuth";
import { ReactNode } from "react";
import * as Styled from "./styles";

const Header = ({ title }: { title: string }) => {
  const { signOut } = useAuth();
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
        Button={props => (
          <button type="button" {...props}>
            Abrir dropdown
          </button>
        )}
        items={userOptions}
      />
    </Styled.Header>
  );
};

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

export default function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <>
      <Head {...(title !== "Página inicial" && { title })} />

      <Header title={title} />

      <Styled.Wrapper>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Wrapper>
    </>
  );
}
