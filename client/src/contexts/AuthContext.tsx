import useGetUser from "@/features/auth/api/getAuthUser";
import { AuthUserResponse, User } from "@/features/auth/types";
import storage from "@/utils/storage";
import { ReactNode, createContext, useEffect, useState } from "react";

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
  const signIn = ({ user, token }: SignIn) => {
    setIsAuthenticated(true);
    setUser(user);

    if (token) {
      setToken(token);
      storage.token.set(token);
    }
  };
  const signOut = () => {
    setIsAuthenticated(defaultContextProps.isAuthenticated);
    setUser(defaultContextProps.user);
    setToken(defaultContextProps.token);
    storage.token.clear();
  };
  const autoSignIn = !!storage.token.get();
  const {
    data: authUser,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUser({ enabled: autoSignIn });

  useEffect(() => {
    if (!autoSignIn) return;

    if (isError && error.statusCode === 401) storage.token.clear();

    if (isSuccess) signIn({ user: authUser });
  }, [isError, isSuccess]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, signIn, signOut }}>
      {isLoading ? <>Carregando...</> : children}
    </AuthContext.Provider>
  );
};