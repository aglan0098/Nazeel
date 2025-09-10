"use client";

import React, { createContext, useEffect, useState } from "react";
import { decodeToken } from "@/utils/decodeToken";
import { extractPermissions } from "@/utils/extractPermissions";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: string[];
  permissions: string[];
  [key: string]: any;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // normalize user from decoded token
  const normalizeUser = (decoded: any): User => {
    return {
      ...decoded,
      id: decoded?.sub || decoded?.Id || "",
      name: decoded?.FullName || decoded?.name || "",
      email: decoded?.Email || decoded?.email || "",
      role:
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] || [],
      permissions: extractPermissions(decoded),
    };
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = decodeToken<any>(storedToken);
        setToken(storedToken);
        setUser(normalizeUser(decoded));
      } catch {
        sessionStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    try {
      const decoded = decodeToken<any>(newToken);
      setUser(normalizeUser(decoded));
    } catch {
      logout();
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
