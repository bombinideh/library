import useAuth from "@/hooks/useAuth";
import { AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import globalRoutes from "./global";
import privateRoutes from "./private";
import publicRoutes from "./public";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const mainRoutes = isAuthenticated ? privateRoutes : publicRoutes;
  const element = useRoutes([...globalRoutes, ...mainRoutes]);
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Fragment key={location.key}>{element}</Fragment>
      </AnimatePresence>
    </>
  );
}
