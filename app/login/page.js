"use client";
import { useState } from "react";
import LoginHeader from "../components/LoginHeader";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "../../lib/api/auth";

const Page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const payload = { email: form.email, password: form.password };
      const res = await authApi.login(payload);

      // Backend response shape: { success, message, data: { user } }
      const user = res?.data?.data?.user || res?.data?.user;
      const role = user?.role;

      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "INVESTOR") router.push("/investors/overview");
      else if (role === "BUSINESS_OWNER") router.push("/business-owner/overview");
      else router.push("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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

              {error ? (
                <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

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

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="********"
                    required
                    className="w-full px-4 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400 textColor"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500 mt-4">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
