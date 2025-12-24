"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
const StepOne = () => {
     const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

const roleRoutes = {
  0: "/Investor/investorSignup",
    // 1: "/admin/business-owner", // create this folder if missing
    1:"/business_owner/ownersignup",
    2: "/admin/signup",
};

const onContinue = () => {
  const selectedRoute = roleRoutes[activeIndex];
  console.log("selectedRoute",selectedRoute);

  if (!selectedRoute) return;

  router.push(selectedRoute);
};

  const cardBase = "p-4 rounded-lg cursor-pointer transition-all duration-200";
  const activeCard = "bg-blue-600 text-white";
  const inactiveCard = "secondaryColor";
  return (
    <>
      <section>
        <div className="container mx-auto md:w-[1100px] px-6 py-10">
          <div className="text-center">
                {/* <p className="text-sm"><span className="font-semibold">Step 1 of 3</span> Choose how you'll use Diaspora Insight </p> */}
            </div>
          <div className="flex justify-center items-center">
            
            <div className="w-full bg-white shadow-xl rounded-xl p-8">
              
              <div className="flex items-center">
                <p className="px-3 py-1 text-sm subHeadingColor rounded-full secondaryColor">
                  Role-aware onboarding
                </p>
                <p className="px-3 py-1 text-sm textColor">
                  We'll tailor the next steps to your role
                </p>
              </div>
              <h3 className="font-semibold headingColor my-4 text-2xl">
                Who are you signing up as?
              </h3>
              <p className="textColor pb-4 font-medium">
                Pick the option that best describes how you'll use the platform.
                You can invite other roles later.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div
                  onClick={() => setActiveIndex(0)}
                  className={`p-6 ${cardBase} ${
                    activeIndex === 0 ? activeCard : inactiveCard
                  }`}
                >
                  <div className="">
                    <div className="">
                      <h3
                        className={` font-semibold text-xl ${
                          activeIndex === 0 ? "text-white" : "subHeadingColor"
                        }`}
                      >
                        Diaspora investor
                      </h3>
                      <p
                        className={`text-base mb-4 mt-3 font-semibold ${
                          activeIndex === 0 ? "text-white" : "textColor"
                        }`}
                      >
                        Web workspace
                      </p>
                    </div>
                    <div className="">
                      <p
                        className={`w-fit text-sm mb-4 px-4 py-1 rounded-2xl ${
                          activeIndex === 0
                            ? "text-white primaryColor"
                            : "textColor bg-gray-200"
                        }`}
                      >
                        Track Portfolios
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className={`text-base mb-3 ${
                        activeIndex === 0 ? "text-white" : "textColor"
                      }`}
                    >
                      Monitor Nigerian businesses, compliance tiers, and
                      verified media-backed reports in one portfolio view.
                    </p>
                    <p
                      className={`text-base mb-3 ${
                        activeIndex === 0 ? "text-white" : "textColor"
                      }`}
                    >
                      Best if you are funding or supervising one or more
                      businesses from aboard.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setActiveIndex(1)}
                  className={`p-6 ${cardBase} ${
                    activeIndex === 1 ? activeCard : inactiveCard
                  }`}
                >
                  <div className="">
                    <div className="">
                      <h3
                        className={` font-semibold text-xl ${
                          activeIndex === 1 ? "text-white" : "subHeadingColor"
                        }`}
                      >
                        Business owner
                      </h3>
                      <p
                        className={`text-base mb-4 mt-3 font-semibold ${
                          activeIndex === 1 ? "text-white" : "textColor"
                        }`}
                      >
                        Mobile-first
                      </p>
                    </div>
                    <div className="">
                      <p
                        className={`w-fit text-sm mb-4 px-4 py-1 rounded-2xl ${
                          activeIndex === 1
                            ? "text-white primaryColor"
                            : "textColor bg-gray-200"
                        }`}
                      >
                        Submit updates
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className={`text-base mb-3 ${
                        activeIndex === 1 ? "text-white" : "textColor"
                      }`}
                    >
                      Capture daily sales, expenses, and photo/video evidence to
                      maintain your compliance tier.
                    </p>
                    <p
                      className={`text-base mb-3 ${
                        activeIndex === 1 ? "text-white" : "textColor"
                      }`}
                    >
                      Best if you run the Nigerian business and will submit
                      reports.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setActiveIndex(2)}
                  className={`p-6 ${cardBase} ${
                    activeIndex === 2 ? activeCard : inactiveCard
                  }`}
                >
                  <div className="">
                    <div className="">
                      <h3
                        className={` font-semibold text-xl ${
                          activeIndex === 2 ? "text-white" : "subHeadingColor"
                        }`}
                      >
                        Admin/Ops
                      </h3>
                      <p
                        className={`text-base mb-4 mt-3 font-semibold ${
                          activeIndex === 2 ? "text-white" : "textColor"
                        }`}
                      >
                        Restricted access
                      </p>
                    </div>
                    <div className="">
                      <p
                        className={`w-fit text-sm mb-4 px-4 py-1 rounded-2xl ${
                          activeIndex === 2
                            ? "text-white primaryColor"
                            : "textColor bg-gray-200"
                        }`}
                      >
                        Manage rules
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className={`text-base mb-3 ${
                        activeIndex === 2 ? "text-white" : "textColor"
                      }`}
                    >
                      Configure verification workflows, review red-flag alerts,
                      and manage users across the platform.
                    </p>
                    <p
                      className={`text-base mb-3 ${
                        activeIndex === 2 ? "text-white" : "textColor"
                      }`}
                    >
                      Best for operational teams, field officers, and compliance
                      leads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div>
                  <p className="mb-2">
                    Your choice will shape the onboarding flow.
                  </p>
                  <p className="text-sm">
                    All roles share a single source of truth for data and media.
                  </p>
                </div>
                <div className="flex gap-4">
                  {/* <button className="px-6 py-3 secondaryColor subHeadingColor rounded-md font-semibold hover:bg-blue-700">
                    Back
                  </button> */}
                  <button  onClick={onContinue} className="px-6 py-3 primaryColor text-white rounded-md font-semibold hover:bg-blue-700">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StepOne;
