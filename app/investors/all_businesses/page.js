"use client";

import { useState } from "react";
import InvestorLayout from "../components/InvestorLayout";

const details = [
  {
    bname: "Kantor Imigrasi Kelas I Denpasar",
    owner: "Vishal Singh",
    category: "Retail",
    place: "KAB. ",
  },
  {
    bname: "Nairobi Fresh Mart",
    owner: "John Don",
    category: "Retail",
    place: "Nairobi",
  },
  {
    bname: "Blue Ocean Store",
    owner: "Alex Martin",
    category: "Wholesale",
    place: "Singapore",
  },
  {
    bname: "Green Valley Shop",
    owner: "Rohit Kumar",
    category: "Retail",
    place: "Delhi",
  },
];

export default function AllBusiness() {
  /* ===== Pagination Logic (ADDED) ===== */
  const ITEMS_PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(details.length / ITEMS_PER_PAGE);

  const paginatedData = details.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  /* ===== End Pagination Logic ===== */

  return (
    <InvestorLayout
      title="All Businesses"
      subtitle="Browse and Select Businesses to Follow"
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          <div className="shadow-lg rounded-lg bg-white p-4">
            <div>
              <p className="textColor text-base">
                Select businesses you want to follow and track their daily
                reports
              </p>
            </div>
            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse border border-neutral-100">
                <thead>
                  <tr className="secondaryColor text-left subHeadingColor text-base">
                    <th className="p-4 w-[30%]">Business Name</th>
                    <th className="p-4 w-[17%] text-center">
                      Owner Name
                    </th>
                    <th className="p-4 w-[17%] text-center">Category</th>
                    <th className="p-4 w-[18%] text-center">Place</th>
                    <th className="p-4 w-[18%] text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((item) => (
                    <tr
                      key={item.bname}
                      className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                    >
                      <td className="p-4 text-sm font-semibold headingColor whitespace-nowrap">
                        {item.bname}
                      </td>
                      <td className="p-4 text-center">{item.owner}</td>
                      <td className="p-4 text-center">{item.category}</td>
                      <td className="p-4 text-center">{item.place}</td>
                      <td className="p-4 text-center">
                        <button className="primaryColor text-white font-semibold text-sm rounded-md px-3 py-1">
                          Follow
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ===== Pagination UI (ADDED) ===== */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
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
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
            {/* ===== End Pagination UI ===== */}
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
}
