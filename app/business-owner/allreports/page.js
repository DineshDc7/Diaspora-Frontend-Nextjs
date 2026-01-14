"use client";
import { useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import {
  Eye,
  X,
  BadgePercent,
  BadgeDollarSign,
  ScrollText,
  User,
} from "lucide-react";
const details = [
  {
    date: "06 January 2026",
    sales: "2700",
    expenses: "456",
    customer: "334",
    pftlos: "+$44.33",
  },
  {
    date: "05 January 2026",
    sales: "2734",
    expenses: "544",
    customer: "222",
    pftlos: "+$44.33",
  },
  {
    date: "04 January 2026",
    sales: "2700",
    expenses: "456",
    customer: "334",
    pftlos: "+$44.33",
  },
  {
    date: "03 January 2026",
    sales: "2700",
    expenses: "456",
    customer: "334",
    pftlos: "+$44.33",
  },
  {
    date: "02 January 2026",
    sales: "2700",
    expenses: "456",
    customer: "334",
    pftlos: "+$44.33",
  },
  {
    date: "01 January 2026",
    sales: "2734",
    expenses: "544",
    customer: "222",
    pftlos: "+$44.33",
  },
  {
    date: "09 January 2026",
    sales: "2700",
    expenses: "456",
    customer: "334",
    pftlos: "+$44.33",
  },
];
export default function AllReports() {
  const [openmodel, setOpenModel] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(details.length / ITEMS_PER_PAGE);

  const paginatedDetails = details.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <BusinessLayout>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          <div className="xl:col-span-4 space-y-6">
            <div className="shadow-lg rounded-lg bg-white p-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h2 className="headingColor text-lg font-semibold">
                    All Reports
                  </h2>
                  <p className="textColor text-sm">8 Reports Submitted</p>
                </div>
              </div>

              {/* Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse border border-neutral-100">
                  <thead>
                    <tr className="secondaryColor text-left subHeadingColor text-base">
                      <th className="p-4 w-[21%]">Date</th>
                      <th className="p-4 w-[16%] text-center">Sales</th>
                      <th className="p-4 w-[16%] text-center">
                        Expenses
                      </th>
                      <th className="p-4 w-[16%] text-center">
                        Customers
                      </th>
                      <th className="p-4 w-[16%] text-center">
                        Profit / Loss
                      </th>
                      <th className="p-4 w-[15%] text-center"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedDetails.map((item) => (
                      <tr
                        key={item.date}
                        className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                      >
                        <td className="p-4 text-base font-semibold headingColor whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="p-4 text-center textColor font-medium">
                          ${item.sales}
                        </td>
                        <td className="p-4 text-center text-red-500">
                          ${item.expenses}
                        </td>
                        <td className="p-4 text-center textColor">
                          {item.customer}
                        </td>
                        <td className="p-4 text-center text-green-600 font-semibold">
                          {item.pftlos}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setOpenModel(true)}
                            className="flex gap-2 items-center mx-auto textprimaryColor text-sm font-semibold"
                          >
                            <Eye className="w-5 h-5" /> View
                          </button>
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
      </BusinessLayout>

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
