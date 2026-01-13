"use client";

import OfficerLayout from "../components/OfficerLayout";
import { ScrollText, BriefcaseBusiness} from "lucide-react";

const details = [
  {
    bname: "Assign Business 1",
    owner: "Vishal Singh",
    category: "Retail",
    city: "Kab Gianyar",
    reports: "22",
  },
  {
    bname: "Assign Business 2",
    owner: "Vishal Singh",
    category: "Retail",
    city: "Kab Gianyar",
    reports: "22",
  },
  {
    bname: "Assign Business 3",
    owner: "Vishal Singh",
    category: "Retail",
    city: "Kab Gianyar",
    reports: "22",
  },
  {
    bname: "Assign Business 4",
    owner: "Vishal Singh",
    category: "Retail",
    city: "Kab Gianyar",
    reports: "22",
  },
];

export default function DashboardPage() {
  return (
    <OfficerLayout>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6 gap-5">
              <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <h5 className="subHeadingColor text-base">
                      Number of Business Assign
                    </h5>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      45
                    </h2>
                  </div>
                  <div className="absolute right-6 bottom-6">
                    <BriefcaseBusiness className="w-15 h-15" color="#cfdced" />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <h5 className="subHeadingColor text-base">
                      Number of Business Check
                    </h5>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      40
                    </h2>
                  </div>
                  <div className="absolute right-6 bottom-6">
                    <ScrollText className="w-15 h-15" color="#cfdced" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shadow-lg rounded-lg bg-white p-4">
            {/* Header */}
            <div className="flex justify-between items-center gap-3">
              <div>
                <h2 className="headingColor text-lg font-semibold">
                  Assign Business 
                </h2>
                <p className="textColor text-sm">
                  All businesses assign by Admin
                </p>
              </div>

              <a
                href="/field-officer/assign_business"
                className="textColor text-sm font-medium"
              >
                View all
              </a>
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="secondaryColor">
                    <th className="text-start p-2 border-[#f1f3f7] w-[25%]">
                      <h5 className="subHeadingColor text-base">Business </h5>
                    </th>
                    <th className="text-center p-2 border-[#f1f3f7] w-[18%]">
                      <h5 className="subHeadingColor text-base">Owner</h5>
                    </th>
                    <th className="text-center p-2 border-[#f1f3f7] w-[12%]">
                      <h5 className="subHeadingColor text-base">Category</h5>
                    </th>
                    <th className="text-center p-2 border-[#f1f3f7] w-[18%]">
                      <h5 className="subHeadingColor text-base">City</h5>
                    </th>
                    <th className="text-center p-2 border-[#f1f3f7] w-[12%]">
                      <h5 className="subHeadingColor text-base">Reports</h5>
                    </th>
                    {/* <th className="text-center p-2 border-[#f1f3f7] w-[15%]">
                      <h5 className="subHeadingColor text-base">Actions</h5>
                    </th> */}
                  </tr>
                </thead>

                <tbody>
                  {details.map((item) => (
                    <tr
                      key={item.bname}
                      className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 text-base font-semibold headingColor whitespace-nowrap">
                        {item.bname}
                      </td>
                      <td className="py-3 px-2 text-center textColor">
                        {item.owner}
                      </td>
                      <td className="p-2 py-4 border-b border-[#f1f3f7]">
                        <p className="text-blue-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                          {item.category}
                        </p>
                      </td>
                      <td className="py-3 px-2 text-center textColor">
                        {item.city}
                      </td>
                      
                      <td className="py-3 px-2 text-center textColor">
                        {item.reports}
                      </td>
                      {/* <td className="p-2 py-4 border-b text-center border-[#f1f3f7]">
                        <a
                          href="/field-officer/reports"
                          className="flex gap-2 justify-center items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OfficerLayout>
  );
}
