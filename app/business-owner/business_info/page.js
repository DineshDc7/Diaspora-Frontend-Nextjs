"use client";
import { useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
const details = [
  {
    business_name: "Nairobi Fresh Mart 1",
    owner_name: "John Don",
    number: "8989675847",
    category: "Retail",
    city: "Noida",
  },
  {
    business_name: "Nairobi Fresh Mart 2",
    owner_name: "John Don",
    number: "8989675847",
    category: "Retail",
    city: "Noida",
  },
  {
    business_name: "Nairobi Fresh Mart 3",
    owner_name: "John Don",
    number: "8989675847",
    category: "Retail",
    city: "Noida",
  },
  {
    business_name: "Nairobi Fresh Mart 4",
    owner_name: "John Don",
    number: "8989675847",
    category: "Retail",
    city: "Noida",
  },
  {
    business_name: "Nairobi Fresh Mart 5",
    owner_name: "John Don",
    number: "8989675847",
    category: "Retail",
    city: "Noida",
  },
  {
    business_name: "Nairobi Fresh Mart 6",
    owner_name: "John Don",
    number: "8989675847",
    category: "Retail",
    city: "Noida",
  },
];

export default function BusinessInfo() {


const ITEMS_PER_PAGE = 5;

const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(details.length / ITEMS_PER_PAGE);

const paginatedDetails = details.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


  return (
    <BusinessLayout>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
            {/* <h1 className="headingColor text-lg font-semibold mb-10">Adams Baker <span className="text-base text-gray-500">(Owner)</span></h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3">
                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-3 rounded-4xl"><PhoneCall className="w-5 h-5 text-blue-500"/></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">Phone</h3>
                                        <p className="text-lg"><a href="#">8876787678</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-3 rounded-4xl"><ChartColumnStacked className="w-5 h-5 text-blue-500" /></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">Category</h3>
                                        <p className="text-lg"><a href="#">Retail</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-3 rounded-4xl"><Building2 className="w-5 h-5 text-blue-500" /></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">City</h3>
                                        <p className="text-lg"><a href="#">Nairobi</a></p>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse border border-neutral-100">
                <thead>
                  <tr className="secondaryColor text-center subHeadingColor text-base">
                    <th className="p-4 w-[30%] text-start">
                      Business Name
                    </th>
                    <th className="p-4 w-[19%]">Owner Name</th>
                    <th className="p-4 w-[17%]">Phone</th>
                    <th className="p-4 w-[17%]">Category</th>
                    <th className="p-4 w-[17%]">City</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedDetails.map((item) => (
                    <tr
                      key={item.business_name}
                      className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                    >
                      <td className="p-4 text-base font-semibold headingColor whitespace-nowrap">
                        {item.business_name}
                      </td>
                      <td className="p-4 textColor text-center">
                        {item.owner_name}
                      </td>
                      <td className="p-4 textColor text-center">
                        {item.number}
                      </td>
                      <td className="p-4 textColor text-center">
                        {item.category}
                      </td>
                      <td className="p-4 textColor text-center">
                        {item.city}
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
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
}
