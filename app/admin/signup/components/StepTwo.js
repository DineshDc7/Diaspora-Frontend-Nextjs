"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
const StepTwo = ({ onBack }) => {
const router = useRouter();

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/admin/dashboard");
    
  };



    return (
        <>
         <section>
        <div className="container mx-auto md:w-[1000px] py-10">
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6">
            <div className="md:col-span-2 col-span-1 flex flex-col justify-center md:pr-16 px-4">
              {/* <p className="textColor mb-4 text-sm font-semibold"><span className="font-semibold">Step 2 of 2</span> - Create your admin workspace</p> */}
              <div>
                <h2 className="text-xl md:text-3xl font-bold mb-4 headingColor">
                  Set up your Admin Account
                </h2>
                <p className="textColor">
                  Set up tools, permissions, and workflows to manage users and
                  platform operations efficiently.
                </p>
              </div>
              <form className="md:py-6 pt-4" onSubmit={handleSubmit}>
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
                   <div className="relative">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-full appearance-none p-3 pr-10 border border-gray-300 rounded-md outline-none bg-white text-sm"
                      >
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+234">+234 (Nigeria)</option>
                      </select>

                      {/* Custom dropdown arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
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
                    className="w-full py-3 rounded-md primaryColor text-white font-semibold"
                  >
                    Create Account
                  </button>
                  {/* <button
                    type="submit"
                    className="w-full py-3 rounded-md secondaryColor textColor font-semibold"
                  >
                    Continue with Google
                  </button> */}
                </div>

                <div className="flex justify-between py-6 gap-12">
                    <div>
                        <p className="text-sm textColor">We use your details only to secure and personalize your workspace.</p>
                    </div>
                    <div><button onClick={onBack} className="text-blue-500 text-sm font-semibold">Back to role selection </button></div>
                </div>
              </form>
            </div>
            <div className="md:col-span-1 col-span-1 mt-6 md:mt-0">
              <div className="p-6 rounded-lg shadow-lg h-full">
                <p className="mb-2 textColor text-sm font-semibold">What you get</p>
                <h3 className="subHeadingColor font-semibold text-base">One view of all your businesses</h3>
                <p className="textColor text-sm mb-2">
                  This handy tool helps you create dummy text for all your layout needs. We are gradually adding new functionality and we welcome your suggestions and feedback.
                </p>
                <h3 className="subHeadingColor font-semibold text-base">One view of all your businesses</h3>
                <p className="textColor text-sm mb-2">
                  This handy tool helps you create dummy text for all your layout needs. We are gradually adding new functionality and we welcome your suggestions and feedback.
                </p>
                <h3 className="subHeadingColor font-semibold text-base">One view of all your businesses</h3>
                <p className="textColor text-sm mb-2">
                  This handy tool helps you create dummy text for all your layout needs. We are gradually adding new functionality and we welcome your suggestions and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>   
        </>
    );
}

export default StepTwo;
