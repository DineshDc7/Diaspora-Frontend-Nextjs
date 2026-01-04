"use client";

import AdminLayout from "../components/AdminLayout";
import KPIGrid from "../components/KPIGrid";
import AlertsPanel from "../components/AlertsPanel";
import BusinessTable from "../components/BusinessTable";
import Compliance from "../components/Compliance";
import Reports from "../components/Reports";

export default function DashboardPage() {
  return (
    <AdminLayout title="Dashboard" subtitle="Live portfolio overview">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        
        <div className="xl:col-span-4 space-y-6">
          <KPIGrid />
          <BusinessTable />
          <Reports />
          {/* <Compliance /> */}
        </div>

        {/* <AlertsPanel /> */}
      </div>
    </AdminLayout>
  );
}
