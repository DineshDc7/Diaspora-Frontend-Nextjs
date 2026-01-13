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
                <div className="">
                  <h1 className="text-2xl font-semibold headingColor">{title || 'Dashboard'}</h1>
                  <p className="text-sm subHeadingColor">
                  {subtitle || 'Live overview'}
                </p>
                </div>
                
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
                  <p className="text-sm subHeadingColor">
                    {subtitle || 'Live overview'}
                  </p>
                </div>
              </div>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
