import useAuth from "@/hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import { useRoutes } from "react-router-dom";
import globalRoutes from "./global";
import privateRoutes from "./private";
import publicRoutes from "./public";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const mainRoutes = isAuthenticated ? privateRoutes : publicRoutes;
  const element = useRoutes([...globalRoutes, ...mainRoutes]);

  return <AnimatePresence mode="wait">{element}</AnimatePresence>;
}
