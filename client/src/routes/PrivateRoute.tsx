import SignIn from "@/features/auth/routes/SignIn";
import { ReactNode } from "react";

interface PrivateRouteProps {
  private: ReactNode;
  public?: ReactNode;
}

export default function PrivateRoute({
  private: privateRoute,
  public: publicRoute = <SignIn />,
}: PrivateRouteProps) {
  const isAuthenticated = false;

  return isAuthenticated ? privateRoute : publicRoute;
}
