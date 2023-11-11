import Head from "@/components/Head";
import useSize from "@/hooks/useSize";
import motionTransition from "@/utils/motionTransition";
import { m } from "framer-motion";
import { ReactNode } from "react";
import { useTheme } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import * as Styled from "./styles";

interface DashboardProps {
  title: string;
  children: ReactNode;
}

export default function Dashboard({ title, children }: DashboardProps) {
  const [sidebarRef, sidebarHeight, sidebarWidth] = useSize();
  const { transitions } = useTheme();

  return (
    <>
      <Head {...(title !== "Página inicial" && { title })} />

      <Styled.Wrapper $sidebarHeight={sidebarHeight} $sidebarWidth={sidebarWidth}>
        <Sidebar ref={sidebarRef} />

        <Styled.Content>
          <Header title={title} />

          <m.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition(transitions.route)}
          >
            {children}
          </m.main>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
}
