"use client";

import AllBusinesses from "../components/AllBusinesses";
import DetailsOverview from "../components/DetailsOverview";
import InvestorLayout from "../components/InvestorLayout";

export default function DashboardPage() {
  return (
    <InvestorLayout title="Dashboard Overview" subtitle="Track Your Invested Businesses">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        
        <div className="xl:col-span-4 space-y-6">
          <div className="shadow-lg rounded-lg bg-white p-6">
            <DetailsOverview/>
            <AllBusinesses/>
          </div>

        </div>

      </div>
    </InvestorLayout>
  );
}
