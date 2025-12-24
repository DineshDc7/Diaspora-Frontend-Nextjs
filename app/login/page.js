"use client";
import React from "react";
import LoginHeader from "../components/LoginHeader";
import { useState } from "react";

const Page = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <>
    <main className="min-h-screen bg-white">
      <LoginHeader />
      <section>
        <div className="container mx-auto px-6 py-16 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white shadow-xl rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
              Login
            </h2>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-base font-medium subHeadingColor mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-slate-400 textColor"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-base font-medium subHeadingColor mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:text-slate-400 textColor"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-slate-500 mt-4">
              Don’t have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </section>
      </main>
    </>
  );
};

export default Page;
