"use client";
import React, { useEffect, useState } from "react";
import { User, Menu } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import apiClient from "../../../lib/apiClient";


export default function Topbar({ onMenuClick, title, subtitle }) {

  const isMobile = useIsMobile();

  const [me, setMe] = useState(null);
  const [meError, setMeError] = useState("");

  const fetchMe = async () => {
    try {
      setMeError("");
      const res = await apiClient.get("/api/auth/me");
      setMe(res?.data?.data?.user || null);
    } catch (err) {
      setMe(null);
      setMeError(err?.response?.data?.message || "");
    }
  };

  useEffect(() => {
    fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleLabel = (role) => {
    if (role === "ADMIN") return "Admin";
    if (role === "BUSINESS_OWNER") return "Business Owner";
    if (role === "INVESTOR") return "Investor";
    return role || "";
  };

  return (
    <>
      <div>
        {!isMobile ? (
          <div className="md:flex justify-between items-center">
            <div className="flex items-start gap-3">
              <button onClick={() => onMenuClick && onMenuClick()} className="md:hidden p-2 rounded-md">
                <Menu />
              </button>

              <div>
                <div className="flex items-center gap-5 mb-2">
                  <h1 className="text-2xl font-semibold headingColor">{title || 'Dashboard'}</h1>
                  <p className="px-3 py-1 text-sm font-semibold subHeadingColor rounded-full secondaryColor">
                    {subtitle || 'Live portfolio overview'}
                  </p>
                </div>
                <p className="text-sm subHeadingColor">
                  Today · West Africa Time · Filters: All countries · All Sectors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* <div>
          <form className="relative w-full max-w-md">
            <input type="text"
              placeholder="Search Businesses, reports, officers"
              className="w-[300px] rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
          </form>
        </div> */}
              <div className="flex gap-2 items-center">
                {/* <p className="px-2 py-auto rounded-full bg-red-500 w-fit text-white">
            3
          </p> */}
                <div className="px-2 py-2 rounded-full bg-neutral-100">
                  <User />
                </div>
              </div>
              <div>
                <p className="text-base subHeadingColor font-semibold">
                  {me?.name || "User"}
                </p>
                <p className="text-sm subHeadingColor">
                  {/* {me?.email || ""}{me?.role ? ` · ${roleLabel(me.role)}` : ""} */}
                  {me?.email || ""}

                </p>
                {meError ? (
                  <p className="text-xs text-red-600 mt-1">{meError}</p>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 items-start">
                <button onClick={() => onMenuClick && onMenuClick()} className="md:hidden p-2 pl-0 rounded-md">
                <Menu />
              </button>

              <div>
                <div className="mb-2">
                  <h1 className="text-2xl font-semibold headingColor mb-2">{title || 'Dashboard'}</h1>
                  <p className="px-3 py-1 text-sm font-semibold subHeadingColor rounded-full secondaryColor">
                    {subtitle || 'Live portfolio overview'}
                  </p>
                </div>
              </div>
                
              </div>
              <div className="px-2 py-2 rounded-full bg-neutral-100">
                <User />
              </div>
            </div>
            <p className="text-sm subHeadingColor">
              Today · West Africa Time · Filters: All countries · All Sectors
            </p>
            <div className="mt-2">
              <p className="text-sm subHeadingColor font-semibold">
                {me?.name || "User"}
              </p>
              <p className="text-xs subHeadingColor">
                {/* {me?.email || ""}{me?.role ? ` · ${roleLabel(me.role)}` : ""} */}
                {me?.email || ""}
              </p>
              {meError ? (
                <p className="text-xs text-red-600 mt-1">{meError}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
