"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import KPIGrid from "../components/KPIGrid";
import AlertsPanel from "../components/AlertsPanel";
import BusinessTable from "../components/BusinessTable";
import Compliance from "../components/Compliance";
import Reports from "../components/Reports";


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 ml-64 p-6">
        <Topbar />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          <div className="xl:col-span-4 space-y-6">
            <KPIGrid />
            <BusinessTable />
            <Reports/>
            {/* <Compliance /> */}
          </div>

          {/* <AlertsPanel /> */}
        </div>
      </main>
    </div>
  );
}
