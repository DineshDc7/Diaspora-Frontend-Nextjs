import React from "react";
import { Eye } from "lucide-react";

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

const DailyReport = () => {
  return (
    <div className="shadow-lg rounded-lg bg-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="headingColor text-lg font-semibold">
            Recent Reports
          </h2>
          <p className="textColor text-sm">
            Click on a report to view details
          </p>
        </div>

        <a href="/business-owner/allreports" className="textColor text-sm font-medium">
          View all
        </a>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse border border-neutral-100">
          <thead>
            <tr className="secondaryColor text-left text-sm textColor">
              <th className="p-4 w-[24%]">Date</th>
              <th className="p-4 w-[19%] text-center">Sales</th>
              <th className="p-4 w-[19%] text-center">Expenses</th>
              <th className="p-4 w-[19%] text-center">Customers</th>
              <th className="p-4 w-[19%] text-center">Profit / Loss</th>
            </tr>
          </thead>

          <tbody>
            {details.map((item) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyReport;
