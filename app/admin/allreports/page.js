"use client";

import Sidebar from "../components/Sidebar";
import {
  Users,
  User,
  Pencil,
  X,
  Eye,
  BadgeDollarSign,
  ScrollText,
  BadgePercent,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
const businesses = [
  "Nairobi Fresh Mart",
  "ABC Store",
  "Green Valley Foods",
  "Urban Retail",
];
const ITEMS_PER_PAGE = 5;
const data = [
  {
    business: "Nairobi Fresh Mart",
    date: "12/12/2025",
    sales: "$1,199.91",
    expenses: "$2000",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart",
    date: "7/12/2025",
    sales: "$1,199.91",
    expenses: "$2000",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart",
    date: "8/12/2025",
    sales: "$1,199.91",
    expenses: "$2000",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart",
    date: "6/12/2025",
    sales: "$1,199.91",
    expenses: "$2000",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart",
    date: "14/12/2025",
    sales: "$1,199.91",
    expenses: "$2000",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart",
    date: "3/12/2025",
    sales: "$1,199.91",
    expenses: "$2000",
    customers: 23,
    profit: "$500",
  },
];
export default function AdminReport({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const [openmodel, setOpenModel] = useState(false);
  const [selectedBusiness, setSelectedBusiness] =
    useState("Nairobi Fresh Mart");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };
  const filteredData = data.filter((item) => {
    if (!startDate && !endDate) return true;

    const itemDate = parseDate(item.date);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;

    if (from && itemDate < from) return false;
    if (to && itemDate > to) return false;

    return true;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate]);

  const isMobile = useIsMobile();

  // const clearFilter = () => {
  //   setSelectedBusiness("");
  // };

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar open={open} setOpen={setOpen} />

        <main className="flex-1 md:ml-64 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpen(true)}
                    className="md:hidden p-2 rounded-md"
                  >
                    ☰
                  </button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">
                      Reports
                    </h1>
                    <p className="py-2 text-sm textColor">8 total Reports</p>
                  </div>
                </div>
              </div>

              <div className="lg:flex items-center justify-between">
                <div className="mb-5 md:mb-0">
                  <h5 className="text-sm font-semibold mb-2 text-gray-700">
                    Filter by Business:
                  </h5>
                  <div className="flex items-center gap-4">
                    <div className="w-[60dvw] md:w-[250px]">
                      <Listbox
                        value={selectedBusiness}
                        onChange={setSelectedBusiness}
                      >
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
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
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
                    <div>
                      {selectedBusiness && (
                        <button className="text-sm font-semibold text-blue-600 hover:underline">
                          Clear Filter
                        </button>
                      )}
                    </div>
                  </div>
                </div>


                        {!isMobile && (
                <div className="flex gap-4 items-end">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      From:
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block border mt-2 border-gray-300 rounded-md md:px-3 py-2 px-1 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      To:
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="block border border-gray-300 mt-2 rounded-md md:px-3 py-2 px-1 text-xs"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                    }}
                    className="text-sm md:pb-2.5 pb-2 font-semibold text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>
                        )}



                        {isMobile && (
                <div className="flex gap-4 items-end">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      From:
                    </label>

                    <div className="relative">
                      {!startDate && (
                        <span className="pointer-events-none w-[30dvw] md:w-full absolute left-3 top-2.5 text-xs text-gray-400">
                          From
                        </span>
                      )}

                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`block w-full border border-gray-300 rounded-md px-3 py-2 text-xs
                            ${!startDate ? "text-transparent" : "text-gray-900"}
                          `}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">
                      To:
                    </label>
                    <div className="relative">
                      {!endDate && (
                        <span className="pointer-events-none w-[30dvw] md:w-full absolute left-3 top-2.5 text-xs text-gray-400">
                          To
                        </span>
                      )}
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={`block w-full border border-gray-300 rounded-md px-3 py-2 text-xs
                        ${!endDate ? "text-transparent" : "text-gray-900"}
                      `}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                    }}
                    className="text-sm md:pb-2.5 pb-2 font-semibold text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>
                        )}





              </div>

              {/* <div className="bg-neutral-50 p-4 mt-3"> */}
              {!isMobile && (
                <div className="py-5 overflow-x-auto">
                  <table className="min-w-[900px] w-full table-fixed p-2 border border-[#f1f3f7]">
                    <thead>
                      <tr>
                        <th className="text-start p-4 border-b border-gray-100 w-[20%]">
                          <h5 className="subHeadingColor text-base">
                            Business
                          </h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[10%]">
                          <h5 className="subHeadingColor text-base">Date</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[15%]">
                          <h5 className="subHeadingColor text-base">Sales</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[15%]">
                          <h5 className="subHeadingColor text-base">
                            Expenses
                          </h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[14%]">
                          <h5 className="subHeadingColor text-base">
                            Customers
                          </h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[14%]">
                          <h5 className="subHeadingColor text-base">Profit</h5>
                        </th>
                        <th className="text-start p-4 border-b border-gray-100 w-[12%]">
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="p-4">
                            <h4 className="headingColor font-semibold text-sm">
                              {item.business}
                            </h4>
                          </td>
                          <td className="p-4 text-sm font-semibold textColor">
                            {item.date}
                          </td>
                          <td className="p-4 text-center text-green-600 text-sm font-semibold">
                            {item.sales}
                          </td>
                          <td className="p-4 text-center text-red-600 text-sm font-semibold">
                            {item.expenses}
                          </td>
                          <td className="p-4 text-center text-sm font-semibold textColor">
                            {item.customers}
                          </td>
                          <td className="p-4 text-center text-green-700 text-sm font-semibold">
                            {item.profit}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => setOpenModel(true)}
                              className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                            >
                              <Eye className="w-5 h-5" /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mobile Cards */}
              {isMobile && (
                <div className="space-y-4">
                  {paginatedData.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="headingColor font-semibold text-sm">
                            {item.business}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Date: {item.date}
                          </p>
                        </div>

                        <button
                          onClick={() => setOpenModel(true)}
                          className="textprimaryColor text-sm font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" /> View
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-sm">
                            Sales:
                            <span className="font-semibold text-xs text-green-600">
                              {" "}
                              {item.sales}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Expenses:
                            <span className="font-semibold text-xs text-red-600">
                              {" "}
                              {item.expenses}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Customers:
                            <span className="font-semibold text-xs ">
                              {" "}
                              {item.customers}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Profit:
                            <span className="font-semibold text-xs text-green-700">
                              {" "}
                              {item.profit}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
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

              {/* </div> */}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {openmodel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-lg pb-5">
            {/* Header */}
            <div className="mb-4 flex items-center rounded-t-lg justify-between p-4 primaryColor">
              <h2 className="text-lg font-semibold text-white">Daily Report</h2>
              <button onClick={() => setOpenModel(false)}>
                <X className="h-5 w-5" color="#ffffffff" />
              </button>
            </div>
            <h5 className="text-base headingColor px-6">Nairobi Fresh Mart</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">
                    Sales
                  </h5>
                  <h3 className="text-lg font-semibold headingColor">
                    $1199.91
                  </h3>
                </div>
                <div>
                  <BadgeDollarSign className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">
                    Expenses
                  </h5>
                  <h3 className="text-lg font-semibold headingColor">$1000</h3>
                </div>
                <div>
                  <ScrollText className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">
                    Customers
                  </h5>
                  <h3 className="text-lg font-semibold headingColor">25</h3>
                </div>
                <div>
                  <User className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">
                    Net Profit/Loss{" "}
                  </h5>
                  <h3 className="text-lg font-semibold headingColor">
                    $-800.09
                  </h3>
                </div>
                <div>
                  <BadgePercent className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 p-6">
              <button className="w-full p-4 bg-blue-50 textprimaryColor font-semibold rounded-md">
                View Photo
              </button>
              <button className="w-full p-4 bg-blue-50 textprimaryColor font-semibold rounded-md">
                View Video
              </button>
            </div>
            <div className="px-6 pt-2 border-t border-gray-300">
              <p className="headingColor text-xs font-semibold">
                Submitted on 11 December 2025
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
