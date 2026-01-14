"use client";

import AdminLayout from "../components/AdminLayout";
import KPIGrid from "../components/KPIGrid";
import BusinessTable from "../components/BusinessTable";
import Reports from "../components/Reports";
import UsersTable from "../components/UsersTable";
import { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOverview = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.get("/api/admin/dashboard/overview");
      // backend returns { success, message, data }
      setOverview(res?.data?.data || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load dashboard");
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const totals = overview?.totals || null;
  const reportsByType = overview?.reportsByType || null;
  const recent = overview?.recent || null;

  return (
    <AdminLayout title="Dashboard" subtitle="Live portfolio overview">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <div className="xl:col-span-4 space-y-6">
          {error ? (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="text-sm text-gray-500">Loading dashboard...</div>
          ) : null}

          <KPIGrid totals={totals} reportsByType={reportsByType} />
          <UsersTable users={(recent?.users || []).slice(0, 5)} />
          <BusinessTable businesses={(recent?.businesses || []).slice(0, 5)} />
          <Reports reports={(recent?.reports || []).slice(0, 5)} />
        </div>
      </div>
    </AdminLayout>
  );
}
