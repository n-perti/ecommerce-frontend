"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuth();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await logIn({ email, password });
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/3d-geometric-abstract-background.jpg')",
      }}
    >
      <div className="relative w-full max-w-md p-8 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-30 rounded-lg shadow-xl border border-gray-600">
        <h1 className="text-2xl font-bold text-center text-white">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-600 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-600 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 "
          >
            Login
          </button>

          <div className="flex justify-between">
            <p className="text-center text-gray-300">
              Not have an account?{" "}
              <a
                href="/users/register"
                className="text-blue-400 hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;