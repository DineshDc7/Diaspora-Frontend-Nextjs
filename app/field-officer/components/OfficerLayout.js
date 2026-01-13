"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function OfficerLayout({ children, title, subtitle }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 md:ml-64 p-4 sm:p-6">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setOpen(true)}
        />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
