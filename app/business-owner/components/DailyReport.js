"use client";

import React from "react";

import Link from "next/link";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function safeParseData(data) {
  if (!data) return null;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return typeof data === "object" ? data : null;
}

function getSalesValue(dataObj) {
  if (!dataObj) return 0;
  const keys = ["salesToday", "totalSales", "sales", "revenue", "totalRevenue", "grossSales"];
  for (const k of keys) {
    if (dataObj[k] !== undefined) return toNumber(dataObj[k]);
  }
  return 0;
}

function getExpenseValue(dataObj) {
  if (!dataObj) return 0;
  const keys = ["expensesToday", "totalExpenses", "expenses", "cost", "totalCost"];
  for (const k of keys) {
    if (dataObj[k] !== undefined) return toNumber(dataObj[k]);
  }
  return 0;
}

function formatMoney(v) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(toNumber(v));
  } catch {
    // fallback if Intl/currency not available
    const n = toNumber(v);
    return `$${n.toFixed(0)}`;
  }
}

function formatDate(v) {
  if (!v) return "-";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const DailyReport = ({ overview }) => {
  const reports = Array.isArray(overview?.recent?.reports) ? overview.recent.reports : [];
  const top5 = reports.slice(0, 5);

  return (
    <div className="shadow-lg rounded-lg bg-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="headingColor text-lg font-semibold">Recent Reports</h2>
          <p className="textColor text-sm">Recent reports list</p>
        </div>

        <Link href="/business-owner/allreports" className="textColor text-sm font-medium">
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="secondaryColor text-left text-sm textColor">
              <th className="py-3 px-2 w-[22%]">Date</th>
              <th className="py-3 px-2 w-[18%]">Type</th>
              <th className="py-3 px-2 w-[20%] text-center">Sales</th>
              <th className="py-3 px-2 w-[20%] text-center">Expenses</th>
              <th className="py-3 px-2 w-[20%] text-center">Profit / Loss</th>
            </tr>
          </thead>

          <tbody>
            {top5.length === 0 ? (
              <tr className="border-b last:border-0 border-gray-50 text-sm">
                <td className="py-4 px-2 textColor" colSpan={5}>
                  No reports found.
                </td>
              </tr>
            ) : (
              top5.map((r) => {
                const obj = safeParseData(r?.data);
                const sales = getSalesValue(obj);
                const expenses = getExpenseValue(obj);
                const profitLoss = sales - expenses;

                return (
                  <tr
                    key={
                      r?.id ??
                      `${r?.businessId ?? "biz"}-${r?.createdAt ?? "na"}-${r?.reportType ?? "na"}`
                    }
                    className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                  >
                    <td className="py-3 px-2 text-base font-semibold headingColor whitespace-nowrap">
                      {formatDate(r?.createdAt)}
                    </td>
                    <td className="py-3 px-2 textColor font-medium">
                      {r?.reportType || "-"}
                    </td>
                    <td className="py-3 px-2 text-center textColor font-medium">{formatMoney(sales)}</td>
                    <td className="py-3 px-2 text-center text-red-500">{formatMoney(expenses)}</td>
                    <td
                      className={`py-3 px-2 text-center font-semibold ${
                        profitLoss >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {profitLoss >= 0 ? "+" : ""}
                      {formatMoney(profitLoss)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyReport;
