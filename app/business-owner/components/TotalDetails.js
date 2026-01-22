"use client";

import { ScrollText, BadgeDollarSign, Building2, Percent } from "lucide-react";

function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function formatCurrency(v) {
  const n = toNumber(v);
  // Simple formatting (USD). Change currency later if needed.
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function TotalDetails({ overview }) {
  // API shape:
  // overview.totals.kpis.{today|thisMonth|last30Days}.{sales, expenses, profitLoss}
  // overview.totals.totalReports
  // overview.businesses
  const kpis = overview?.totals?.kpis;

  // Use "thisMonth" as the default for the "Total" cards
  const sales = kpis?.thisMonth?.sales ?? 0;
  const expenses = kpis?.thisMonth?.expenses ?? 0;
  const profitLoss = kpis?.thisMonth?.profitLoss ?? 0;

  const totalReports = overview?.totals?.totalReports ?? 0;
  const totalBusinesses = Array.isArray(overview?.businesses) ? overview.businesses.length : 0;

  return (
    <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6 gap-4 sm:gap-5">
        <div className="p-4 sm:p-5 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h5 className="subHeadingColor text-sm sm:text-base">Total Businesses</h5>
              <h2 className="headingColor text-2xl sm:text-3xl font-semibold py-3">{toNumber(totalBusinesses)}</h2>
            </div>
            <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
              <Building2 className="w-10 h-10 sm:w-12 sm:h-12" color="#cfdced" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h5 className="subHeadingColor text-sm sm:text-base">Total Reports</h5>
              <h2 className="headingColor text-2xl sm:text-3xl font-semibold py-3">{toNumber(totalReports)}</h2>
            </div>
            <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
              <ScrollText className="w-10 h-10 sm:w-12 sm:h-12" color="#cfdced" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h5 className="subHeadingColor text-sm sm:text-base">Sales (This Month)</h5>
              <h2 className="headingColor text-2xl sm:text-3xl font-semibold py-3">{formatCurrency(sales)}</h2>
            </div>
            <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
              <BadgeDollarSign className="w-10 h-10 sm:w-12 sm:h-12" color="#cfdced" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h5 className="subHeadingColor text-sm sm:text-base">Expenses (This Month)</h5>
              <h2 className="headingColor text-2xl sm:text-3xl font-semibold py-3">{formatCurrency(expenses)}</h2>
            </div>
            <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
              <ScrollText className="w-10 h-10 sm:w-12 sm:h-12" color="#cfdced" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h5 className="subHeadingColor text-sm sm:text-base">Profit/Loss (This Month)</h5>
              <h2
                className={`text-2xl sm:text-3xl font-semibold py-3 ${
                  profitLoss > 0
                    ? "text-green-600"
                    : profitLoss < 0
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                {profitLoss >= 0 ? "+" : ""}
                {formatCurrency(profitLoss)}
              </h2>
              <small className="block text-xs text-gray-500">
                {profitLoss > 0
                  ? "Profitable this month"
                  : profitLoss < 0
                  ? "Loss this month"
                  : "Break-even"}
              </small>
            </div>
            <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6">
              <Percent className="w-10 h-10 sm:w-12 sm:h-12" color={profitLoss > 0 ? "#22c55e" : profitLoss < 0 ? "#ef4444" : "#a3a3a3"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
