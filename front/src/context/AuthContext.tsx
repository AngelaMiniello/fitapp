"use client";

import { createContext, useContext, useState } from "react";

interface IUser {
  id: number;
  email: string;
}

interface IUserSession {
  token: string;
  user: IUser;
}

interface AuthContextType {
  userData: IUserSession | null;
  setUserData: (data: IUserSession | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userData: null,
  setUserData: () => {},
  logout: () => {},
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [userData, setUserData] = useState<IUserSession | null>(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);