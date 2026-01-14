"use client";

import Sidebar from "../components/Sidebar";
import {
  User,
  X,
  Eye,
  BadgeDollarSign,
  ScrollText,
  BadgePercent,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import apiClient from "../../../lib/apiClient";

export default function AdminReport() {
  const [open, setOpen] = useState(false);
  const [openmodel, setOpenModel] = useState(false);

  // filters
  const [selectedBusiness, setSelectedBusiness] = useState(null); // string id
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD
  const [endDate, setEndDate] = useState(""); // YYYY-MM-DD

  // dropdown options
  const [businessOptions, setBusinessOptions] = useState([]); // [{id, businessName}]

  // list state
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // details modal state
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reportDetails, setReportDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const isMobile = useIsMobile();

  // helpers (same style as dashboard)
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

  const computeRowMetrics = (row) => {
    const obj = toObj(row?.data);

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

    const profit =
      obj && obj.profit !== undefined ? pickNumber(obj.profit) : sales - expenses;

    return { sales, expenses, customers, profit };
  };

  // API: Business options
  const fetchBusinessOptions = async () => {
    try {
      // preferred: options endpoint
      const res = await apiClient.get("/api/admin/businesses/options");
      const list = res?.data?.data?.businesses;
      if (Array.isArray(list)) {
        setBusinessOptions(list);
        return;
      }

      // fallback: list endpoint
      const res2 = await apiClient.get("/api/admin/businesses", {
        params: { page: 1, limit: 50 },
      });
      const rows = res2?.data?.data?.businesses;
      if (Array.isArray(rows)) {
        setBusinessOptions(rows.map((b) => ({ id: b.id, businessName: b.businessName })));
      } else {
        setBusinessOptions([]);
      }
    } catch {
      setBusinessOptions([]);
    }
  };

  // API: Reports list
  const fetchReports = async (override = {}) => {
    setLoading(true);
    setError("");

    try {
      const params = {
        page: currentPage,
        limit: LIMIT,
        ...(selectedBusiness ? { businessId: selectedBusiness } : {}),
        ...(startDate ? { fromDate: startDate } : {}),
        ...(endDate ? { toDate: endDate } : {}),
        ...override,
      };

      const res = await apiClient.get("/api/admin/reports", { params });
      const data = res?.data?.data;

      setReports(Array.isArray(data?.reports) ? data.reports : []);
      setPagination(
        data?.pagination || { total: 0, page: 1, limit: LIMIT, totalPages: 1 }
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load reports");
      setReports([]);
      setPagination({ total: 0, page: 1, limit: LIMIT, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  // API: Report details
  const openReportModal = async (reportId) => {
    setSelectedReportId(reportId);
    setReportDetails(null);
    setDetailsError("");
    setDetailsLoading(true);
    setOpenModel(true);

    try {
      const res = await apiClient.get(`/api/admin/reports/${reportId}`);
      setReportDetails(res?.data?.data?.report || null);
    } catch (err) {
      setDetailsError(err?.response?.data?.message || "Failed to load report");
    } finally {
      setDetailsLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchBusinessOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBusiness, startDate, endDate]);

  // load reports whenever page or filters change
  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedBusiness, startDate, endDate]);

  const totalPages = pagination.totalPages || 1;

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar open={open} setOpen={setOpen} />

        <main className="flex-1 md:ml-64 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpen(true)}
                    className="md:hidden p-2 rounded-md"
                  >
                    ☰
                  </button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">
                      Reports
                    </h1>
                    <p className="py-2 text-sm textColor">
                      {loading
                        ? "Loading..."
                        : `${pagination.total || reports.length} total Reports`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:flex items-center justify-between">
                <div className="mb-5 md:mb-0">
                  <h5 className="text-sm font-semibold mb-2 text-gray-700">
                    Filter by Business:
                  </h5>

                  <div className="flex items-center gap-4">
                    <div className="w-[60dvw] md:w-[250px]">
                      <Select
                        value={selectedBusiness ?? ""}
                        onValueChange={(value) => setSelectedBusiness(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessOptions.map((b) => (
                            <SelectItem key={b.id} value={String(b.id)}>
                              {b.businessName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <button
                      onClick={() => setSelectedBusiness(null)}
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>

                {!isMobile && (
                  <div className="flex gap-4 items-end">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        From:
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block border mt-2 border-gray-300 rounded-md md:px-3 py-2 px-1 text-xs"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        To:
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block border border-gray-300 mt-2 rounded-md md:px-3 py-2 px-1 text-xs"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="text-sm md:pb-2.5 pb-2 font-semibold text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                )}

                {isMobile && (
                  <div className="flex gap-4 items-end">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        From:
                      </label>
                      <div className="relative">
                        {!startDate && (
                          <span className="pointer-events-none w-[30dvw] md:w-full absolute left-3 top-2.5 text-xs text-gray-400">
                            From
                          </span>
                        )}
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className={`block w-full border border-gray-300 rounded-md px-3 py-2 text-xs
                            ${!startDate ? "text-transparent" : "text-gray-900"}
                          `}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700">
                        To:
                      </label>
                      <div className="relative">
                        {!endDate && (
                          <span className="pointer-events-none w-[30dvw] md:w-full absolute left-3 top-2.5 text-xs text-gray-400">
                            To
                          </span>
                        )}
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className={`block w-full border border-gray-300 rounded-md px-3 py-2 text-xs
                        ${!endDate ? "text-transparent" : "text-gray-900"}
                      `}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="text-sm md:pb-2.5 pb-2 font-semibold text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>

              {error ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {/* Desktop table */}
              {!isMobile && (
                <div className="py-5 overflow-x-auto">
                  <table className="min-w-[900px] w-full table-fixed p-2 border border-[#f1f3f7]">
                    <thead>
                      <tr>
                        <th className="text-start p-4 border-b border-gray-100 w-[20%]">
                          <h5 className="subHeadingColor text-base">Business</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[10%]">
                          <h5 className="subHeadingColor text-base">Date</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[15%]">
                          <h5 className="subHeadingColor text-base">Sales</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[15%]">
                          <h5 className="subHeadingColor text-base">Expenses</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[14%]">
                          <h5 className="subHeadingColor text-base">Customers</h5>
                        </th>
                        <th className="text-center p-4 border-b border-gray-100 w-[14%]">
                          <h5 className="subHeadingColor text-base">Profit</h5>
                        </th>
                        <th className="text-start p-4 border-b border-gray-100 w-[12%]">
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {reports.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-sm text-gray-500">
                            {loading ? "Loading reports..." : "No reports found."}
                          </td>
                        </tr>
                      ) : (
                        reports.map((item) => {
                          const { sales, expenses, customers, profit } = computeRowMetrics(item);
                          return (
                            <tr key={item.id} className="border-b last:border-b-0">
                              <td className="p-4">
                                <h4 className="headingColor font-semibold text-sm">
                                  {item.business?.businessName ||
                                    (item.businessId ? `Business #${item.businessId}` : "-")}
                                </h4>
                              </td>
                              <td className="p-4 text-center text-sm font-semibold textColor">
                                {formatDate(item.createdAt)}
                              </td>
                              <td className="p-4 text-center text-green-600 text-sm font-semibold">
                                {formatMoney(sales)}
                              </td>
                              <td className="p-4 text-center text-red-600 text-sm font-semibold">
                                {formatMoney(expenses)}
                              </td>
                              <td className="p-4 text-center text-sm font-semibold textColor">
                                {customers}
                              </td>
                              <td className="p-4 text-center text-green-700 text-sm font-semibold">
                                {formatMoney(profit)}
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => openReportModal(item.id)}
                                  className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                                >
                                  <Eye className="w-5 h-5" /> View
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mobile cards */}
              {isMobile && (
                <div className="space-y-4">
                  {reports.length === 0 ? (
                    <div className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-500">
                      {loading ? "Loading reports..." : "No reports found."}
                    </div>
                  ) : (
                    reports.map((item) => {
                      const { sales, expenses, customers, profit } = computeRowMetrics(item);

                      return (
                        <div
                          key={item.id}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="headingColor font-semibold text-sm">
                                {item.business?.businessName ||
                                  (item.businessId ? `Business #${item.businessId}` : "-")}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Date: {formatDate(item.createdAt)}
                              </p>
                            </div>

                            <button
                              onClick={() => openReportModal(item.id)}
                              className="textprimaryColor text-sm font-semibold flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" /> View
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-sm">
                                Sales:
                                <span className="font-semibold text-xs text-green-600">
                                  {" "}
                                  {formatMoney(sales)}
                                </span>
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-sm">
                                Expenses:
                                <span className="font-semibold text-xs text-red-600">
                                  {" "}
                                  {formatMoney(expenses)}
                                </span>
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-sm">
                                Customers:
                                <span className="font-semibold text-xs"> {customers}</span>
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-500 text-sm">
                                Profit:
                                <span className="font-semibold text-xs text-green-700">
                                  {" "}
                                  {formatMoney(profit)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {openmodel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-lg pb-5">
            {/* Header */}
            <div className="mb-4 flex items-center rounded-t-lg justify-between p-4 primaryColor">
              <h2 className="text-lg font-semibold text-white">
                {reportDetails?.reportType ? `${reportDetails.reportType} Report` : "Report"}
              </h2>
              <button
                onClick={() => {
                  setOpenModel(false);
                  setSelectedReportId(null);
                  setReportDetails(null);
                  setDetailsError("");
                }}
              >
                <X className="h-5 w-5" color="#ffffffff" />
              </button>
            </div>

            <div className="px-6">
              {detailsError ? (
                <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {detailsError}
                </div>
              ) : null}

              {detailsLoading ? (
                <div className="mb-3 text-sm text-gray-500">Loading report...</div>
              ) : null}
            </div>

            <h5 className="text-base headingColor px-6">
              {reportDetails?.business?.businessName ||
                (reportDetails?.businessId ? `Business #${reportDetails.businessId}` : "-")}
            </h5>

            {(() => {
              const obj = toObj(reportDetails?.data);
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
              const profit =
                obj && obj.profit !== undefined ? pickNumber(obj.profit) : sales - expenses;

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
                  <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                    <div>
                      <h5 className="text-sm font-semibold subHeadingColor">Sales</h5>
                      <h3 className="text-lg font-semibold headingColor">
                        {formatMoney(sales)}
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
                        {formatMoney(expenses)}
                      </h3>
                    </div>
                    <div>
                      <ScrollText className="w-10 h-10 text-blue-400 opacity-60" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                    <div>
                      <h5 className="text-sm font-semibold subHeadingColor">Customers</h5>
                      <h3 className="text-lg font-semibold headingColor">
                        {customers}
                      </h3>
                    </div>
                    <div>
                      <User className="w-10 h-10 text-blue-400 opacity-60" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                    <div>
                      <h5 className="text-sm font-semibold subHeadingColor">
                        Net Profit/Loss
                      </h5>
                      <h3 className="text-lg font-semibold headingColor">
                        {formatMoney(profit)}
                      </h3>
                    </div>
                    <div>
                      <BadgePercent className="w-10 h-10 text-blue-400 opacity-60" />
                    </div>
                  </div>
                </div>
              );
            })()}

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
                Submitted on {formatDate(reportDetails?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}