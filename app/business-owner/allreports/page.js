"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import apiClient from "@/lib/apiClient";
import {
  Eye,
  X,
  BadgePercent,
  BadgeDollarSign,
  ScrollText,
  User,
  Plus,
  MoreHorizontal,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";

const REPORT_TYPES = [
  { label: "All", value: "" },
  { label: "Daily", value: "DAILY" },
  { label: "Weekly", value: "WEEKLY" },
  // { label: "Monthly", value: "MONTHLY" },
  // { label: "Quarterly", value: "QUARTERLY" },
  // { label: "Half Yearly", value: "HALF_YEARLY" },
  // { label: "Yearly", value: "YEARLY" },
];

function safeNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function getFromData(data, keys, fallback = 0) {
  if (!data || typeof data !== "object") return fallback;
  for (const k of keys) {
    if (data[k] !== undefined && data[k] !== null && data[k] !== "") {
      return safeNumber(data[k]);
    }
  }
  return fallback;
}

function formatDate(d) {
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "-";
  return dt.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function fileLabel(file) {
  if (!file) return "No file chosen";
  return file?.name || "Selected";
}

export default function AllReports() {
  const [openmodel, setOpenModel] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [openActionRow, setOpenActionRow] = useState(null);

  // File input refs (for custom UI)
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Add Report modal
  const [openAddModal, setOpenAddModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  const [reportForm, setReportForm] = useState({
    businessId: "",
    reportType: "DAILY",
    sales: "",
    expenses: "",
    customers: "",
    notes: "",
    photo: null,
    video: null,
  });

  const resetReportForm = () => {
    setReportForm({
      businessId: "",
      reportType: "DAILY",
      sales: "",
      expenses: "",
      customers: "",
      notes: "",
      photo: null,
      video: null,
    });

    if (photoInputRef.current) photoInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const openCreateReport = () => {
    setCreateError("");
    setOpenActionRow(null);
    // Default business selection: current filter if present
    setReportForm((p) => ({
      ...p,
      businessId: selectedBusinessId ? String(selectedBusinessId) : p.businessId,
    }));
    setOpenAddModal(true);
  };

  const closeCreateReport = () => {
    setOpenAddModal(false);
    setCreateError("");
    resetReportForm();
  };

  const handleCreateReport = async (e) => {
    e?.preventDefault?.();
    if (createLoading) return;

    setCreateLoading(true);
    setCreateError("");

    try {
      const businessId = String(reportForm.businessId || "").trim();
      const reportTypeVal = String(reportForm.reportType || "").trim();

      if (!businessId) {
        setCreateError("Please select a business.");
        setCreateLoading(false);
        return;
      }

      if (!reportTypeVal) {
        setCreateError("Please select a report type.");
        setCreateLoading(false);
        return;
      }

      // Build JSON data payload (dynamic)
      const dataObj = {};
      const sales = String(reportForm.sales || "").trim();
      const expenses = String(reportForm.expenses || "").trim();
      const customers = String(reportForm.customers || "").trim();

      if (sales !== "") dataObj.salesToday = Number(sales);
      if (expenses !== "") dataObj.expensesToday = Number(expenses);
      if (customers !== "") dataObj.customers = Number(customers);

      // multipart/form-data
      const form = new FormData();
      form.append("businessId", businessId);
      form.append("reportType", reportTypeVal);
      form.append("data", JSON.stringify(dataObj));
      if (reportForm.notes) form.append("notes", String(reportForm.notes));
      if (reportForm.photo) form.append("photo", reportForm.photo);
      if (reportForm.video) form.append("video", reportForm.video);

      await apiClient.post("/api/business-owner/reports", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      closeCreateReport();
      // Refresh list
      await fetchReports({ page: 1 });
    } catch (err) {
      setCreateError(err?.response?.data?.message || "Failed to create report");
    } finally {
      setCreateLoading(false);
    }
  };

  // Filters
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [reportType, setReportType] = useState("");

  // List state
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const didInitRef = useRef(false);

  const headerCountText = useMemo(() => {
    const total = pagination?.total ?? reports.length;
    return `${total} Reports Submitted`;
  }, [pagination, reports.length]);

  const fetchBusinesses = async () => {
    try {
      const res = await apiClient.get("/api/business-owner/businesses");
      const list = res?.data?.data?.businesses;
      setBusinesses(Array.isArray(list) ? list : []);
    } catch (e) {
      // Keep page usable even if dropdown fails
      console.error("[BO allreports] failed to load businesses", e);
      setBusinesses([]);
    }
  };

  const fetchReports = async (override = {}) => {
    setLoading(true);
    setError("");

    try {
      const page = override.page ?? pagination.page ?? 1;
      const limit = override.limit ?? pagination.limit ?? 10;

      const params = {
        page,
        limit,
        ...(selectedBusinessId ? { businessId: selectedBusinessId } : {}),
        ...(reportType ? { reportType } : {}),
        ...override.params,
      };

      const res = await apiClient.get("/api/business-owner/reports", { params });
      const data = res?.data?.data;

      setReports(Array.isArray(data?.reports) ? data.reports : []);
      setPagination(
        data?.pagination || {
          total: 0,
          page,
          limit,
          totalPages: 0,
        }
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load reports");
      setReports([]);
      setPagination({ total: 0, page: 1, limit: 10, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    if (didInitRef.current) return;
    didInitRef.current = true;

    (async () => {
      await fetchBusinesses();
      // If navigated from Businesses screen with ?businessId=... preselect it
      try {
        const u = new URL(window.location.href);
        const bid = u.searchParams.get("businessId");
        if (bid) setSelectedBusinessId(String(bid));
      } catch {}
      await fetchReports({ page: 1 });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch when filters change
  useEffect(() => {
    if (!didInitRef.current) return;
    fetchReports({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBusinessId, reportType]);

  const openReport = (r) => {
    setSelectedReport(r);
    setOpenModel(true);
    setOpenActionRow(null);
  };

  const closeReport = () => {
    setOpenModel(false);
    setOpenActionRow(null);
    setSelectedReport(null);
  };

  // Extract KPIs from dynamic JSON
  const selectedData = useMemo(() => {
    const d = selectedReport?.data;
    if (!d) return null;
    if (typeof d === "string") {
      try {
        return JSON.parse(d);
      } catch {
        return null;
      }
    }
    return typeof d === "object" ? d : null;
  }, [selectedReport]);

  const kpiSales = useMemo(
    () => getFromData(selectedData, ["salesToday", "totalSales", "sales", "revenue", "totalRevenue", "grossSales"], 0),
    [selectedData]
  );
  const kpiExpenses = useMemo(
    () => getFromData(selectedData, ["expensesToday", "totalExpenses", "expenses", "cost", "totalCost"], 0),
    [selectedData]
  );
  const kpiCustomers = useMemo(
    () => getFromData(selectedData, ["customers", "customer", "customerCount", "totalCustomers"], 0),
    [selectedData]
  );
  const kpiProfitLoss = useMemo(() => kpiSales - kpiExpenses, [kpiSales, kpiExpenses]);

  const canPrev = (pagination?.page || 1) > 1;
  const canNext = (pagination?.page || 1) < (pagination?.totalPages || 1);

  return (
    <>
      <BusinessLayout>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          <div className="xl:col-span-4 space-y-6">
            <div className="shadow-lg rounded-lg bg-white p-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h2 className="headingColor text-lg font-semibold">All Reports</h2>
                  <p className="textColor text-sm">
                    {loading ? "Loading..." : headerCountText}
                  </p>
                </div>

                {/* Filters + Add Button */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <select
                    value={selectedBusinessId}
                    onChange={(e) => setSelectedBusinessId(e.target.value)}
                    className="w-full sm:w-[260px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Businesses</option>
                    {businesses.map((b) => (
                      <option key={b.id} value={String(b.id)}>
                        {b.businessName}
                      </option>
                    ))}
                  </select>

                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full sm:w-[180px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {REPORT_TYPES.map((t) => (
                      <option key={t.label} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={openCreateReport}
                    className="primaryColor text-white text-sm font-semibold px-3 py-2 rounded-md flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Plus className="w-5 h-5" /> Add Report
                  </button>
                </div>
              </div>

              {error ? (
                <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {/* Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr className="secondaryColor text-left text-sm textColor">
                      <th className="py-3 px-2 w-[22%]">Date</th>
                      <th className="py-3 px-2 w-[14%] text-center">Type</th>
                      <th className="py-3 px-2 w-[14%] text-center">Sales</th>
                      <th className="py-3 px-2 w-[14%] text-center">Expenses</th>
                      <th className="py-3 px-2 w-[14%] text-center">Profit / Loss</th>
                      <th className="py-3 px-2 w-[22%]">Business</th>
                      <th className="py-3 px-2 w-[10%] text-center"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading && reports.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-sm text-gray-500">
                          No reports found.
                        </td>
                      </tr>
                    ) : null}

                    {reports.map((r) => {
                      const dataObj = typeof r.data === "string" ? (() => {
                        try { return JSON.parse(r.data); } catch { return null; }
                      })() : (typeof r.data === "object" ? r.data : null);

                      const sales = getFromData(dataObj, ["salesToday", "totalSales", "sales", "revenue", "totalRevenue", "grossSales"], 0);
                      const expenses = getFromData(dataObj, ["expensesToday", "totalExpenses", "expenses", "cost", "totalCost"], 0);
                      const profitLoss = sales - expenses;

                      // When business dropdown is used, backend still returns businessId only.
                      // We can map business name from businesses list.
                      const bizName = businesses.find((b) => String(b.id) === String(r.businessId))?.businessName;

                      return (
                        <tr
                          key={r.id}
                          className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                        >
                          <td className="py-3 px-2 text-base font-semibold headingColor whitespace-nowrap">
                            {formatDate(r.createdAt)}
                          </td>
                          <td className="py-3 px-2 text-center textColor font-medium">
                            {r.reportType || "-"}
                          </td>
                          <td className="py-3 px-2 text-center textColor font-medium">
                            ${sales}
                          </td>
                          <td className="py-3 px-2 text-center text-red-500">${expenses}</td>
                          <td
                            className={`py-3 px-2 text-center font-semibold ${
                              profitLoss >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {profitLoss >= 0 ? "+" : "-"}${Math.abs(profitLoss)}
                          </td>
                          <td className="py-3 px-2 textColor">
                            {bizName || `Business #${r.businessId}`}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="relative inline-block">
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenActionRow(openActionRow === r.id ? null : r.id)
                                }
                                className="p-2 rounded-md hover:bg-gray-100"
                                aria-label="Actions"
                              >
                                <MoreHorizontal className="w-5 h-5 text-gray-600" />
                              </button>

                              {openActionRow === r.id ? (
                                <div className="absolute right-0 mt-2 z-50 w-44 rounded-md bg-white text-start shadow-md border">
                                  <ul className="p-2 text-sm space-y-1">
                                    <li
                                      onClick={() => {
                                        openReport(r);
                                        setOpenActionRow(null);
                                      }}
                                      className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                    >
                                      <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                        <Eye className="w-4 h-4" /> View
                                      </div>
                                    </li>

                                    {/* <li
                                      onClick={() => {
                                        if (r?.photoPath)
                                          window.open(`/${r.photoPath}`, "_blank");
                                        setOpenActionRow(null);
                                      }}
                                      className={`cursor-pointer px-2 py-1 hover:bg-gray-100 rounded ${
                                        !r?.photoPath
                                          ? "opacity-50 pointer-events-none"
                                          : ""
                                      }`}
                                    >
                                      <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                        <ImageIcon className="w-4 h-4" /> Photo
                                      </div>
                                    </li> */}

                                    {/* <li
                                      onClick={() => {
                                        if (r?.videoPath)
                                          window.open(`/${r.videoPath}`, "_blank");
                                        setOpenActionRow(null);
                                      }}
                                      className={`cursor-pointer px-2 py-1 hover:bg-gray-100 rounded ${
                                        !r?.videoPath
                                          ? "opacity-50 pointer-events-none"
                                          : ""
                                      }`}
                                    >
                                      <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                        <VideoIcon className="w-4 h-4" /> Video
                                      </div>
                                    </li> */}
                                  </ul>
                                </div>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-gray-600">
                  Page <span className="font-semibold">{pagination.page}</span> of{" "}
                  <span className="font-semibold">{pagination.totalPages || 1}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={!canPrev || loading}
                    onClick={() => fetchReports({ page: (pagination.page || 1) - 1 })}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={!canNext || loading}
                    onClick={() => fetchReports({ page: (pagination.page || 1) + 1 })}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BusinessLayout>

      {/* View Modal */}
      {openmodel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-lg pb-5">
            {/* Header */}
            <div className="mb-4 flex items-center rounded-t-lg justify-between p-4 primaryColor">
              <h2 className="text-lg font-semibold text-white">
                {selectedReport?.reportType || "Report"}
              </h2>
              <button onClick={closeReport}>
                <X className="h-5 w-5" color="#ffffffff" />
              </button>
            </div>

            <div className="px-6">
              <h5 className="text-base headingColor">
                {businesses.find((b) => String(b.id) === String(selectedReport?.businessId))
                  ?.businessName || `Business #${selectedReport?.businessId || "-"}`}
              </h5>
              <p className="textColor text-sm mt-1">
                Submitted on {formatDate(selectedReport?.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">Sales</h5>
                  <h3 className="text-lg font-semibold headingColor">${kpiSales}</h3>
                </div>
                <div>
                  <BadgeDollarSign className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">Expenses</h5>
                  <h3 className="text-lg font-semibold headingColor">${kpiExpenses}</h3>
                </div>
                <div>
                  <ScrollText className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">Customers</h5>
                  <h3 className="text-lg font-semibold headingColor">{kpiCustomers}</h3>
                </div>
                <div>
                  <User className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-2 border border-blue-200 bg-blue-50 rounded-md">
                <div>
                  <h5 className="text-sm font-semibold subHeadingColor">Net Profit/Loss</h5>
                  <h3 className="text-lg font-semibold headingColor">
                    {kpiProfitLoss >= 0 ? "+" : "-"}${Math.abs(kpiProfitLoss)}
                  </h3>
                </div>
                <div>
                  <BadgePercent className="w-10 h-10 text-blue-400 opacity-60" />
                </div>
              </div>
            </div>

            <div className="flex gap-4 px-6">
              <button
                type="button"
                disabled={!selectedReport?.photoPath}
                onClick={() => {
                  if (selectedReport?.photoPath) window.open(`/${selectedReport.photoPath}`, "_blank");
                }}
                className="w-full p-4 bg-blue-50 textprimaryColor font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View Photo
              </button>
              <button
                type="button"
                disabled={!selectedReport?.videoPath}
                onClick={() => {
                  if (selectedReport?.videoPath) window.open(`/${selectedReport.videoPath}`, "_blank");
                }}
                className="w-full p-4 bg-blue-50 textprimaryColor font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View Video
              </button>
            </div>

            {selectedReport?.notes ? (
              <div className="px-6 pt-5">
                <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-semibold headingColor">Notes</p>
                  <p className="text-sm textColor mt-1 break-words">{selectedReport.notes}</p>
                </div>
              </div>
            ) : null}

            <div className="px-6 pt-4 border-t border-gray-200 mt-5">
              <p className="headingColor text-xs font-semibold">
                Report ID: {selectedReport?.id || "-"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Report Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between rounded-t-lg p-4 primaryColor">
              <h2 className="text-lg font-semibold text-white">Add Report</h2>
              <button onClick={closeCreateReport}>
                <X className="h-5 w-5" color="#ffffffff" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="p-6 space-y-4">
              {createError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {createError}
                </div>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Business</label>
                  <select
                    value={reportForm.businessId}
                    onChange={(e) =>
                      setReportForm((p) => ({ ...p, businessId: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Business</option>
                    {businesses.map((b) => (
                      <option key={b.id} value={String(b.id)}>
                        {b.businessName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Report Type</label>
                  <select
                    value={reportForm.reportType}
                    onChange={(e) =>
                      setReportForm((p) => ({ ...p, reportType: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {REPORT_TYPES.filter((t) => t.value).map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Sales Today ($)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={reportForm.sales}
                    onChange={(e) =>
                      setReportForm((p) => ({ ...p, sales: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Expenses Today ($)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={reportForm.expenses}
                    onChange={(e) =>
                      setReportForm((p) => ({ ...p, expenses: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Customers</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={reportForm.customers}
                    onChange={(e) =>
                      setReportForm((p) => ({ ...p, customers: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Add notes..."
                  value={reportForm.notes}
                  onChange={(e) =>
                    setReportForm((p) => ({ ...p, notes: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Photo */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Photo (optional)
                  </label>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setReportForm((p) => ({
                        ...p,
                        photo: e.target.files?.[0] || null,
                      }))
                    }
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                    >
                      Choose Photo
                    </button>

                    <div className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 truncate">
                      {fileLabel(reportForm.photo)}
                    </div>

                    {reportForm.photo ? (
                      <button
                        type="button"
                        onClick={() => {
                          setReportForm((p) => ({ ...p, photo: null }));
                          if (photoInputRef.current)
                            photoInputRef.current.value = "";
                        }}
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Remove photo"
                        title="Remove"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Video */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Video (optional)
                  </label>

                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) =>
                      setReportForm((p) => ({
                        ...p,
                        video: e.target.files?.[0] || null,
                      }))
                    }
                  />

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                    >
                      Choose Video
                    </button>

                    <div className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 truncate">
                      {fileLabel(reportForm.video)}
                    </div>

                    {reportForm.video ? (
                      <button
                        type="button"
                        onClick={() => {
                          setReportForm((p) => ({ ...p, video: null }));
                          if (videoInputRef.current)
                            videoInputRef.current.value = "";
                        }}
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Remove video"
                        title="Remove"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreateReport}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="w-full primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {createLoading ? "Creating..." : "Create Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
