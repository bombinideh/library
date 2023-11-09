import useSize from "@/hooks/useSize";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import * as Styled from "./styles";

export default function Dashboard() {
  const [sidebarRef, sidebarHeight, sidebarWidth] = useSize();

  return (
    <Styled.Wrapper $sidebarHeight={sidebarHeight} $sidebarWidth={sidebarWidth}>
      <Sidebar ref={sidebarRef} />

      <Outlet />
    </Styled.Wrapper>
  );
}
