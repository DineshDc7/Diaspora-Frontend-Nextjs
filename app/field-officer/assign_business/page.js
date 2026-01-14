"use client";
  import { useState } from "react";
import { useIsMobile } from "@/app/hooks/use-mobile";
import OfficerLayout from "../components/OfficerLayout";
import { ScrollText, BadgeDollarSign, Eye } from "lucide-react";

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
  {
    bname: "Assign Business 5",
    owner: "Vishal Singh",
    category: "Retail",
    city: "Kab Gianyar",
    reports: "22",
  },
  {
    bname: "Assign Business 6",
    owner: "Vishal Singh",
    category: "Retail",
    city: "Kab Gianyar",
    reports: "22",
  },
];

export default function DashboardPage() {
  const isMobile = useIsMobile();


const ITEMS_PER_PAGE = 5;
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(details.length / ITEMS_PER_PAGE);

const paginatedDetails = details.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);



  return (
    <OfficerLayout title="Assign Business" subtitle="">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          <div className="shadow-lg rounded-lg bg-white p-4">
            {/* Header */}
            <div className="flex justify-between items-center gap-3">
              <div>
                  {/* <h2 className="headingColor text-lg font-semibold">
                    {
                    !isMobile ?
                      "All businesses assign by Admin" : "All assigned businesses"
                    }
                  </h2> */}


                {/* <p className="textColor text-sm">
                  All businesses assign by Admin
                </p> */}
              </div>

              {/* <a
                href="/field-officer/assign_business"
                className="textColor text-sm font-medium"
              >
                View all
              </a> */}
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse border border-neutral-100">
                <thead>
                  <tr className="secondaryColor text-left subHeadingColor text-base">
                    <th className="text-start p-4 border-[#f1f3f7] w-[25%]">
                      <h5 className="subHeadingColor text-base">Business </h5>
                    </th>
                    <th className="text-center p-4 border-[#f1f3f7] w-[18%]">
                      <h5 className="subHeadingColor text-base">Owner</h5>
                    </th>
                    <th className="text-center p-4 border-[#f1f3f7] w-[12%]">
                      <h5 className="subHeadingColor text-base">Category</h5>
                    </th>
                    <th className="text-center p-4 border-[#f1f3f7] w-[18%]">
                      <h5 className="subHeadingColor text-base">City</h5>
                    </th>
                    <th className="text-center p-4 border-[#f1f3f7] w-[12%]">
                      <h5 className="subHeadingColor text-base">Reports</h5>
                    </th>
                    <th className="text-center p-4 border-[#f1f3f7] w-[15%]">
                      <h5 className="subHeadingColor text-base">Actions</h5>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedDetails.map((item) => (
                    <tr
                      key={item.bname}
                      className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                    >
                      <td className="p-4 text-base font-semibold headingColor whitespace-nowrap">
                        {item.bname}
                      </td>
                      <td className="p-4 text-center textColor">
                        {item.owner}
                      </td>
                      <td className="p-2 py-4 border-b border-[#f1f3f7]">
                        <p className="text-blue-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                          {item.category}
                        </p>
                      </td>
                      <td className="p-4 text-center textColor">
                        {item.city}
                      </td>
                      
                      <td className="p-4 text-center textColor">
                        {item.reports}
                      </td>
                      <td className="p-4 border-b text-center border-[#f1f3f7]">
                        <a
                          href="/field-officer/reports"
                          className="flex gap-2 justify-center items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 text-sm border rounded-md ${
                        currentPage === i + 1
                          ? "bg-gray-900 text-white"
                          : "bg-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </OfficerLayout>
  );
}
