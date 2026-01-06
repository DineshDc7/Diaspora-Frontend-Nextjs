"use client";
import React, { useState } from "react";
import { User, Menu, X, Upload } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";


export default function Topbar({ onMenuClick }) {
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState(false);

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
            ) : (
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
          ) : (
            <button onClick={() => setOpenModal(true)} className="bg-green-700 text-white px-2 text-sm py-2 rounded-md">+ New Report</button>
          )}
        </div>


      </div>


      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-scroll">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg my-auto">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl textprimaryColor font-semibold">Submit Daily Report</h2>
              <button onClick={() => setOpenModal(false)}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium subHeadingColor">
                  Sales Today ($)
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium subHeadingColor">
                  Expenses Today ($)
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium subHeadingColor">
                  Customer Count
                </label>
                <input
                  type="text"
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium subHeadingColor">
                  Notes (Optional)
                </label>
                <input
                  type="textarea"
                  placeholder="Any additional notes about today"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     outline-none"
                />
              </div>
              {/* Photo Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium subHeadingColor">
                  Photo (Optional)
                </label>

                <label
                  htmlFor="photo"
                  className="
            flex cursor-pointer items-center justify-center
            rounded-lg border-2 border-dashed border-gray-300
            px-4 py-2 gap-3 hover:bg-blue-50
            transition
          "
                >
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    Choose photo
                  </span>

                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Video Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium subHeadingColor">
                  Video (Optional)
                </label>

                <label
                  htmlFor="video"
                  className="
            flex cursor-pointer items-center justify-center
            rounded-lg border-2 border-dashed border-gray-300
            px-4 py-2 gap-3 hover:bg-blue-50
            transition
          "
                >
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    Choose video
                  </span>

                  <input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                  />
                </label>
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
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
