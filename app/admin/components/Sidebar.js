"use client";

import {
  Home,
  Building,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
const MenuItems = [
  { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { name: "Businesses", icon: Building, href: "/admin/business" },
  { name: "Reports", icon: BarChart, href: "/admin/allreports" },
  { name: "Users", icon: Users, href: "/admin/user" },
];
const MenuItemsbuttom = [
  // { name: "Setting", icon: Settings },
  { name: "Logout", icon: LogOut },
];

export default function Sidebar({ open, setOpen }){
  return (

    <>
    <aside className="fixed formobile"> 
      {/* Overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity ${open ? 'block' : 'hidden'}`}
        onClick={() => setOpen && setOpen(false)}
      />

      <div className={`w-64 fixed top-0 left-0 bg-gray-900 border-r px-4 py-6 relative h-[100vh] z-40 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}>
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
          {/* close button for small screens */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setOpen && setOpen(false)} className="text-white">
              ✕
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
        
      </div>

       <nav className="space-y-2 py-6">
        {MenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a 
              key={item.name} href={item.href}
              className="w-full text-white text-left px-4 py-2 rounded-sm hover:text-gray-600 font-medium"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </a>
          );
        })}
      </nav>


      <div style={{position:"absolute", bottom:"5%"}}>
        <nav className="space-y-2 py-6">
        {MenuItemsbuttom.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className="w-full text-white text-left px-4  hover:text-gray-800 font-medium"
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
      </div>
    </aside>



    <aside className={`fixed inset-0 bg-black/40 z-30 md:hidden md:none transition-opacity ${open ? 'block' : 'hidden'}`}
        onClick={() => setOpen && setOpen(false)}>
      {/* Overlay for small screens */}
      <div
        
      />

      <div className={`w-64 fixed top-0 left-0 bg-gray-900 border-r px-4 py-6 relative h-[100vh] z-40 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}>
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
          {/* close button for small screens */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setOpen && setOpen(false)} className="text-white">
              ✕
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
        
      </div>

       <nav className="space-y-2 py-6">
        {MenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <a 
              key={item.name} href={item.href}
              className="w-full text-white text-left px-4 py-2 rounded-sm hover:text-gray-600 font-medium"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </a>
          );
        })}
      </nav>


      <div style={{position:"absolute", bottom:"5%"}}>
        <nav className="space-y-2 py-6">
        {MenuItemsbuttom.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className="w-full text-white text-left px-4  hover:text-gray-800 font-medium"
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
      </div>
    </aside>


    </>
  );
}
