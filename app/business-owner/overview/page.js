"use client";

import BusinessLayout from "../components/BusinessLayout";
import DailyReport from "../components/DailyReport";
import TotalDetails from "../components/TotalDetails";

export default function DashboardPage() {
  return (
    <BusinessLayout>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">  
        <div className="xl:col-span-4 space-y-6">
            <TotalDetails/>
            <DailyReport/>
        </div>
      </div>
    </BusinessLayout>
  );
}
