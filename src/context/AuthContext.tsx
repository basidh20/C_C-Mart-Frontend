import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { authService } from "../services/authService";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password });

      if (response.success && response.user) {
        setState({
          isAuthenticated: true,
          user: response.user,
        });

        // Store token if provided
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await authService.signup({ name, email, password });

      if (response.success && response.user) {
        setState({
          isAuthenticated: true,
          user: response.user,
        });

        // Store token if provided
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Clear local state and token regardless of API response
      setState({
        isAuthenticated: false,
        user: null,
      });
      localStorage.removeItem("token");
    }
  };

  const value = {
    state,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
