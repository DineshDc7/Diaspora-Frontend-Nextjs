"use client";
import Header from "./components/Header";
import { useRouter } from "next/navigation";

export default function Home() {
 const router = useRouter();

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="px-6 py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 gap-5 items-center">
            {/* Left Content */}
            <div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 text-xs subHeadingColor rounded-full secondaryColor">
                  Built for Diaspora investors & Nigerian Business Owners
                </span>
                <span className="px-3 py-1 text-xs bg-green-700 text-white rounded-full text-center">
                  High-trust reporting
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight headingColor">
                High-trust accountability for diaspora investors and Nigerian
                businesses.
              </h1>

              <p className="mt-4 textColor max-w-xl">
                Track real-world performance, compliance and media-backed
                updates from Nigerian businesses in one shared workspace — for
                investors, owners and admin teams.
              </p>

              <div className="mt-6 flex gap-4">
                <button onClick={() => router.push("/signup")} className="px-6 py-3 primaryColor text-white rounded-md font-semibold hover:bg-blue-700 cursor-pointer">
                  Get started
                </button>
                <button onClick={() => router.push("/login")} className="px-6 py-3 secondaryColor subHeadingColor font-semibold rounded-md hover:bg-gray-50 cursor-pointer">
                  Log in
                </button>
              </div>

              <ul className="mt-8 space-y-3 mb-8 text-sm textColor">
                <li>
                  ✔ Role-aware onboarding for diaspora, owners, and admins
                </li>
                <li>✔ Data-first dashboards, timelines, and media evidence</li>
              </ul>

              <p className="mt-6 text-sm textColor">
                No long forms. Start with your role, then add businesses and
                reporting flows at your own pace.
              </p>
            </div>

            {/* Right Card */}
            <div className="bg-white shadow-xl rounded-xl md:p-8 p-4">
              <div className="flex items-center justify-between mb-6">
                <div className=" w-[50%] md:w-auto">
                  <h3 className="font-semibold headingColor">
                    Portfolio overview
                  </h3>
                  <p className="text-xs subHeadingColor">
                    Unified view for diaspora investors
                  </p>
                </div>
                <span className="text-xs bg-yellow-500 headingColor px-3 py-1 rounded-full">
                  Gold tier compliance
                </span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Dashboard"
                className="rounded-lg mb-4 h-[300px] w-full object-cover"
              />

              <div className="grid md:grid-cols-3 gap-2 text-xs">
                {[
                  {
                    title: "Diaspora investor",
                    subtitle: "Web",
                    desc: "Monitor businesses, alerts and verified reports.",
                  },
                  {
                    title: "Business owner",
                    subtitle: "Mobile First",
                    desc: "Submit daily updates, media and compliance tasks.",
                  },
                  {
                    title: "Admin",
                    subtitle: "Ops control",
                    desc: "Manage users, rules and verification pipelines.",
                  },
                ].map((item, i) => (
                  <div key={i} className="secondaryColor p-4 rounded-md">
                    <div className="justify-between items-center">
                      <p className="font-semibold subHeadingColor text-base">
                        {/* {item.title.split(" ").map((word, index) => ( */}
                          {/* <span key={index} className="block"> */}
                          <span className="block">
                            {item.title}
                          </span>
                        {/* ))} */}
                      </p>
                      <p className="font-semibold text-sm textColor">
                        {item.subtitle}
                      </p>
                    </div>
                    <p className="textColor text-sm mt-3">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="md:flex justify-between mt-4 text-xs text-gray-500">
                <p className="textColor text-sm">
                  Real-time compliance and media-backed logs
                </p>
                <p className="textColor text-sm">
                  Businesses:{" "}
                  <span className="font-bold subHeadingColor">48</span>
                </p>
                <p className="textColor text-sm">
                  On-time reports:{" "}
                  <span className="font-bold subHeadingColor">92%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
