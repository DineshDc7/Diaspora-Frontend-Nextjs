"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KPIGrid from "../components/KPIGrid";
import AlertsPanel from "../components/AlertsPanel";
import BusinessTable from "../components/BusinessTable";
import Compliance from "../components/Compliance";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          <div className="xl:col-span-3 space-y-6">
            <KPIGrid />
            <Compliance />
            <BusinessTable />
          </div>

          <AlertsPanel />
        </div>
      </main>
    </div>
  );
}
