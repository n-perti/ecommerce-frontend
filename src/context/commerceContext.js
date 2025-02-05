import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { loginCommerce, getCommerceDetails } from "@/lib/commerces";
import { useCommerce } from "@/context/commerceContext";

const CommerceContext = createContext();

export const CommerceProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [commerceDetails, setCommerceDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("commerceToken");
    setIsAuthenticated(!!token);
    const fetchCommerceDetails = async () => {
      if (token) {
        const commerce = await getCommerceDetails(token);
        setCommerceDetails(commerce);
      }
    };
    fetchCommerceDetails();
  }, []);

  const logIn = async (cif, token) => {
    try {
      const isValid = await loginCommerce(cif, token);
      if (isValid) {
        Cookies.set("commerceToken", token);
        setIsAuthenticated(true);
        const commerce = await getCommerceDetails(token);
        setCommerceDetails(commerce);
        router.push("/commerces/dashboard");
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logOut = () => {
    Cookies.remove("commerceToken");
    setIsAuthenticated(false);
    setCommerceDetails({});
    router.push("/commerces/login");
  };

  return (
    <CommerceContext.Provider
      value={{ isAuthenticated, commerceDetails, logIn, logOut }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => useContext(CommerceContext);