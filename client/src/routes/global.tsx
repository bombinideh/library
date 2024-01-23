import Books from "@/features/books/routes";
import { Navigate } from "react-router-dom";

const globalRoutes = [
  { path: "/livros", element: <Books /> },
  { path: "*", element: <Navigate to="/" /> },
];

export default globalRoutes;
