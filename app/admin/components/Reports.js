"use client";

import React from "react";
import Link from "next/link";

const toObj = (data) => {
  if (!data) return null;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return typeof data === "object" ? data : null;
};

const pickNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// Best-effort extraction (your backend also uses flexible keys)
const getMetric = (obj, keys) => {
  if (!obj) return 0;
  for (const k of keys) {
    if (obj[k] !== undefined) return pickNumber(obj[k]);
  }
  return 0;
};

const formatMoney = (v) => {
  const n = pickNumber(v);
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${n.toLocaleString()}`;
  }
};

const formatDate = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "-";
    return d.toLocaleDateString();
  } catch {
    return "-";
  }
};

const Reports = ({ reports = [] }) => {
  return (
    <div className="shadow-lg rounded-lg bg-white p-4">
      <div className="flex justify-between items-center">
        <div className="w-[80%]">
          <h2 className="headingColor text-lg font-semibold">Reports</h2>
          <p className="textColor">
            Drill into any Nigerian business for financials, media, and compliance
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <div>
            <Link className="textColor" href="/admin/allreports">
              View all
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 p-4 mt-3">
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="text-start pb-4 border-b border-gray-100 w-[20%]">
                  <h5 className="subHeadingColor text-base">Business</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[15%]">
                  <h5 className="subHeadingColor text-base">Date</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                  <h5 className="subHeadingColor text-base">Sales</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[15%]">
                  <h5 className="subHeadingColor text-base">Expenses</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                  <h5 className="subHeadingColor text-base">Customers</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[10%]">
                  <h5 className="subHeadingColor text-base">Profit</h5>
                </th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td className="py-6 text-center text-sm text-gray-500" colSpan={6}>
                    No reports found.
                  </td>
                </tr>
              ) : (
                reports.map((r) => {
                  const obj = toObj(r.data);

                  // flexible keys
                  const sales = getMetric(obj, [
                    "salesToday",
                    "totalSales",
                    "sales",
                    "revenue",
                    "totalRevenue",
                    "grossSales",
                  ]);

                  const expenses = getMetric(obj, [
                    "expenses",
                    "totalExpenses",
                    "expense",
                    "cost",
                    "totalCost",
                    "cogs",
                  ]);

                  const customers = getMetric(obj, [
                    "customers",
                    "totalCustomers",
                    "customerCount",
                    "customersToday",
                  ]);

                  const profit = obj && obj.profit !== undefined ? pickNumber(obj.profit) : sales - expenses;

                  return (
                    <tr key={r.id}>
                      <td className="py-4">
                        <h4 className="headingColor font-semibold text-sm">
                          Business #{r.businessId}
                        </h4>
                        <p className="textColor text-xs">{r.reportType || "-"}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="textColor text-sm font-semibold">{formatDate(r.createdAt)}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="text-green-600 text-sm font-semibold">{formatMoney(sales)}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="text-red-600 text-sm font-semibold">{formatMoney(expenses)}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="textColor text-sm font-semibold">{customers || 0}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="text-green-700 text-sm font-semibold">{formatMoney(profit)}</p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
