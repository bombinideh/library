import { BrowserRouter } from "react-router-dom";
import Public from "./Public";
import Private from "./Private";

export default function AppRoutes() {
  const isAuthenticated = false;

  return <BrowserRouter>{isAuthenticated ? <Private /> : <Public />}</BrowserRouter>;
}
