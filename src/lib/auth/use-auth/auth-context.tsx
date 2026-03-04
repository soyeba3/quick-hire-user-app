"use client";

import { authTokenLocalStorageKey } from "@/config";
import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export interface AuthUser {
  email: string;
  role: string;
}

type IAuthContext = {
  isAuthenticated?: boolean;
  user?: AuthUser;
  token?: string;
  setAuth: (user: AuthUser, token: string) => void;
  removeAuth: () => void;
  setUser: (user: AuthUser) => void;
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [userState, setUserState] = useLocalStorage<AuthUser | undefined>(
    "user_auth_data",
    undefined,
  );
  const [token, setToken] = useLocalStorage<string>(
    authTokenLocalStorageKey ?? "",
    "",
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userState);
  const [isLoading, setIsLoading] = useState(!userState);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(id);
  }, [userState]);

  const setAuth = (user: AuthUser, token: string) => {
    setUserState(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const removeAuth = () => {
    setUserState(undefined);
    setToken("");
    setIsAuthenticated(false);
  };

  const setUser = (user: AuthUser) => {
    setUserState(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: userState,
        token,
        isAuthenticated: isLoading ? undefined : isAuthenticated,
        setAuth,
        removeAuth,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
