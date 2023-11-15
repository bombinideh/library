import Books from "@/features/books/routes";
import Logs from "@/features/reports/routes";
import Account from "@/features/users/routes/Account";
import Users from "@/features/users/routes/Users";
import { Navigate } from "react-router-dom";

const privateRoutes = [
  { path: "/", element: <Navigate to="/livros" /> },
  { path: "/livros", element: <Books /> },
  { path: "/usuarios", element: <Users /> },
  { path: "/relatorios", element: <Logs /> },
  { path: "/conta", element: <Account /> },
];

export default privateRoutes;
