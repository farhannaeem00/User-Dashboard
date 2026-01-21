"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser } from "./types";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: "user" | "admin") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking stored auth state
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login with predefined users
    const mockUsers: Record<string, { name: string; role: "user" | "admin"; seed: string }> = {
      "user@example.com": { name: "John Doe", role: "user", seed: "john" },
      "admin@example.com": { name: "Charlie Brown", role: "admin", seed: "charlie" },
      "jane@example.com": { name: "Jane Smith", role: "user", seed: "jane" },
      "bob@example.com": { name: "Bob Johnson", role: "user", seed: "bob" },
    };

    // Validate credentials (mock validation)
    if (!mockUsers[email]) {
      throw new Error("Invalid email or password");
    }

    if (password.length < 6) {
      throw new Error("Invalid email or password");
    }

    const userData = mockUsers[email];
    const mockUser: AuthUser = {
      user_id: `user-${email.split("@")[0]}`,
      name: userData.name,
      email,
      role: userData.role,
      profile_image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.seed}`,
    };

    setUser(mockUser);
    localStorage.setItem("authUser", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const switchRole = (role: "user" | "admin") => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
