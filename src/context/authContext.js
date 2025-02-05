// src/context/authContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Importa desde 'next/navigation'
import { handleLogIn } from "@/lib/login";
import { getUserDetails } from "@/lib/userDetails";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
    const fetchUserDetails = async () => {
      if (token) {
        const user = await getUserDetails(token);
        setUserDetails(user);
      }
    };
    fetchUserDetails();
  }, []);

  const logIn = async (email, password) => {
    try {
      const token = await handleLogIn(email, password);
      Cookies.set("token", token);
      const user = await getUserDetails(token);
      setUserDetails(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logOut = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUserDetails(null);
    router.push("/users/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userDetails, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
