"use client";
import { Building2, ScrollText, BadgeDollarSign, User } from "lucide-react";
export default function KPIGrid() {
  return (
    <>
      <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="headingColor text-lg font-semibold">Portfolio KPIs</h2>
            <p className="textColor">Snapshot across all Nigerian businesses you back</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5">
            <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                <div className="flex justify-between items-center gap-2">
                  <h5 className="subHeadingColor text-base">Total Businesses</h5>
                  <p className="px-3 py-1 text-sm subHeadingColor rounded-full secondaryColor">
                    Active
                  </p>
                </div>
                <div>
                  <h2 className="headingColor text-3xl font-semibold py-3">12</h2>
                </div>

                <div className="absolute right-6 bottom-6">
                    <Building2 className="w-10 h-10" color="#cfdced" />
                </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                <div className="flex justify-between items-center gap-2">
                  <h5 className="subHeadingColor text-base">Total Report</h5>
                  
                </div>
                <div>
                  <h2 className="headingColor text-3xl font-semibold py-3">10</h2>
                </div>

                <div className="absolute right-6 bottom-6">
                   <ScrollText className="w-10 h-10" color="#cfdced" />
                </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                <div className="flex justify-between items-center gap-2">
                  <h5 className="subHeadingColor text-base">Total sales</h5>
                 
                </div>
                <div>
                  <h2 className="headingColor text-3xl font-semibold py-3">$24,465</h2>
                </div>

                <div className="absolute right-6 bottom-6">
                  <BadgeDollarSign className="w-10 h-10" color="#cfdced" />
                </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                <div className="flex justify-between items-center gap-2">
                  <h5 className="subHeadingColor text-base">Total Users</h5>
                  <p className="px-3 py-1 text-sm subHeadingColor rounded-full secondaryColor">
                    Active
                  </p>
                </div>
                <div>
                  <h2 className="headingColor text-3xl font-semibold py-3">7</h2>
                </div>

                <div className="absolute right-6 bottom-6">
                    <User className="w-10 h-10" color="#cfdced" />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
