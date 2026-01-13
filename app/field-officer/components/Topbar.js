"use client";
import React, { useState } from "react";
import { User, Menu, X, Upload } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Topbar({ onMenuClick, title, subtitle }) {
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
              <h1 className="text-2xl font-semibold headingColor">{title || 'Field Officers'}</h1>
            ) : (
              <h1 className="text-xl font-semibold headingColor">{title || 'Field Officers'}</h1>
            )}
            <p className="text-sm font-semibold subHeadingColor">
              {subtitle || ''}
            </p>
          </div>
        </div>
        {/* <div>
          {!isMobile ? (
            <button onClick={() => setOpenModal(true)} className="bg-green-700 text-white px-3 py-2 rounded-md">+ New Report</button>
          ) : (
            <button onClick={() => setOpenModal(true)} className="bg-green-700 text-white px-2 text-sm py-2 rounded-md">+ New Report</button>
          )}
        </div> */}
      </div>

    </>
  );
}
