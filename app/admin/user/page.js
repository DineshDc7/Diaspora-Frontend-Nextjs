"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Users, User, Pencil, X } from "lucide-react";
import { Search } from "lucide-react";
import { useState } from "react";
const tabs = [
  { id: "allusers", label: "All Users" },
  { id: "admin", label: "Admin" },
  { id: "businessowner", label: "Business Owner" },
  { id: "investor", label: "Investor" },
];


export default function AdminUser() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  
  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar open={open} setOpen={setOpen} />

        <main className="flex-1 lg:ml-64 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="mb-2 flex items-center gap-3">
                  <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-md">☰</button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">Users</h1>
                    <p className="py-2 text-sm textColor">3 registered users</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setOpen(true)}
                    className="primaryColor text-white text-sm font-semibold p-2 rounded-md flex gap-2"
                  >
                    <Users className="w-5 h-5" /> Add User
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="subHeadingColor text-xl">Total Users</h5>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      20
                    </h2>
                  </div>
                  <div className="absolute right-6 bottom-8">
                    <User className="w-14 h-14" color="#cfdced" />
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="text-green-700 text-xl">Active Users</h5>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      13
                    </h2>
                  </div>
                  <div className="absolute right-6 bottom-8">
                    <User className="w-14 h-14" color="#cfdced" />
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="text-red-700 text-xl">Inactive Users</h5>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      7
                    </h2>
                  </div>
                  <div className="absolute right-6 bottom-8">
                    <User className="w-14 h-14" color="#cfdced" />
                  </div>
                </div>
              </div>

              <div className="shadow-md rounded-lg p-4 mb-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or role"
                    className="w-full rounded-lg border text-sm border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition font-semibold text-lg
              ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

              {activeTab === "allusers" && (
                <div className="py-5">
                  <table className="table-fixed w-full border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[25%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Name</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[18%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Email</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Phone</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Role</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Joined</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="subHeadingColor font-semibold text-sm">
                              Demo Diaspora User
                            </h4>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">
                            diaspora@gmail.com
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">-</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                            Investor
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">11/12/2025</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="#"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="subHeadingColor font-semibold text-sm">
                              Demo Business Owner
                            </h4>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">
                            diaspora@gmail.com
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">-</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-green-600 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 w-fit">
                            Owner
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">11/12/2025</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="#"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="subHeadingColor font-semibold text-sm">
                              Demo Admin
                            </h4>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">
                            diaspora@gmail.com
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">-</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-gray-600 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 w-fit">
                            Admin
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">11/12/2025</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="#"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                  )}

                  {activeTab === "admin" && (
                <div className="py-5">
                  <table className="table-fixed w-full border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[25%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Name</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[18%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Email</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Phone</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Role</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Joined</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="subHeadingColor font-semibold text-sm">
                              Demo Admin
                            </h4>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">
                            diaspora@gmail.com
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">-</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-gray-600 px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 w-fit">
                            Admin
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">11/12/2025</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="#"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                  )}


                  {activeTab === "businessowner" && (
                <div className="py-5">
                  <table className="table-fixed w-full border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[25%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Name</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[18%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Email</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Phone</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Role</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Joined</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                 

                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="subHeadingColor font-semibold text-sm">
                              Demo Business Owner
                            </h4>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">
                            diaspora@gmail.com
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">-</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-green-600 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 w-fit">
                            Owner
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">11/12/2025</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="#"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </a>
                        </td>
                      </tr>

                    
                    </tbody>
                  </table>
                </div>
                  )}



                  {activeTab === "investor" && (
                <div className="py-5">
                  <table className="table-fixed w-full border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[25%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Name</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[18%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Email</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Phone</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Role</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Joined</h5>
                        </th>
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <div>
                            <h4 className="subHeadingColor font-semibold text-sm">
                              Demo Diaspora User
                            </h4>
                          </div>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">
                            diaspora@gmail.com
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">-</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                            Investor
                          </p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <p className="textColor text-sm">11/12/2025</p>
                        </td>
                        <td className="p-2 py-4 border-b border-[#f1f3f7]">
                          <a
                            href="#"
                            className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </a>
                        </td>
                      </tr>

                    

                      
                    </tbody>
                  </table>
                </div>
                  )}

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New User</h2>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {/* Body */}
            <form className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Johndoe@gmail.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Owner Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="******"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>User</option>
                        <option>Business Owner</option>
                        <option>Investor</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone(Optional)
                </label>
                <input
                  type="tel"
                  placeholder="999999999"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
