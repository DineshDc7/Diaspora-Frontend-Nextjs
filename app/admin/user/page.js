"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Users, User, Pencil, X, Ellipsis } from "lucide-react";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = [
  { id: "allusers", label: "All Users" },
  { id: "admin", label: "Admin" },
  { id: "businessowner", label: "Business Owner" },
  { id: "investor", label: "Investor" },
];

const users = [
  {
    name: "Demo Diaspora User",
    email: "diaspora@gmail.com",
    phone: "8978789876",
    role: "Investor",
    roleColor: "blue",
    joined: "11/12/2025",
  },
  {
    name: "Demo Business Owner",
    email: "diaspora@gmail.com",
    phone: "8978789876",
    role: "Owner",
    roleColor: "green",
    joined: "11/12/2025",
  },
  {
    name: "Demo Admin",
    email: "diaspora@gmail.com",
    phone: "8978789876",
    role: "Admin",
    roleColor: "gray",
    joined: "11/12/2025",
  },
];

export default function AdminUser() {
  const [open, setOpen] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [openActionRow, setOpenActionRow] = useState(null);
  const [openAction, setOpenAction] = useState(null);
  const [openeditmodal, setOpenEditmodal] = useState(false);
  const [assignBusiness, setAssignBusiness] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar open={open} setOpen={setOpen} />

        <main className="flex-1 md:ml-64 p-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-4 space-y-6">
              <div className="flex justify-between items-center">
                <div className="mb-2 flex items-center gap-3">
                  <button
                    onClick={() => setOpen(true)}
                    className="md:hidden p-2 rounded-md"
                  >
                    ☰
                  </button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">
                      Users
                    </h1>
                    <p className="py-2 text-sm textColor">3 registered users</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setOpenmodal(true)}
                    className="primaryColor text-white text-sm font-semibold p-2 rounded-md flex gap-2"
                  >
                    <Users className="w-5 h-5" /> Add User
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-6 gap-5">
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="subHeadingColor text-base">Total Users</h5>
                    <p className="px-3 py-1 text-sm subHeadingColor rounded-full secondaryColor">
                      Active
                    </p>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      120
                    </h2>
                  </div>

                  <div className="absolute right-6 bottom-6">
                    <User className="w-10 h-10" color="#cfdced" />
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="subHeadingColor text-base">Total Admins</h5>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      10
                    </h2>
                  </div>

                  <div className="absolute right-6 bottom-6">
                    <User className="w-10 h-10" color="#cfdced" />
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="subHeadingColor text-base">
                      Total Business Owners
                    </h5>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      5
                    </h2>
                  </div>

                  <div className="absolute right-6 bottom-6">
                    <User className="w-10 h-10" color="#cfdced" />
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="subHeadingColor text-base">
                      Total Investors
                    </h5>
                  </div>
                  <div>
                    <h2 className="headingColor text-3xl font-semibold py-3">
                      7
                    </h2>
                  </div>

                  <div className="absolute right-6 bottom-6">
                    <User className="w-10 h-10" color="#cfdced" />
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
                <div className="p-4 bg-neutral-50 rounded-lg shadow-sm relative">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="subHeadingColor text-xl">Total Investors</h5>
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
              </div> */}

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
                  <div className="py-5 overflow-x-auto">
                    <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                      <thead>
                        <tr className="secondaryColor">
                          <th className="text-start p-2 w-[22%]">
                            <h5 className="subHeadingColor text-base">Name</h5>
                          </th>
                          <th className="text-center p-2 w-[18%]">
                            <h5 className="subHeadingColor text-base">Email</h5>
                          </th>
                          <th className="text-center p-2 w-[15%]">
                            <h5 className="subHeadingColor text-base">Phone</h5>
                          </th>
                          <th className="text-center p-2 w-[11%]">
                            <h5 className="subHeadingColor text-base">Role</h5>
                          </th>
                          <th className="text-center p-2 w-[11%]">
                            <h5 className="subHeadingColor text-base">
                              Joined
                            </h5>
                          </th>
                          <th className="text-center p-2 w-[8%]">
                            <h5 className="subHeadingColor text-base">Block</h5>
                          </th>
                          <th className="text-center p-2 w-[15%]">
                            <h5 className="subHeadingColor text-base">
                              Actions
                            </h5>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <h4 className="subHeadingColor font-semibold text-sm">
                                {user.name}
                              </h4>
                            </td>

                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.email}</p>
                            </td>

                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.phone}</p>
                            </td>

                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <p
                                className={`mx-auto px-3 py-1 text-xs font-semibold rounded-full w-fit
              ${
                user.roleColor === "blue"
                  ? "text-blue-600 bg-blue-100"
                  : user.roleColor === "green"
                  ? "text-green-600 bg-green-100"
                  : "text-gray-600 bg-gray-100"
              }`}
                              >
                                {user.role}
                              </p>
                            </td>

                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.joined}</p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <Switch
                                id="airplane-mode"
                                className="
                                          data-[state=unchecked]:bg-green-500
                                          data-[state=checked]:bg-red-500
                                        "
                              />
                            </td>

                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setOpenActionRow(
                                      openActionRow === index ? null : index
                                    )
                                  }
                                  className="flex mx-auto items-center textprimaryColor"
                                >
                                  <Ellipsis className="w-4 h-4" />
                                </button>

                                {openActionRow === index && (
                                  <>
                                    {/* Backdrop */}
                                    <div
                                      className="fixed inset-0 z-40"
                                      onClick={() => setOpenActionRow(null)}
                                    />

                                    {/* Action menu */}
                                    <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                      <ul className="p-2 text-sm space-y-1">
                                        <li
                                          onClick={() => {
                                            setOpenEditmodal(true);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Pencil className="w-3 h-3" /> Edit
                                          </div>
                                        </li>

                                        <li
                                          onClick={() => {
                                            setAssignBusiness(true);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Pencil className="w-3 h-3" />{" "}
                                            Assign Business
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "admin" && (
                  <div className="py-5 overflow-x-auto">
                    <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                      <thead>
                        <tr className="secondaryColor">
                          <th
                            className="text-start p-2 border-[#f1f3f7] w-[22%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Name</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[18%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Email</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[15%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Phone</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[11%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Role</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[11%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">
                              Joined
                            </h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[8%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Block</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[15%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">
                              Actions
                            </h5>
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
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">
                              diaspora@gmail.com
                            </p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">8978789876</p>
                          </td>
                          <td className="p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="text-gray-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 w-fit">
                              Admin
                            </p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">11/12/2025</p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <Switch
                              id="airplane-mode"
                              className="
                                          data-[state=unchecked]:bg-green-500
                                          data-[state=checked]:bg-red-500
                                        "
                            />
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <div className="relative">
                              <button
                                onClick={() => setOpenAction((prev) => !prev)}
                                className="flex mx-auto items-center textprimaryColor"
                              >
                                <Ellipsis className="w-4 h-4" />
                              </button>

                              {openAction && (
                                <>
                                  {/* Backdrop */}
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setOpenAction(false)}
                                  />

                                  {/* Action Menu */}
                                  <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                    <ul className="p-2 text-sm space-y-1">
                                      <li
                                        onClick={() => {
                                          setOpenEditmodal(true);
                                          setOpenAction(false);
                                        }}
                                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                      >
                                        <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                          <Pencil className="w-3 h-3" /> Edit
                                        </div>
                                      </li>

                                      <li
                                        onClick={() => {
                                          setAssignBusiness(true);
                                          setOpenAction(false);
                                        }}
                                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                      >
                                        <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                          <Pencil className="w-3 h-3" /> Assign
                                          Business
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "businessowner" && (
                  <div className="py-5 overflow-x-auto">
                    <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                      <thead>
                        <tr className="secondaryColor">
                          <th
                            className="text-start p-2 border-[#f1f3f7] w-[22%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Name</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[18%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Email</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[15%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Phone</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[11%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Role</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[11%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">
                              Joined
                            </h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[8%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Block</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[15%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">
                              Actions
                            </h5>
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
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">
                              diaspora@gmail.com
                            </p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">8978789876</p>
                          </td>
                          <td className="p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="text-green-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-green-100 w-fit">
                              Owner
                            </p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">11/12/2025</p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <Switch
                              id="airplane-mode"
                              className="
                                          data-[state=unchecked]:bg-green-500
                                          data-[state=checked]:bg-red-500
                                        "
                            />
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <div className="relative">
                              <button
                                onClick={() => setOpenAction((prev) => !prev)}
                                className="flex mx-auto items-center textprimaryColor"
                              >
                                <Ellipsis className="w-4 h-4" />
                              </button>

                              {openAction && (
                                <>
                                  {/* Backdrop */}
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setOpenAction(false)}
                                  />

                                  {/* Action Menu */}
                                  <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                    <ul className="p-2 text-sm space-y-1">
                                      <li
                                        onClick={() => {
                                          setOpenEditmodal(true);
                                          setOpenAction(false);
                                        }}
                                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
                                        <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                          <Pencil className="w-3 h-3" /> Edit
                                        </div>
                                      </li>
                                      <li
                                        onClick={() => {
                                          setAssignBusiness(true);
                                          setOpenAction(false);
                                        }}
                                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                      >
                                        <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                          <Pencil className="w-3 h-3" /> Assign
                                          Business
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "investor" && (
                  <div className="py-5 overflow-x-auto">
                    <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                      <thead>
                        <tr className="secondaryColor">
                          <th
                            className="text-start p-2 border-[#f1f3f7] w-[22%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Name</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[18%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Email</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[15%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Phone</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[11%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Role</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[11%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Joined </h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[8%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">Block</h5>
                          </th>
                          <th
                            className="text-center p-2 border-[#f1f3f7] w-[15%]"
                            style={{ verticalAlign: "center" }}
                          >
                            <h5 className="subHeadingColor text-base">
                              Actions
                            </h5>
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
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">
                              diaspora@gmail.com
                            </p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">8978789876</p>
                          </td>
                          <td className="p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="text-blue-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                              Investor
                            </p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">11/12/2025</p>
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <Switch
                              id="airplane-mode"
                              className="data-[state=unchecked]:bg-green-500
                                          data-[state=checked]:bg-red-500
                                        "
                            />
                          </td>
                          <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                            <div className="relative">
                              <button
                                onClick={() => setOpenAction((prev) => !prev)}
                                className="flex mx-auto items-center textprimaryColor"
                              >
                                <Ellipsis className="w-4 h-4" />
                              </button>

                              {openAction && (
                                <>
                                  {/* Backdrop */}
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setOpenAction(false)}
                                  />

                                  {/* Action Menu */}
                                  <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                    <ul className="p-2 text-sm space-y-1">
                                      <li
                                        onClick={() => {
                                          setOpenEditmodal(true);
                                          setOpenAction(false);
                                        }}
                                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                      >
                                        <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                          <Pencil className="w-3 h-3" /> Edit
                                        </div>
                                      </li>

                                      <li
                                        onClick={() => {
                                          setAssignBusiness(true);
                                          setOpenAction(false);
                                        }}
                                        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                      >
                                        <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                          <Pencil className="w-3 h-3" /> Assign
                                          Business
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              )}
                            </div>
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
      {openmodal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New User</h2>
              <button onClick={() => setOpenmodal(false)}>
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
                <label className="block text-sm font-semibold mb-2 textColor">
                  Role
                </label>

                <div className="relative w-full">
                  <Select>
                    <SelectTrigger
                      className="w-full p-3 rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="owner">Business Owner</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* City */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone(Optional)
                </label>
                <input
                  type="tel"
                  placeholder="9999999999"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpenmodal(false)}
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

      {openeditmodal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit User Details</h2>
              <button onClick={() => setOpenEditmodal(false)}>
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
                <label className="block text-sm font-semibold mb-2 textColor">
                  Role
                </label>

                <div className="relative w-full">
                  {/* <select
                    name="role"
                    className="w-full appearance-none p-3 pr-10  rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>User</option>
                    <option>Business Owner</option>
                    <option>Investor</option>
                  </select> */}

                  <Select>
                    <SelectTrigger
                      className="w-full p-3 rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="owner">Business Owner</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* City */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone(Optional)
                </label>
                <input
                  type="tel"
                  placeholder="9999999999"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpenEditmodal(false)}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {assignBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Assign Business</h2>
              <button onClick={() => setAssignBusiness(false)}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {/* Body */}

            <div>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role"
                  className="w-full rounded-lg border text-sm border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="py-5 overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="min-w-[400px] md:min-w-full w-full table-fixed border border-[#f1f3f7]">
                  <thead>
                    <tr className="secondaryColor">
                      <th
                        className="text-start p-2 border-[#f1f3f7] w-[40%]"
                        style={{ verticalAlign: "center" }}
                      >
                        <h5 className="subHeadingColor text-sm">
                          Business Name
                        </h5>
                      </th>
                      <th
                        className="text-center p-2 border-[#f1f3f7] w-[30%]"
                        style={{ verticalAlign: "center" }}
                      >
                        <h5 className="subHeadingColor text-sm">Category</h5>
                      </th>
                      <th
                        className="text-center p-2 border-[#f1f3f7] w-[30%]"
                        style={{ verticalAlign: "center" }}
                      >
                        <h5 className="subHeadingColor text-sm">Actions</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 py-4 border-b border-[#f1f3f7]">
                        <div>
                          <h4 className="subHeadingColor font-semibold text-sm">
                            Demo Business Name 1
                          </h4>
                        </div>
                      </td>

                      <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                        <p className="textColor text-sm">Retail</p>
                      </td>
                      <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                        <button className="flex gap-2 mx-auto items-center primaryColor text-white px-5 py-2 text-sm font-semibold rounded-md">
                          Assign
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 py-4 border-b border-[#f1f3f7]">
                        <div>
                          <h4 className="subHeadingColor font-semibold text-sm">
                            Demo Business Name 2
                          </h4>
                        </div>
                      </td>

                      <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                        <p className="textColor text-sm">Retail</p>
                      </td>
                      <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                        <button className="flex gap-2 mx-auto items-center primaryColor text-white px-5 py-2 text-sm font-semibold rounded-md">
                          Assign
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 py-4 border-b border-[#f1f3f7]">
                        <div>
                          <h4 className="subHeadingColor font-semibold text-sm">
                            Demo Business Name 3
                          </h4>
                        </div>
                      </td>

                      <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                        <p className="textColor text-sm">Retail</p>
                      </td>
                      <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                        <button className="flex gap-2 mx-auto items-center primaryColor text-white px-5 py-2 text-sm font-semibold rounded-md">
                          Assign
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
