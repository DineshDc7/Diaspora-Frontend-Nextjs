"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function StepThree({ onBack, onContinue }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    location: "",
    sector: "",
    monthlySales: "",
    reportingFrequency: "Daily updates",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    console.log("Business submitted:", formData);
    router.push("/admin/investorSignup/step-2");
  };

  return (
    <section className="min-h-screen py-10 ">
      <div className="md:max-w-6xl mx-auto p-8 rounded-xl shadow-lg bg-white">
        {/* Top Progress */}
        <div className="flex justify-between items-center mb-4">
          <p className="textColor mb-4 text-sm font-semibold">
            <span className="font-semibold">Step 2 of 3</span> - Create your
            investor workspace
          </p>

          <div className="flex items-center gap-2 text-sm">
            {/* <span className="bg-blue-600 text-white px-3 py-1 rounded-full">1 · Add businesses</span>
            <span className="textColor">2 · Track compliance</span>
            <span className="textColor">3 · Verified reports</span> */}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 headingColor">
          Add your first business
        </h2>

        <p className="textColor">
          Start with one business you already support or plan to fund. You can
          add more later and we’ll track compliance for each one.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
          {/* LEFT FORM */}
          <div className="lg:col-span-2 pr-8">
            {/* Business Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 textColor">
                Business name <span className="text-red-500">*</span>
              </label>
              <input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
              />
            </div>

            {/* Location & Sector */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  placeholder="Location"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Sector
                </label>

                <div className="relative w-full">
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full appearance-none p-3 pr-10 border border-gray-300 rounded-md outline-none bg-white text-sm"
                  >
                    <option value="">Select sector</option>
                    <option value="Retail">Retail</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>

                  {/* Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sales & Frequency */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Typical monthly sales{" "}
                  <span className="textColor">(Estimate)</span>
                </label>
                <input
                  name="monthlySales"
                  value={formData.monthlySales}
                  onChange={handleChange}
                  placeholder="Rs500,000 – Rs2,000,000"
                  className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Reporting frequency
                </label>

                <div className="relative w-full">
                  <select
                    name="sector"
                    value={formData.reportingFrequency}
                    onChange={handleChange}
                    className="w-full appearance-none p-3 pr-10 border border-gray-300 rounded-md outline-none bg-white text-sm"
                  >
                    <option>Daily updates</option>
                    <option>Weekly updates</option>
                    <option>Monthly updates</option>
                  </select>

                  {/* Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 textColor">
                Point of contact{" "}
                <span className="textColor">(Owner or manager)</span>
              </label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Name, WhatsApp or email"
                className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                We’ll invite them to submit verified daily and monthly reports
                on your behalf.
              </p>
            </div>

            {/* Actions */}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold">
                Preview: how this will look
              </p>
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                Gold tier sample
              </span>
            </div>

            <div className="text-sm space-y-3 text-gray-700 pt-4">
              <div className="flex justify-between">
                <p className="text-xs textColor">Lagos · Retail</p>
                <p className="text-xs textColor">Assigned field officer</p>
                <p className="text-xs textColor">Daily Report</p>
              </div>
              <div className="flex gap-10">
                <p className="textColor">
                  Compliance score: <br></br>
                  <span className="subHeadingColor font-semibold">91%</span>
                </p>
                <p className="textColor">
                  On-time reports: <br></br>
                  <span className="subHeadingColor font-semibold">
                    28 / 30 days
                  </span>
                </p>
              </div>
              <div className="flex gap-10">
                <p className="textColor">
                  Last monthly report: <br></br>
                  <span className="subHeadingColor font-semibold">
                    3 days ago
                  </span>
                </p>
                <p className="textColor">
                  Alerts: <br></br>
                  <span className="subHeadingColor font-semibold">Open</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Once you add a business, we’ll generate live scorecards and notify
              you if compliance drops below your threshold.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div>
            <p className="mb-1 textColor font-semibold">
              You can skip this for now and add businesses from your dashboard
              later.
            </p>
            <p className="text-sm">
              Your account is created - now connect it to real businesses.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="w-fit px-4 py-2 rounded-md secondaryColor textColor text-sm font-semibold"
            >
              Back to Previous
            </button>
            <button className="w-fit px-4 py-2 rounded-md secondaryColor textColor text-sm font-semibold">
              Skip for now
            </button>
            <button
              onClick={onContinue}
              className="w-fit px-4 py-2 rounded-md primaryColor text-white text-sm font-semibold"
            >
              Continue to Step 3
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
