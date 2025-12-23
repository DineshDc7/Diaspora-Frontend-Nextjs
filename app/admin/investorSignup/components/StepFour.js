"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StepFour({ onBack, onContinue }) {
  const router = useRouter();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      businessFile: file,
    }));
  };
  const [formData, setFormData] = useState({
    businessFile: "",
    location: "",
    sector: "",
    monthlySales: "",
    reportingFrequency: "",
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
            <span className="font-semibold">Step 3 of 3</span> - Create your
            investor workspace
          </p>

          <div className="flex items-center gap-2 text-sm">
            {/* <span className="bg-blue-600 text-white px-3 py-1 rounded-full">1 · Add businesses</span>
            <span className="textColor">2 · Track compliance</span>
            <span className="textColor">3 · Verified reports</span> */}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 headingColor">
          Receive clear, verified reporting from day one
        </h2>

        <p className="textColor">
          Tell us how you'd like updates delivered. We'll format reports for
          clarity, attach verified media, and keep a clean audit trail for every
          business.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
          {/* LEFT FORM */}
          <div className="lg:col-span-2 pr-8">
            {/* Business Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 textColor">
                Report format <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="businessFile"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-200 file:textColor hover:file:bg-neutral-300"
              />
            </div>

            {/* Location & Sector */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Monthly report delivery
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
                  Weekly highlights
                </label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                >
                  <option value="">Select Weekly highlights</option>
                  <option>Retail</option>
                  <option>Agriculture</option>
                  <option>Logistics</option>
                  <option>Manufacturing</option>
                </select>
              </div>
            </div>

            {/* Sales & Frequency */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Preferred channel
                </label>

                <select
                  name="sector"
                  value={formData.monthlySales}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                >
                  <option value="">Select Preferred channel</option>
                  <option>Retail</option>
                  <option>Agriculture</option>
                  <option>Logistics</option>
                  <option>Manufacturing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Time zone
                </label>
                <select
                  name="reportingFrequency"
                  value={formData.reportingFrequency}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
                >
                  <option>Time zone</option>
                  <option>Daily updates</option>
                  <option>Weekly updates</option>
                  <option>Monthly updates</option>
                </select>
              </div>
            </div>

            {/* Contact */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 textColor">
                What should we always highlight?{" "}
                <span className="textColor">(Optional)</span>
              </label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="E.g Sales drops > 20%, missed reports, media fiagged by field officer"
                className="w-full p-3 border border-gray-300 rounded-md outline-none text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                We'll pin these items to the top of every and flag them in your
                alerts panel.
              </p>
            </div>


            <div className="flex justify-between gap-10">
                <div className="p-2 secondaryColor  rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Digest Style</p>
                        <p className="px-3 py-1 text-sm subHeadingColor rounded-full bg-gray-200">
                          Recommended
                        </p>
                    </div>
                    <p className="text-sm textColor mt-3">One concise email with portfolio KPIs, risks, and links to details.</p>
                </div>
                <div className="p-2 secondaryColor  rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Digest Style</p>
                        <p className="px-3 py-1 text-sm subHeadingColor rounded-full bg-gray-200">
                          Recommended
                        </p>
                    </div>
                    <p className="text-sm textColor mt-3">One concise email with portfolio KPIs, risks, and links to details.</p>
                </div>
            </div>

            {/* Actions */}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold">
              Preview: verified monthly report
            </p>
            <div className="flex justify-between items-center mb-4">
              <div className="">
                <div className="flex items-center gap-2">
                  <p className="text-xs">Portfolio · June</p>
                  <p className="text-xs">Time zone: WAT</p>
                </div>
                <p className="text-xs mt-2">Verified by field officers</p>
              </div>
              <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                Gold tier focus
              </span>
            </div>

            <div className="text-sm space-y-2 text-gray-700">
              <div className="flex gap-10">
                <p className="textColor">
                  Total Businesses <br></br>
                  <span className="subHeadingColor font-semibold">12</span>
                </p>
                <p className="textColor">
                  Overall compliance <br></br>
                  <span className="subHeadingColor font-semibold">
                    89%
                  </span>
                </p>
              </div>
              <div className="flex gap-10">
                <p className="textColor">
                  Avg monthly sales <br></br>
                  <span className="subHeadingColor font-semibold">
                    42.5M
                  </span>
                </p>
                <p className="textColor">
                  Flagged items <br></br>
                  <span className="subHeadingColor font-semibold">4</span>
                </p>
              </div>

              <div className="flex gap-10">
                <p className="textColor text-xs">
                  3 businesses at risk
                </p>
                <p className="textColor text-xs">
                  2 overdue monthly reports
                </p>
              </div>
            </div>


            <div className="bg-white p-4 rounded-lg my-3">
                <div className="mb-2">
                    <p className="text-xs font-semibold subHeadingColor">Portfolio summary generated</p>
                    <p className="text-xs textColor">All numbers reconciled from daily reports and verified uploads.</p>
                </div>
                <div className="mb-2">
                    <p className="text-xs font-semibold subHeadingColor">Alert: sales drop {">"}20%</p>
                    <p className="text-xs textColor">Kano Retail Hub -24% vs last month 2 receipts flagged for review.</p>
                </div>
                <div className="mb-2">
                    <p className="text-xs font-semibold subHeadingColor">Media verification complete</p>
                    <p className="text-xs textColor">18 new photos and 6 videos confirmed by field officers.</p>
                </div>
                <div className="">
                    <p className="text-xs font-semibold subHeadingColor">Next summary scheduled </p>
                    <p className="text-xs textColor">Automatic delivery on the 1st of next month at 09:00 WAT.</p>
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
              You're ready to start. You can fine-tune report delivery from your
              dashboard anytime.
            </p>
            <p className="text-sm">
              We'll keep your preferences in sync across web, email and
              notifications.
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
              Skip for Now
            </button>
            <button
              onClick={handleContinue}
              className="w-fit px-4 py-2 rounded-md primaryColor text-white text-sm font-semibold"
            >
              Finish Setup
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
