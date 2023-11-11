import AuthRoutes from "@/features/auth/routes";
import SignIn from "@/features/auth/routes/SignIn";

const publicRoutes = [
  { path: "/", element: <SignIn /> },
  { path: "/auth/*", element: <AuthRoutes /> },
];

export default publicRoutes;
