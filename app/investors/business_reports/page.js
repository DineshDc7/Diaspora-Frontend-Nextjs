"use client";
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
import { useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import InvestorLayout from "../components/InvestorLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reports = [
  {
    business: "Nairobi Fresh Mart 1",
    date: "12/12/2025",
    sales: "$1,345.91",
    expenses: "$56757",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart 2",
    date: "12/12/2025",
    sales: "$1,1399.91",
    expenses: "$200044",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart 3",
    date: "12/12/2025",
    sales: "$1,567.91",
    expenses: "$2044400",
    customers: 23,
    profit: "$500",
  },
  {
    business: "Nairobi Fresh Mart 4",
    date: "12/12/2025",
    sales: "$1,67.91",
    expenses: "$5555",
    customers: 23,
    profit: "$500",
  },
];

const businesses = [
  "Nairobi Fresh Mart",
  "ABC Store",
  "Green Valley Foods",
  "Urban Retail",
];
export default function BusinessReport() {
  const [openmodel, setOpenModel] = useState(false);
  const [selectedBusiness, setSelectedBusiness] =
    useState("Nairobi Fresh Mart");

  const ITEMS_PER_PAGE = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);

  const paginatedReports = reports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isMobile = useIsMobile();

  return (
    <>
      <InvestorLayout
        title="Business Reports"
        subtitle="8 Reports from 2 Businesses"
      >
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          <div className="xl:col-span-4 space-y-6">
            <div className="shadow-lg rounded-lg bg-white p-4">
              <div className="mb-5 md:mb-0">
              <h5 className="text-sm font-semibold mb-2 text-gray-700">
                Filter by Business:
              </h5>

              <div className="flex items-center justify-between gap-4">
                {/* Select */}
                <div className="w-[60dvw] md:w-[250px]">
                  <Select
                    value={selectedBusiness ?? ""}
                    onValueChange={(value) => setSelectedBusiness(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select business" />
                    </SelectTrigger>
                    <SelectContent>
                      {businesses.map((business) => (
                        <SelectItem key={business} value={business}>
                          {business}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filter */}
                {/* {selectedBusiness && ( */}
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Clear Filter
                </button>
                {/* )} */}
              </div>
            </div>

            {/* <div className="bg-neutral-50 p-4 mt-3"> */}
            <div className="py-5 overflow-x-auto">
              <table className="border-collapse  min-w-[800px] w-full table-fixed p-2 border border-[#f1f3f7]">
                <thead>
                  <tr className="secondaryColor text-left subHeadingColor text-base">
                    <th className="text-start p-4 border-b border-gray-100 w-[18%]">
                      <h5 className="subHeadingColor text-base">Business</h5>
                    </th>
                    <th className="text-center p-4 border-b border-gray-100 w-[13%]">
                      <h5 className="subHeadingColor text-base">Date</h5>
                    </th>
                    <th className="text-center p-4 border-b border-gray-100 w-[16%]">
                      <h5 className="subHeadingColor text-base">Sales</h5>
                    </th>
                    <th className="text-center p-4 border-b border-gray-100 w-[13%]">
                      <h5 className="subHeadingColor text-base">Expenses</h5>
                    </th>
                    <th className="text-center p-4 border-b border-gray-100 w-[12%]">
                      <h5 className="subHeadingColor text-base">Customers</h5>
                    </th>
                    <th className="text-center p-4 border-b border-gray-100 w-[15%]">
                      <h5 className="subHeadingColor text-base">Profit/Loss</h5>
                    </th>
                    <th className="text-center p-4 border-b border-gray-100 w-[13%]">
                      <h5 className="subHeadingColor text-base">Actions</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-4">
                        <h4 className="headingColor font-semibold text-sm">
                          {row.business}
                        </h4>
                      </td>

                      <td className="p-4 text-center">
                        <p className="textColor text-sm font-semibold">
                          {row.date}
                        </p>
                      </td>

                      <td className="p-4 text-center">
                        <p className="text-green-600 text-sm font-semibold">
                          {row.sales}
                        </p>
                      </td>

                      <td className="p-4 text-center">
                        <p className="text-red-600 text-sm font-semibold">
                          {row.expenses}
                        </p>
                      </td>

                      <td className="p-4 text-center">
                        <p className="textColor text-sm font-semibold">
                          {row.customers}
                        </p>
                      </td>

                      <td className="p-4 text-center">
                        <p className="text-green-700 text-sm font-semibold">
                          {row.profit}
                        </p>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => setOpenModel(true)}
                          className="flex gap-2 mx-auto items-center textprimaryColor text-sm font-semibold"
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
      </InvestorLayout>

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
            <div className="px-6 pb-6">
              <h5 className="text-sm font-semibold subHeadingColor">Notes</h5>
              <p className="text-sm">Daily Operations running smoothly </p>
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
