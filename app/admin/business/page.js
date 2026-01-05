"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Building2, Eye, X } from "lucide-react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
export default function AdminBusiness() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
const isMobile = useIsMobile();
  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar open={open} setOpen={setOpen} />

        <main className="flex-1 md:ml-64 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="mb-2 flex items-center gap-3">
                  <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-md">☰</button>
                  <div>
                    {!isMobile ? (<h1 className="text-2xl font-semibold headingColor">
                      Businesses
                    </h1>):(<h1 className="text-2xl font-semibold headingColor">
                      Businesses
                    </h1>)}
                    <p className="py-2 text-sm textColor">
                      Managing 4 businesses
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="primaryColor text-white text-sm font-semibold p-2 rounded-md flex gap-2"
                  >
                    <Building2 className="w-5 h-5" /> Add Business
                  </button>
                </div>
              </div>

              <div className="shadow-md rounded-lg p-4 mb-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Businesses"
                    className="w-full rounded-lg border text-sm border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="py-5 overflow-x-auto">
                  <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[28%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">
                            Business
                          </h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Owner</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">
                            Category
                          </h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[18%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">City</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Reports</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="headingColor font-semibold text-sm">
                              Kantor imigrasi kelas i denpasar
                            </h4>
                            <p className="textColor text-xs">9910566557</p>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Vishal Singh</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                            Retail
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Kab Gianyar</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">0</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="/admin/allreports"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Eye className="w-5 h-5" /> View Reports
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="headingColor font-semibold text-sm">
                              Kantor imigrasi kelas i denpasar
                            </h4>
                            <p className="textColor text-xs">9910566557</p>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Vishal Singh</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                            Retail
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Kab Gianyar</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">0</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="/admin/allreports"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Eye className="w-5 h-5" /> View Reports
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="headingColor font-semibold text-sm">
                              Kantor imigrasi kelas i denpasar
                            </h4>
                            <p className="textColor text-xs">9910566557</p>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Vishal Singh</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                            Retail
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Kab Gianyar</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">0</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="/admin/allreports"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Eye className="w-5 h-5" /> View Reports
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="headingColor font-semibold text-sm">
                              Kantor imigrasi kelas i denpasar
                            </h4>
                            <p className="textColor text-xs">9910566557</p>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Vishal Singh</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                            Retail
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">Kab Gianyar</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">0</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="/admin/allreports"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Eye className="w-5 h-5" /> View Reports
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Business</h2>
              <button onClick={() => setOpenModal(false)}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {/* Body */}
            <form className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="ABC Store"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Owner Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Owner Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1234567890"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Restaurant, Retail, etc."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full"
                >
                  Create Business
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
