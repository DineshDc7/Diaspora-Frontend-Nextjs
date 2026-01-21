"use client";

import React from "react";
import Link from "next/link";

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

const BusinessList = ({ overview }) => {
  const businesses = Array.isArray(overview?.businesses) ? overview.businesses : [];
  const top5 = businesses.slice(0, 5);

  return (
    <div className="shadow-lg rounded-lg bg-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center gap-3">
        <div>
          <h2 className="headingColor text-lg font-semibold">My Businesses</h2>
          <p className="textColor text-sm">Assigned businesses</p>
        </div>

        <Link href="/business-owner/business_info" className="textColor text-sm font-medium">
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="secondaryColor text-left text-sm textColor">
              <th className="py-3 px-2 w-[34%]">Business</th>
              <th className="py-3 px-2 w-[18%]">Category</th>
              <th className="py-3 px-2 w-[18%]">City</th>
              <th className="py-3 px-2 w-[15%] text-center">Status</th>
              <th className="py-3 px-2 w-[15%]">Created</th>
            </tr>
          </thead>

          <tbody>
            {top5.length === 0 ? (
              <tr className="border-b last:border-0 border-gray-50 text-sm">
                <td className="py-4 px-2 textColor" colSpan={5}>
                  No businesses assigned yet.
                </td>
              </tr>
            ) : (
              top5.map((b) => (
                <tr
                  key={b?.id ?? `${b?.businessName ?? "biz"}-${b?.createdAt ?? "na"}`}
                  className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                >
                  <td className="py-3 px-2 text-base font-semibold headingColor">
                    {b?.businessName || "-"}
                  </td>
                  <td className="py-3 px-2 textColor">{b?.category || "-"}</td>
                  <td className="py-3 px-2 textColor">{b?.city || "-"}</td>

                  <td className="py-3 px-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        b?.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b?.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="py-3 px-2 textColor whitespace-nowrap">
                    {formatDate(b?.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessList;