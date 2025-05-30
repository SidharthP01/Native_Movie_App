// // context/AuthContext.tsx
// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   getCurrentUser,
//   loginAccount,
//   logoutAccount,
// } from "../services/appwrite";

// type AuthContextType = {
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkUser = async () => {
//     try {
//       const user = await getCurrentUser();
//       setIsLoggedIn(!!user);
//     } catch {
//       setIsLoggedIn(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkUser();
//   }, []);

//   const login = async (email: string, password: string) => {
//     await loginAccount({ email, password });
//     setIsLoggedIn(true);
//   };

//   const logout = async () => {
//     await logoutAccount();
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { getCurrentUser } from "../services/appwrite"; // adjust path as needed
import { Models } from "appwrite"; // Using Appwrite SDK types

// Define the shape of the AuthContext
interface AuthContextType {
  user: Models.User<{}> | null;
  setUser: React.Dispatch<React.SetStateAction<Models.User<{}> | null>>;
  loading: boolean;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  refreshUser: () => Promise<void>;
}

// Create the context with a default value undefined
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define props for the provider component
interface AuthenticationProviderProps {
  children: ReactNode;
}

export default function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const [user, setUser] = useState<Models.User<{}> | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, userId, setUserId, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming AuthContext safely
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthenticationProvider");
  }
  return context;
}
