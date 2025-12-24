"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function LoginHeader() {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      {/* Header */}
      <header className="shadow-sm bg-white relative z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <Link href="/">
                <img src="/DI.png" alt="Diaspora Insight" />
              </Link>
            </div>
            <div>
              <Link href="/">
                <h4 className="font-semibold text-lg headingColor">
                  Diaspora Insight
                </h4>
              </Link>
              <p className="text-sm subHeadingColor">
                Accountability for cross-border capital
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#" className="subHeadingColor hover:text-black">
              Docs
            </Link>
            <Link href="#" className="subHeadingColor hover:text-black">
              Support
            </Link>
            {/* <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-400"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-400"
            >
              Login
            </Link> */}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div className="absolute inset-0 z-50 bg-black/70 flex justify-end">
          {/* Drawer */}
          <div className="w-[60%] max-w-xs bg-white h-full py-4 flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            <Link
              href="#"
              className="subHeadingColor hover:text-black border-b border-gray-200 pb-3 px-6 "
              onClick={() => setOpen(false)}
            >
              Docs
            </Link>

            <Link
              href="#"
              className="subHeadingColor hover:text-black border-b border-gray-200 pb-3 px-6 "
              onClick={() => setOpen(false)}
            >
              Support
            </Link>

            {/* <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-400 border-b border-gray-200 pb-3 px-6 "
              onClick={() => setOpen(false)}
            >
              Sign up
            </Link>

            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-400 border-b border-gray-200 pb-3 px-6 "
              onClick={() => setOpen(false)}
            >
              Login
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
}
