import useGetUser from "@/features/auth/api/getAuthUser";
import { AuthUserResponse, User } from "@/features/auth/types";
import storage from "@/utils/storage";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SignIn = Omit<AuthUserResponse, "token"> &
  Partial<Pick<AuthUserResponse, "token">>;

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  token: AuthUserResponse["token"] | null;
  // signUp: () => void;
  signIn: (authUserResponse: SignIn) => void;
  signOut: () => void;
}

const token = storage.token.get();

const defaultContextProps: AuthContextProps = {
  isAuthenticated: !!token,
  user: null,
  token: token ? token : null,
  // signUp: () => {},
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultContextProps.isAuthenticated,
  );
  const [user, setUser] = useState(defaultContextProps.user);
  const [token, setToken] = useState(defaultContextProps.token);
  const navigate = useNavigate();
  const signIn = ({ user, token }: SignIn) => {
    setIsAuthenticated(true);
    setUser(user);

    if (token) {
      setToken(token);
      storage.token.set(token);
    }
  };
  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    storage.token.clear();
    navigate("/");
  };
  const autoSignIn = !!storage.token.get();
  const {
    data: authUser,
    isLoading,
    isError,
    isSuccess,
  } = useGetUser({ enabled: autoSignIn });

  useEffect(() => {
    if (!autoSignIn) return;

    if (isError) signOut();

    if (isSuccess) signIn({ user: authUser });
  }, [isError, isSuccess]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, signIn, signOut }}>
      {isLoading ? <>Carregando...</> : children}
    </AuthContext.Provider>
  );
};
