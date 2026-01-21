"use client";
import React, { useEffect, useState } from "react";
import { Menu, X, Upload } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/lib/apiClient";

export default function Topbar({ onMenuClick }) {
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState(false);

  const [me, setMe] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await apiClient.get("/api/auth/me");
        const user = res?.data?.data?.user;
        if (mounted) setMe(user || null);
      } catch (e) {
        // If not logged in or request fails, just hide user info
        if (mounted) setMe(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const displayName = me?.name || "";
  const displayRole = me?.role || "";
  const initials = displayName
    ? displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("")
    : "U";

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onMenuClick && onMenuClick()}
            className="md:hidden p-2 rounded-md"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>

        {/* User info (same idea as Admin) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full primaryColor flex items-center justify-center text-white text-sm font-semibold">
              {initials}
            </div>

            {!isMobile ? (
              <div className="leading-tight text-right">
                <div className="text-sm font-semibold headingColor">
                  {displayName || ""}
                </div>
                <div className="text-xs textColor">
                  {displayRole ? displayRole.replace("_", " ") : ""}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-scroll">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg my-auto">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl textprimaryColor font-semibold">Submit Report</h2>
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
                  Report Type
                </label>
                <Select>
                    <SelectTrigger
                      className="w-full p-3 rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>

                    </SelectContent>
                  </Select>
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
                  Video (Optional) (Max 50MB)
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
