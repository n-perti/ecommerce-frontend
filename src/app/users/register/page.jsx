'use client';

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { handleRegister } from "@/lib/register";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [interest, setInterest] = useState("");
  const [allowOffers, setAllowOffers] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userData = {
                name,
                email,
                password,
                age,
                city,
                interest,
                allowOffers
            }
            await handleRegister(userData);
            toast.success("User registered successfully!");
            window.location.href = "/users/login";
        } catch (error) {
            toast.error(error.message);
        }
    };

  const handleNextStep = () => {
    if (step === 1 && !name.trim()) {
      toast.error("Name is required!");
      return;
    }
    if (step === 2 && (!email.trim() || !password.trim() || !confirmPassword.trim())) {
      toast.error("All fields are required!");
      return;
    }
    if (step === 2 && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };



  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: "url('/3d-geometric-abstract-background.jpg')" }}>
      <div className="relative w-full max-w-md p-8 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-30 rounded-lg shadow-xl border border-gray-600">
        <div className="absolute inset-0 bg-white opacity-5 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center text-white mb-8">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 bg-gray-600 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>
            )}
            {step === 2 && (
              <>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full px-4 py-3 bg-gray-700 bg-opacity-50 text-white placeholder-gray-300 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </>
            )}
            {step === 3 && (
                <>
                <div>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        required
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        placeholder="Interest"
                        required
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-md"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={allowOffers}
                        onChange={(e) => setAllowOffers(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded"
                    />
                    <label className="ml-2 text-white">Allow Offers</label>
                </div>
            </>
            )}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
                >
                  Confirm
                </button>
              )}
            </div>
          </form>
          <p className="mt-4 text-center text-gray-300">
            Already have an account?{" "}
            <a href="/users/login" className="text-blue-400 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Register;