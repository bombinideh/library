import SVGArrowLeft from "@/assets/arrow-left.svg?react";
import IMGLogomark from "@/assets/logomark.png";
import Head, { HeadProps } from "@/components/Head";
import { appNameAcronym } from "@/config";
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
          {logo && (
            <Styled.Logo src={IMGLogomark} alt={`Logomarca do ${appNameAcronym}`} />
          )}

          <Styled.Title>{title}</Styled.Title>

          {description && <Styled.Description>{description}</Styled.Description>}

          <Styled.Form>{children}</Styled.Form>

          <Styled.ReturnLink to={returnLink.to}>
            <SVGArrowLeft />

            <span>{returnLink.text}</span>
          </Styled.ReturnLink>
        </Styled.Main>
      </Styled.Wrapper>
    </>
  );
}
