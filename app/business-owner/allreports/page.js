"use client";
import { useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import { Eye, X, BadgePercent, BadgeDollarSign, ScrollText, User } from "lucide-react";

export default function AllReports() {
    const [openmodel, setOpenModel] = useState(false);

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
    ];
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
                                <p className="textColor text-sm">
                                    8 Reports Submitted
                                </p>
                            </div>

                        </div>

                        {/* Table */}
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full min-w-[640px] border-collapse">
                                <thead>
                                    <tr className="secondaryColor text-left text-sm textColor">
                                        <th className="py-3 px-2 w-[28%]">Date</th>
                                        <th className="py-3 px-2 w-[15%]">Sales</th>
                                        <th className="py-3 px-2 w-[15%]">Expenses</th>
                                        <th className="py-3 px-2 w-[15%]">Customers</th>
                                        <th className="py-3 px-2 w-[15%]">Profit / Loss</th>
                                        <th className="py-3 px-2 w-[12%]"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {details.map((item) => (
                                        <tr
                                            key={item.date}
                                            className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-2 text-base font-semibold headingColor whitespace-nowrap">
                                                {item.date}
                                            </td>
                                            <td className="py-3 px-2 font-medium">
                                                ${item.sales}
                                            </td>
                                            <td className="py-3 px-2 text-red-500">
                                                ${item.expenses}
                                            </td>
                                            <td className="py-3 px-2">
                                                {item.customer}
                                            </td>
                                            <td className="py-3 px-2 text-green-600 font-semibold">
                                                {item.pftlos}
                                            </td>
                                            <td className="py-3 px-2">
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
                  <h5 className="text-sm font-semibold subHeadingColor">Sales</h5>
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
                  <h5 className="text-sm font-semibold subHeadingColor">Expenses</h5>
                  <h3 className="text-lg font-semibold headingColor">
                    $1000
                  </h3>
                </div>
                <div>
                  <ScrollText className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">Customers</h5>
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
              <p className="headingColor text-xs font-semibold">Submitted on 11 December 2025</p>
            </div>
          </div>
        </div>
      )}
        </>
    );
}
