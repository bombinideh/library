import Bookcases from "@/features/bookcases/routes";
import Boxes from "@/features/boxes/routes";
import Reports from "@/features/reports/routes";
import Shelfs from "@/features/shelfs/routes";
import Account from "@/features/users/routes/Account";
import Users from "@/features/users/routes/Users";
import { Navigate } from "react-router-dom";

const privateRoutes = [
  { path: "/", element: <Navigate to="/livros" /> },
  { path: "*", element: <Navigate to="/livros" /> },
  { path: "/estantes", element: <Bookcases /> },
  { path: "/prateleiras", element: <Shelfs /> },
  { path: "/caixas", element: <Boxes /> },
  { path: "/usuarios", element: <Users /> },
  { path: "/relatorios", element: <Reports /> },
  { path: "/conta", element: <Account /> },
];

export default privateRoutes;
