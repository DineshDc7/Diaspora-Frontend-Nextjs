"use client";
import React, { useState } from "react";
import { User, Menu } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";


export default function Topbar({ onMenuClick}) {
const isMobile = useIsMobile();
const[openModal, setOpenModal] = useState(false);

  return (
    <>
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
            <button onClick={() => setOpenModal(true)} className="bg-green-700 text-white px-3 py-2 rounded-md">+ New Report</button>
            ):(
            <button className="bg-green-700 text-white px-2 text-sm py-2 rounded-md">+ New Report</button>
            )}
          </div>

      
    </div>


    {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Submit Daily Report</h2>
              <button onClick={() => setOpenModal(false)}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Sales Today ($)
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Expenses Today ($)
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Customer Count 
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <input
                  type="textarea"
                  placeholder="Any additional notes about today"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="New York"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full"
                >
                  Create Business
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
