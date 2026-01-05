"use client";
import React from "react";
import { User, Menu } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";


export default function Topbar({ onMenuClick, title, subtitle }) {

  const isMobile = useIsMobile();

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
                <p className="text-base subHeadingColor font-semibold">User Name</p>
                <p className="text-sm subHeadingColor">Diaspora · London,UK</p>
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
          </div>
        )}
      </div>
    </>
  );
}
