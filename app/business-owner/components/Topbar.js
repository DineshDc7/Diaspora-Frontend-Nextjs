"use client";
import React from "react";
import { User, Menu } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";


export default function Topbar({ onMenuClick}) {
const isMobile = useIsMobile();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button onClick={() => onMenuClick && onMenuClick()} className="md:hidden p-2 rounded-md">
          <Menu />
        </button>

         <div className="mb-2">
            {!isMobile ? (
              <h1 className="text-2xl font-semibold headingColor">Nairobi Fresh Mart</h1>
            ):(
              <h1 className="text-xl font-semibold headingColor">Nairobi Fresh Mart</h1>
            )}
            <p className="text-sm font-semibold subHeadingColor">
              Nairobi - Retail
            </p>
          </div>
      </div>
      <div>
        {!isMobile ? (
            <button className="bg-green-700 text-white px-3 py-2 rounded-md">+ New Report</button>
            ):(
            <button className="bg-green-700 text-white px-2 text-sm py-2 rounded-md">+ New Report</button>
            )}
          </div>

      
    </div>
  );
}
