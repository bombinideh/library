import useAuth from "@/hooks/useAuth";
import { BrowserRouter } from "react-router-dom";
import Private from "./Private";
import Public from "./Public";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return <BrowserRouter>{isAuthenticated ? <Private /> : <Public />}</BrowserRouter>;
}
