"use client";

import {
  Home,
  Building,
  AlertTriangle,
  BarChart,
  MessageCircle,
  Settings,
  CreditCard,
} from "lucide-react";
const MenuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Businesses", icon: Building },
  { name: "Alerts", icon: AlertTriangle },
  { name: "Reports", icon: BarChart },
  { name: "Messages", icon: MessageCircle },
  { name: "Settings", icon: Settings },
  { name: "Billing", icon: CreditCard },
];
export default function Sidebar({ open, setOpen }) {
  return (
    <aside className="">
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen && setOpen(false)}
        aria-hidden={!open}
      />

      <div className={`w-64 fixed top-0 left-0 bg-gray-900 border-r px-4 py-6 relative h-[100vh] z-40 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 primaryColor text-white rounded-md flex items-center justify-center">
          <a href="/">
            <h1>DI</h1>
          </a>
        </div>
        <div>
          <a href="/">
            <h4 className="font-semibold text-lg text-white">
              Diaspora Insight
            </h4>
          </a>
          <p className="text-xs text-gray-400">
            Accountability for cross-border capital
          </p>
        </div>
        <div className="md:hidden ml-auto">
          <button onClick={() => setOpen && setOpen(false)} className="text-white">✕</button>
        </div>
      </div>

       <nav className="space-y-2 py-6">
        {MenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className="w-full text-white text-left px-4 py-2 rounded-sm hover:bg-blue-50 hover:text-gray-800 font-medium"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </button>
          );
        })}
      </nav>
      </div>
    </aside>
  );
}
