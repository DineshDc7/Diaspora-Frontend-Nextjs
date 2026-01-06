"use client";
import { Users, User, Pencil, X, Eye, BadgeDollarSign, ScrollText, BadgePercent } from "lucide-react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
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

];
export default function BusinessReport() {

        const isMobile = useIsMobile();
    
    return (
        <InvestorLayout title="Business Reports" subtitle="8 Reports from 2 Businesses">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
                <div className="xl:col-span-4 space-y-6">
                   <div className="flex justify-between items-center">
                <div className="flex gap-3">

                  <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-md">☰</button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">Reports</h1>
                    <p className="py-2 text-sm textColor">8 total Reports</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 mt-5 mb-4">
                <div className={`${!isMobile ? "flex gap-4 items-center" : ""}`}>
                  {/* Label */}
                  <span className="text-sm font-semibold mr-4 text-gray-700">
                    Filter by Business:
                  </span>

                  {/* Select */}
                  <div className="w-[250px]">
                    <Listbox value={selectedBusiness} onChange={setSelectedBusiness}>
                      <div className="relative mt-1">
                        {/* Button */}
                        <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 outline:none bg-white py-2 pl-3 pr-10 text-left text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="block truncate">
                            {selectedBusiness || "Select business"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDown
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        {/* Options */}
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {businesses.map((business) => (
                            <Listbox.Option
                              key={business}
                              value={business}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                }`
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                      }`}
                                  >
                                    {business}
                                  </span>

                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>

                </div>
                {/* Clear Filter */}
                {selectedBusiness && (
                  <button
                    // onClick={clearFilter}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {/* <div className="bg-neutral-50 p-4 mt-3"> */}
              <div className="py-5 overflow-x-auto">
                <table className="min-w-[900px] w-full table-fixed p-2 border border-[#f1f3f7]">
                  <thead>
                    <tr>
                      <th className="text-start p-4 border-b border-gray-100 w-[20%]">
                        <h5 className="subHeadingColor text-base">Business</h5>
                      </th>
                      <th className="text-start p-4 border-b border-gray-100 w-[10%]">
                        <h5 className="subHeadingColor text-base">Date</h5>
                      </th>
                      <th className="text-start p-4 border-b border-gray-100 w-[20%]">
                        <h5 className="subHeadingColor text-base">Sales</h5>
                      </th>
                      <th className="text-start p-4 border-b border-gray-100 w-[10%]">
                        <h5 className="subHeadingColor text-base">Expenses</h5>
                      </th>
                      <th className="text-start p-4 border-b border-gray-100 w-[20%]">
                        <h5 className="subHeadingColor text-base">Customers</h5>
                      </th>
                      <th className="text-start p-4 border-b border-gray-100 w-[10%]">
                        <h5 className="subHeadingColor text-base">Profit</h5>
                      </th>
                      <th className="text-start p-4 border-b border-gray-100 w-[10%]">
                        <h5 className="subHeadingColor text-base">Actions</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4">
                        <h4 className="headingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setOpenModel(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <h4 className="headingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setOpenModel(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <h4 className="headingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setOpenModel(true)}
                          className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                        >
                          <Eye className="w-5 h-5" /> View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <h4 className="headingColor font-semibold text-sm">
                          Nairobi Fresh Mart
                        </h4>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">
                          12/12/2025
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-600 text-sm font-semibold">
                          $1,199.91
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-red-600 text-sm font-semibold">
                          $2000
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="textColor text-sm font-semibold">23</p>
                      </td>
                      <td className="p-4">
                        <p className="text-green-700 text-sm font-semibold">
                          $500
                        </p>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setOpenModel(true)}
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
        </InvestorLayout>
    );
}
