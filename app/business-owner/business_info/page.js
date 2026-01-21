"use client";

import BusinessLayout from "../components/BusinessLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../../lib/apiClient";
import { MoreHorizontal, X } from "lucide-react";

export default function BusinessInfo() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewBusiness, setViewBusiness] = useState(null);
  const [openActionRow, setOpenActionRow] = useState(null);

  const fetchMyBusinesses = async () => {
    setLoading(true);
    setError("");

    try {
      // Uses Next API proxy (recommended) -> app/api/business-owner/businesses/route.js
      const res = await apiClient.get("/api/business-owner/businesses");
      const list = res?.data?.data?.businesses;
      setBusinesses(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load businesses");
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBusinesses();
  }, []);

  return (
    <BusinessLayout>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
            <div className="flex items-center justify-between">
              <h1 className="headingColor text-lg font-semibold">My Businesses</h1>
              <button
                type="button"
                onClick={fetchMyBusinesses}
                className="text-sm font-semibold textprimaryColor"
              >
                Refresh
              </button>
            </div>

            {error ? (
              <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr className="secondaryColor text-center text-sm textColor">
                    <th className="py-3 px-2 w-[30%] text-start">Business Name</th>
                    <th className="py-3 px-2 w-[19%]">Owner Name</th>
                    <th className="py-3 px-2 w-[17%]">Phone</th>
                    <th className="py-3 px-2 w-[17%]">Category</th>
                    <th className="py-3 px-2 w-[17%]">City</th>
                    <th className="py-3 px-2 w-[10%]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-6 px-2 text-center text-sm text-gray-500">
                        Loading businesses...
                      </td>
                    </tr>
                  ) : businesses.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 px-2 text-center text-sm text-gray-500">
                        No businesses found.
                      </td>
                    </tr>
                  ) : (
                    businesses.map((b) => (
                      <tr
                        key={b.id}
                        className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                      >
                        <td className="py-3 px-2 text-base font-semibold headingColor whitespace-nowrap">
                          {b.businessName || "-"}
                        </td>
                        <td className="py-3 px-2 textColor text-center">
                          {b?.ownerUser?.name || b.ownerName || "-"}
                        </td>
                        <td className="py-3 px-2 textColor text-center">
                          {b?.ownerUser?.mobile || b.ownerPhone || "-"}
                        </td>
                        <td className="py-3 px-2 textColor text-center">{b.category || "-"}</td>
                        <td className="py-3 px-2 textColor text-center">{b.city || "-"}</td>
                        <td className="py-3 px-2 textColor text-center relative">
                          <button
                            onClick={() =>
                              setOpenActionRow(openActionRow === b.id ? null : b.id)
                            }
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>

                          {openActionRow === b.id && (
                            <div className="absolute right-6 bottom-0 z-50 w-44 rounded-md bg-white text-start shadow-md border">
                              <ul className="p-2 text-sm space-y-1">
                                <li
                                  onClick={() => {
                                    setViewBusiness(b);
                                    setOpenActionRow(null);
                                  }}
                                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                >
                                  <div className="textprimaryColor text-sm font-semibold">
                                    View Details
                                  </div>
                                </li>

                                <li
                                  onClick={() => {
                                    router.push(`/business-owner/allreports?businessId=${b.id}`);
                                    setOpenActionRow(null);
                                  }}
                                  className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                >
                                  <div className="textprimaryColor text-sm font-semibold">
                                    View Reports
                                  </div>
                                </li>

                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Showing {businesses.length} business{businesses.length === 1 ? "" : "es"} assigned to
              you.
            </p>
          </div>
        </div>
      </div>

      {viewBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Business Details</h2>
              <button
                onClick={() => {
                  setViewBusiness(null);
                  setOpenActionRow(null);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">Business Name</p>
                <p className="font-semibold">{viewBusiness.businessName || "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-semibold">{viewBusiness.category || "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Owner Name</p>
                <p className="font-semibold">
                  {viewBusiness?.ownerUser?.name || viewBusiness.ownerName || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Owner Phone</p>
                <p className="font-semibold">
                  {viewBusiness?.ownerUser?.mobile || viewBusiness.ownerPhone || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">City</p>
                <p className="font-semibold">{viewBusiness.city || "-"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Status</p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    viewBusiness.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {viewBusiness.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setViewBusiness(null)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </BusinessLayout>
  );
}
