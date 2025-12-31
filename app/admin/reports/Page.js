"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Users, User, Pencil, X, Eye } from "lucide-react";
import { useState } from "react";

const businesses = [
  "Nairobi Fresh Mart",
  "ABC Store",
  "Green Valley Foods",
  "Urban Retail",
];
export default function AdminUser() {
  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] =
    useState("Nairobi Fresh Mart");

  const clearFilter = () => {
    setSelectedBusiness("");
  };

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar />

        <main className="flex-1 ml-64 p-6">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="headingColor text-lg font-semibold">Reports</h2>
                <p className="textColor">8 total reports</p>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-5 mb-4">
              <div>
                {/* Label */}
                <span className="text-sm font-semibold mr-4 text-gray-700">
                  Filter by Business:
                </span>

                {/* Select */}
                <select
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                  className="min-w-[250px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select business</option>
                  {businesses.map((business) => (
                    <option key={business} value={business}>
                      {business}
                    </option>
                  ))}
                </select>
              </div>
              {/* Clear Filter */}
              {selectedBusiness && (
                <button
                  onClick={clearFilter}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Clear Filter
                </button>
              )}
            </div>

            <div className="bg-neutral-50 p-4 mt-3">
              <div className="">
                <table className="table-fixed w-full">
                  <thead>
                    <tr>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Business</h5>
                      </th>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Date</h5>
                      </th>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Sales</h5>
                      </th>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Expenses</h5>
                      </th>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Customers</h5>
                      </th>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Profit</h5>
                      </th>
                      <th className="text-start pb-4 border-b border-gray-100">
                        <h5 className="subHeadingColor text-base">Actions</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <h4 className="subHeadingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => setOpen(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">
                        <h4 className="subHeadingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => setOpen(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">
                        <h4 className="subHeadingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => setOpen(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4">
                        <h4 className="subHeadingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="py-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="py-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => setOpen(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-lg pb-5">
            {/* Header */}
            <div className="mb-4 flex items-center rounded-t-lg justify-between p-4 primaryColor">
              <h2 className="text-lg font-semibold text-white">Daily Report</h2>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" color="#ffffffff" />
              </button>
            </div>
            <h5 className="text-base headingColor px-6">Nairobi Fresh Mart</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-neutral-50 rounded-md">
                <h5 className="text-sm font-semibold headingColor">Sales</h5>
                <h3 className="text-lg font-semibold subHeadingColor">
                  $1199.91
                </h3>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-neutral-50 rounded-md">
                <h5 className="text-sm font-semibold headingColor">Expenses</h5>
                <h3 className="text-lg font-semibold subHeadingColor">
                  $1000
                </h3>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-neutral-50 rounded-md">
                <h5 className="text-sm font-semibold headingColor">
                  Customers
                </h5>
                <h3 className="text-lg font-semibold subHeadingColor">
                  25
                </h3>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-neutral-50 rounded-md">
                <h5 className="text-sm font-semibold headingColor">
                  Net Profit/Loss{" "}
                </h5>
                <h3 className="text-lg font-semibold subHeadingColor">
                  $-800.09
                </h3>
              </div>
            </div>
            <div className="p-6">
              <button className="w-full p-4 bg-blue-50 textprimaryColor font-semibold rounded-md">
                View Photo
              </button>
            </div>
            <div className="px-6 pt-2 border-t border-gray-300">
                <p className="headingColor text-xs font-semibold">Submitted on 11 December 2025</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
