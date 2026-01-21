"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StepTwo = ({ onBack, selectedRole = "BUSINESS_OWNER" }) => {
  const router = useRouter();

  const roleValue = String(selectedRole || "BUSINESS_OWNER").toUpperCase();
  const roleLabel = (role) => {
    if (role === "ADMIN") return "Admin";
    if (role === "BUSINESS_OWNER") return "Business Owner";
    if (role === "INVESTOR") return "Investor";
    return role;
  };

  const isValidEmail = (email) =>
    typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const normalizePhone10 = (v) => String(v || "").replace(/\D/g, "").slice(0, 10);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");

    if (name === "phone") {
      const digits = normalizePhone10(value);
      setFormData((prev) => ({ ...prev, phone: digits }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");

    const email = String(formData.email || "").trim();
    const phoneDigits = normalizePhone10(formData.phone);

    if (!formData.name || !String(formData.name).trim()) {
      setError("Full name is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phoneDigits.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    if (!formData.password || String(formData.password).length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: String(formData.name).trim(),
        email,
        password: formData.password,
        role: roleValue,
        mobile: `${formData.countryCode || ""}${phoneDigits}`,
      };

      await authApi.register(payload);

      // Redirect based on role
      if (roleValue === "ADMIN") router.push("/admin/dashboard");
      else if (roleValue === "INVESTOR") router.push("/investors/overview");
      else router.push("/business-owner/overview");

      router.refresh();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <div className="container mx-auto md:w-[1000px] py-10">
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6">
            <div className="md:col-span-2 col-span-1 flex flex-col justify-center md:pr-16 p-4">
              {/* <p className="textColor mb-4 text-sm font-semibold"><span className="font-semibold">Step 2 of 2</span> - Create your admin workspace</p> */}
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-4 headingColor">
                  Set up your {roleLabel(roleValue)} Account
                </h2>
                <p className="textColor">
                  Create your account to access your dashboard, manage your profile, and start using the platform.
                </p>
              </div>
              <form className="md:py-6 pt-4" onSubmit={handleSubmit}>
                {error ? (
                  <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}
                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 textColor">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 textColor">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() =>
                      setFormData((prev) => ({ ...prev, email: String(prev.email || "").trim() }))
                    }
                    placeholder="Enter your email address"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                    required
                  />
                </div>

                {/* Contact Number with Country Code */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 textColor">
                    Contact Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-[100px]">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, countryCode: value }))
                        }
                      >
                        <SelectTrigger
                          className="w-full h-12 px-3 pr-3 border border-gray-300 rounded-md bg-white text-sm flex items-center justify-between">
                          <SelectValue placeholder="+91 (IN)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91 (IN)</SelectItem>
                          <SelectItem value="+1">+1 (USA)</SelectItem>
                          <SelectItem value="+44">+44 (UK)</SelectItem>
                          <SelectItem value="+234">+234 (NI)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 p-3 border border-gray-300 rounded-md outline-none text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2 textColor">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full p-3 pr-12 border border-gray-300 rounded-md outline-none text-sm"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        /* Eye Off */
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        /* Eye */
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-md primaryColor text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Creating..." : "Create Account"}
                  </button>
                  {/* <button
                    type="submit"
                    className="w-full py-3 rounded-md secondaryColor textColor font-semibold"
                  >
                    Continue with Google
                  </button> */}
                </div>

                <div className="flex justify-between py-6 gap-5 md:gap-12">
                  <div>
                    <p className="text-sm textColor">
                      We use your details only to secure and personalize your
                      workspace.
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={onBack}
                      className="text-blue-500 text-sm font-semibold"
                    >
                      Back to role selection{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="md:col-span-1 col-span-1 md:mt-0">
              <div className="p-6 rounded-lg shadow-lg h-full">
                <p className="mb-2 textColor text-sm font-semibold">
                  What you get
                </p>
                <h3 className="subHeadingColor font-semibold text-base">
                  One view of all your businesses
                </h3>
                <p className="textColor text-sm mb-2">
                  This handy tool helps you create dummy text for all your
                  layout needs. We are gradually adding new functionality and we
                  welcome your suggestions and feedback.
                </p>
                <h3 className="subHeadingColor font-semibold text-base">
                  One view of all your businesses
                </h3>
                <p className="textColor text-sm mb-2">
                  This handy tool helps you create dummy text for all your
                  layout needs. We are gradually adding new functionality and we
                  welcome your suggestions and feedback.
                </p>
                <h3 className="subHeadingColor font-semibold text-base">
                  One view of all your businesses
                </h3>
                <p className="textColor text-sm mb-2">
                  This handy tool helps you create dummy text for all your
                  layout needs. We are gradually adding new functionality and we
                  welcome your suggestions and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StepTwo;
