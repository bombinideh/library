import SVGArrowLeft from "@/assets/arrow-left.svg?react";
import Link from "@/components/Elements/Link";
import Title from "@/components/Elements/Title";
import Head, { HeadProps } from "@/components/Head";
import { ReactNode } from "react";
import * as Styled from "./styles";

type AuthHeadProps = Required<Omit<HeadProps, "description">> &
  Pick<HeadProps, "description">;

interface AuthLayoutProps {
  children: ReactNode;
  head: AuthHeadProps;
  logo?: boolean;
  title: string;
  description?: string;
  returnLink: {
    to: string;
    text: string;
  };
}

export default function AuthLayout({
  children,
  head,
  logo,
  title,
  description,
  returnLink,
}: AuthLayoutProps) {
  return (
    <>
      <Head {...head} />

      <Styled.Wrapper>
        <Styled.Main>
          {logo && <Styled.Logo />}

          <Title level={4} text={title} align="center" headingElement="h1" />

          {description && <Styled.Description>{description}</Styled.Description>}

          {children}

          <Link
            SVG={SVGArrowLeft}
            text={returnLink.text}
            to={returnLink.to}
            align="center"
          />
        </Styled.Main>
      </Styled.Wrapper>
    </>
  );
}
