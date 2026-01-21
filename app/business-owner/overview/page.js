"use client";

import { useEffect, useState } from "react";
import BusinessLayout from "../components/BusinessLayout";
import DailyReport from "../components/DailyReport";
import TotalDetails from "../components/TotalDetails";
import BusinessList from "../components/BusinessList";
import apiClient from "@/lib/apiClient";

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOverview = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("[business-owner/overview] fetching: /api/business-owner/overview");
      const res = await apiClient.get("/api/business-owner/overview");

      // expected shape: { success, message, data }
      const data = res?.data?.data;
      console.log("[business-owner/overview] response data:", data);
      setOverview(data || null);
    } catch (err) {
      console.error("[business-owner/overview] fetch error:", err);
      setError(err?.response?.data?.message || "Failed to load dashboard overview");
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BusinessLayout>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          {error ? (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
          ) : null}

          {loading ? (
            <div className="text-sm text-gray-500">Loading dashboard...</div>
          ) : null}

          {/* Pass API data down */}
          {!loading && !error && !overview ? (
            <div className="rounded-md bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
              No dashboard data found.
            </div>
          ) : null}

          <TotalDetails overview={overview} />
          <BusinessList overview={overview} />
          <DailyReport overview={overview} />
          
        </div>
      </div>
    </BusinessLayout>
  );
}
