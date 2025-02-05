// src/app/commerces/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginCommerce } from "@/lib/commerces";
import Cookies from "js-cookie";
import { Toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommerceLoginPage = () => {
  const [cif, setCif] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = await loginCommerce(cif, token);
      Cookies.set("commerceToken", authToken);
      Cookies.set("commerceCIF", cif);
      router.push("/commerces/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
<div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/3d-geometric-abstract-background.jpg')",
      }}
    >
      <div className="relative w-full max-w-md p-8 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-30 rounded-lg shadow-xl border border-gray-600">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Iniciar Sesión en Comercio</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              CIF:
            </label>
            <input
              type="text"
              value={cif}
              onChange={(e) => setCif(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-600 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Ingrese su CIF"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Token:
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-600 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Ingrese su token"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CommerceLoginPage;