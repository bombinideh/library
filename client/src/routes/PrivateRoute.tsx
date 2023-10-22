import { ReactNode } from "react";
import SignIn from "../features/routes/SignIn";

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
