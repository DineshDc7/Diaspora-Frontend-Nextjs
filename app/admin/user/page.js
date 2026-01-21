"use client";

import Sidebar from "../components/Sidebar";
import { Users, User, Pencil, X, Ellipsis, Eye } from "lucide-react";
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

import apiClient from "../../../lib/apiClient";

const tabs = [
  { id: "allusers", label: "All Users" },
  { id: "admin", label: "Admin" },
  { id: "businessowner", label: "Business Owner" },
  { id: "investor", label: "Investor" },
];

export default function AdminUser() {
  const [open, setOpen] = useState(false);
  const [openmodal, setOpenmodal] = useState(false);
  const [openActionRow, setOpenActionRow] = useState(null);
  const [openeditmodal, setOpenEditmodal] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [searchText, setSearchText] = useState("");
  const searchDebounceRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    countsByRole: { ADMIN: 0, INVESTOR: 0, BUSINESS_OWNER: 0 },
  });
  const [addUserForm, setAddUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    mobile: "",
  });
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({
    name: "",
    email: "",
    role: "",
    mobile: "",
    isActive: true,
  });
  const [editUserLoading, setEditUserLoading] = useState(false);
  const [editUserError, setEditUserError] = useState("");
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [viewUserLoading, setViewUserLoading] = useState(false);
  const [viewUserError, setViewUserError] = useState("");
  const fetchOverviewNow = async (override = {}) => {
    setLoading(true);
    setError("");

    try {
      const tabMap = {
        allusers: "all",
        admin: "admins",
        businessowner: "owners",
        investor: "investors",
      };

      const res = await apiClient.get("/api/admin/users/overview", {
        params: {
          tab: tabMap[activeTab] || "all",
          page,
          limit,
          ...(searchText.trim() ? { search: searchText.trim() } : {}),
          ...override,
        },
      });

      const data = res?.data?.data;

      setUsers(Array.isArray(data?.users) ? data.users : []);

      const rawPagination = data?.pagination || { total: 0, page, limit, totalPages: 0 };

      const totalPages = Number(rawPagination.totalPages) || 0;
      const currentPage = Number(rawPagination.page) || page;

      const hasPrev = currentPage > 1;
      const hasNext = totalPages > 0 ? currentPage < totalPages : false;

      setPagination({
        total: Number(rawPagination.total) || 0,
        page: currentPage,
        limit: Number(rawPagination.limit) || limit,
        totalPages,

        hasPrevPage: rawPagination.hasPrevPage ?? hasPrev,
        hasNextPage: rawPagination.hasNextPage ?? hasNext,
        prevPage: rawPagination.prevPage ?? (hasPrev ? currentPage - 1 : null),
        nextPage: rawPagination.nextPage ?? (hasNext ? currentPage + 1 : null),
      });
      setStats(
        data?.stats || {
          totalUsers: 0,
          countsByRole: { ADMIN: 0, INVESTOR: 0, BUSINESS_OWNER: 0 },
        }
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOverview = async () => {
      // Debounce search to avoid calling API on every keystroke
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }

      searchDebounceRef.current = setTimeout(async () => {
        await fetchOverviewNow();
      }, 400);
      return;
    };

    fetchOverview();
  }, [activeTab, searchText, page, limit]);
  // Helper to normalize phone input to digits only and max 10 chars
  const normalizeMobile10 = (value) => String(value || "").replace(/\D/g, "").slice(0, 10);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (addUserLoading) return;

    setAddUserLoading(true);
    setAddUserError("");

    // Mobile number validation (10 digits only)
    const mobileDigits = normalizeMobile10(addUserForm.mobile);
    if (addUserForm.mobile && mobileDigits.length !== 10) {
      setAddUserError("Mobile number must be exactly 10 digits");
      setAddUserLoading(false);
      return;
    }

    try {
      const payload = {
        name: addUserForm.name,
        email: addUserForm.email,
        password: addUserForm.password,
        role: addUserForm.role,
        mobile: mobileDigits ? mobileDigits : null,
      };

      await apiClient.post("/api/admin/users", payload);

      setOpenmodal(false);
      await fetchOverviewNow();
    } catch (err) {
      setAddUserError(err?.response?.data?.message || "Failed to create user");
    } finally {
      setAddUserLoading(false);
    }
  };

  // Helper to open View Details modal (read-only)
  const openViewForUser = async (userId) => {
    setViewUser(null);
    setViewUserError("");
    setViewUserLoading(true);

    try {
      const res = await apiClient.get(`/api/admin/users/${userId}`);
      const user = res?.data?.data?.user;
      setViewUser(user || null);
      setOpenViewModal(true);
    } catch (err) {
      setViewUserError(err?.response?.data?.message || "Failed to load user details");
      setOpenViewModal(true);
    } finally {
      setViewUserLoading(false);
    }
  };
  // Helper to open Edit modal and prefill using API
  const openEditForUser = async (userId) => {
    setSelectedUserId(userId);
    setEditUserError("");
    setEditUserLoading(true);
    try {
      const res = await apiClient.get(`/api/admin/users/${userId}`);
      const user = res?.data?.data?.user;
      setEditUserForm({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
        mobile: user?.mobile || "",
        isActive: user?.isActive ?? true,
      });
      setOpenEditmodal(true);
    } catch (err) {
      setEditUserError(err?.response?.data?.message || "Failed to load user");
      setOpenEditmodal(true);
    } finally {
      setEditUserLoading(false);
    }
  };

  // Submit handler for Edit modal
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUserId || editUserLoading) return;
    setEditUserLoading(true);
    setEditUserError("");
    // Mobile number validation (10 digits only)
    const mobileDigits = normalizeMobile10(editUserForm.mobile);
    if (editUserForm.mobile && mobileDigits.length !== 10) {
      setEditUserError("Mobile number must be exactly 10 digits");
      setEditUserLoading(false);
      return;
    }
    try {
      const payload = {
        name: editUserForm.name,
        role: editUserForm.role,
        mobile: mobileDigits ? mobileDigits : null,
        isActive: Boolean(editUserForm.isActive),
      };
      await apiClient.put(`/api/admin/users/${selectedUserId}`, payload);
      setOpenEditmodal(false);
      setSelectedUserId(null);
      await fetchOverviewNow();
    } catch (err) {
      setEditUserError(err?.response?.data?.message || "Failed to update user");
    } finally {
      setEditUserLoading(false);
    }
  };

  // Block/Unblock handler
  // UI semantics: Switch checked = BLOCKED (isActive=false)
  const handleToggleUserStatus = async (user, checked) => {
    if (!user?.id) return;

    const nextIsActive = !checked;

    // Optimistic update
    const prevUsers = users;
    setStatusUpdatingId(user.id);
    setUsers((p) => p.map((u) => (u.id === user.id ? { ...u, isActive: nextIsActive } : u)));

    try {
      await apiClient.patch(`/api/admin/users/${user.id}/status`, { isActive: nextIsActive });
      // Keep stats consistent (simplest + safest)
      await fetchOverviewNow();
    } catch (err) {
      // Revert optimistic update
      setUsers(prevUsers);
      setError(err?.response?.data?.message || "Failed to update user status");
    } finally {
      setStatusUpdatingId(null);
    }
  };



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
                    <p className="py-2 text-sm textColor">
                      {loading ? "Loading..." : `${stats.totalUsers} registered users`}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setAddUserError("");
                      setAddUserForm({ name: "", email: "", password: "", role: "", mobile: "" });
                      setOpenmodal(true);
                    }}
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
                      {stats.totalUsers}
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
                      {stats.countsByRole.ADMIN}
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
                      {stats.countsByRole.BUSINESS_OWNER}
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
                      {stats.countsByRole.INVESTOR}
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
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search users by name, email, or role"
                    className="w-full rounded-lg border text-sm border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex mt-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSearchText("");
                        setPage(1);
                      }}
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

                {error ? (
                  <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {loading ? (
                  <div className="py-6 text-sm text-gray-500">Loading users...</div>
                ) : null}

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
                          <tr key={user.id || index}>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <h4 className="subHeadingColor font-semibold text-sm">
                                {user.name}
                              </h4>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.email}</p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.mobile || "-"}</p>
                            </td>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <p
                                className={`mx-auto px-3 py-1 text-xs font-semibold rounded-full w-fit
              ${
                user.role === "INVESTOR"
                  ? "text-blue-600 bg-blue-100"
                  : user.role === "BUSINESS_OWNER"
                  ? "text-green-600 bg-green-100"
                  : "text-gray-600 bg-gray-100"
              }`}
                              >
                                {user.role === "BUSINESS_OWNER" ? "Owner" : user.role}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <Switch
                                id={`block-${user.id}`}
                                checked={!user.isActive}
                                disabled={statusUpdatingId === user.id}
                                onCheckedChange={(checked) => handleToggleUserStatus(user, checked)}
                                className="data-[state=unchecked]:bg-green-500 data-[state=checked]:bg-red-500"
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
                                            openViewForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Eye className="w-3 h-3" /> View Details
                                          </div>
                                        </li>

                                        <li
                                          onClick={() => {
                                            openEditForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Pencil className="w-3 h-3" /> Edit
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
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-600">
                        Showing {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                        {" - "}
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                        {" of "}
                        {pagination.total}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => pagination.prevPage && setPage(pagination.prevPage)}
                          disabled={!pagination.hasPrevPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Prev
                        </button>

                        <div className="text-sm text-gray-700">
                          Page {pagination.page} / {Math.max(1, pagination.totalPages || 1)}
                        </div>

                        <button
                          type="button"
                          onClick={() => pagination.nextPage && setPage(pagination.nextPage)}
                          disabled={!pagination.hasNextPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Next
                        </button>

                        <div className="ml-2 flex items-center gap-2">
                          <span className="text-sm text-gray-600">Rows</span>
                          <select
                            value={limit}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10) || 10;
                              setLimit(v);
                              setPage(1);
                            }}
                            className="rounded-md border px-2 py-1 text-sm"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                        {users.map((user, index) => (
                          <tr key={user.id || index}>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <h4 className="subHeadingColor font-semibold text-sm">
                                {user.name}
                              </h4>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.email}</p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.mobile || "-"}</p>
                            </td>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="text-gray-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 w-fit">
                                {user.role === "BUSINESS_OWNER" ? "Owner" : user.role}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString()
                                  : "-"}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <Switch
                                id={`block-${user.id}`}
                                checked={!user.isActive}
                                disabled={statusUpdatingId === user.id}
                                onCheckedChange={(checked) => handleToggleUserStatus(user, checked)}
                                className="data-[state=unchecked]:bg-green-500 data-[state=checked]:bg-red-500"
                              />
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setOpenActionRow(
                                      openActionRow === `admin-${index}`
                                        ? null
                                        : `admin-${index}`
                                    )
                                  }
                                  className="flex mx-auto items-center textprimaryColor"
                                >
                                  <Ellipsis className="w-4 h-4" />
                                </button>

                                {openActionRow === `admin-${index}` && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-40"
                                      onClick={() => setOpenActionRow(null)}
                                    />
                                    <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                      <ul className="p-2 text-sm space-y-1">
                                        <li
                                          onClick={() => {
                                            openViewForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Eye className="w-3 h-3" /> View Details
                                          </div>
                                        </li>

                                        <li
                                          onClick={() => {
                                            openEditForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Pencil className="w-3 h-3" /> Edit
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
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-600">
                        Showing {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                        {" - "}
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                        {" of "}
                        {pagination.total}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => pagination.prevPage && setPage(pagination.prevPage)}
                          disabled={!pagination.hasPrevPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Prev
                        </button>

                        <div className="text-sm text-gray-700">
                          Page {pagination.page} / {Math.max(1, pagination.totalPages || 1)}
                        </div>

                        <button
                          type="button"
                          onClick={() => pagination.nextPage && setPage(pagination.nextPage)}
                          disabled={!pagination.hasNextPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Next
                        </button>

                        <div className="ml-2 flex items-center gap-2">
                          <span className="text-sm text-gray-600">Rows</span>
                          <select
                            value={limit}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10) || 10;
                              setLimit(v);
                              setPage(1);
                            }}
                            className="rounded-md border px-2 py-1 text-sm"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                        {users.map((user, index) => (
                          <tr key={user.id || index}>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <h4 className="subHeadingColor font-semibold text-sm">
                                {user.name}
                              </h4>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.email}</p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.mobile || "-"}</p>
                            </td>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="text-green-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-green-100 w-fit">
                                {user.role === "BUSINESS_OWNER" ? "Owner" : user.role}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString()
                                  : "-"}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <Switch
                                id={`block-${user.id}`}
                                checked={!user.isActive}
                                disabled={statusUpdatingId === user.id}
                                onCheckedChange={(checked) => handleToggleUserStatus(user, checked)}
                                className="data-[state=unchecked]:bg-green-500 data-[state=checked]:bg-red-500"
                              />
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setOpenActionRow(
                                      openActionRow === `owner-${index}`
                                        ? null
                                        : `owner-${index}`
                                    )
                                  }
                                  className="flex mx-auto items-center textprimaryColor"
                                >
                                  <Ellipsis className="w-4 h-4" />
                                </button>

                                {openActionRow === `owner-${index}` && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-40"
                                      onClick={() => setOpenActionRow(null)}
                                    />
                                    <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                      <ul className="p-2 text-sm space-y-1">
                                        <li
                                          onClick={() => {
                                            openViewForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Eye className="w-3 h-3" /> View Details
                                          </div>
                                        </li>

                                        <li
                                          onClick={() => {
                                            openEditForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Pencil className="w-3 h-3" /> Edit
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
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-600">
                        Showing {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                        {" - "}
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                        {" of "}
                        {pagination.total}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => pagination.prevPage && setPage(pagination.prevPage)}
                          disabled={!pagination.hasPrevPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Prev
                        </button>

                        <div className="text-sm text-gray-700">
                          Page {pagination.page} / {Math.max(1, pagination.totalPages || 1)}
                        </div>

                        <button
                          type="button"
                          onClick={() => pagination.nextPage && setPage(pagination.nextPage)}
                          disabled={!pagination.hasNextPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Next
                        </button>

                        <div className="ml-2 flex items-center gap-2">
                          <span className="text-sm text-gray-600">Rows</span>
                          <select
                            value={limit}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10) || 10;
                              setLimit(v);
                              setPage(1);
                            }}
                            className="rounded-md border px-2 py-1 text-sm"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                        {users.map((user, index) => (
                          <tr key={user.id || index}>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <h4 className="subHeadingColor font-semibold text-sm">
                                {user.name}
                              </h4>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.email}</p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">{user.mobile || "-"}</p>
                            </td>
                            <td className="p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="text-blue-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                                {user.role === "BUSINESS_OWNER" ? "Owner" : user.role}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <p className="textColor text-sm">
                                {user.createdAt
                                  ? new Date(user.createdAt).toLocaleDateString()
                                  : "-"}
                              </p>
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <Switch
                                id={`block-${user.id}`}
                                checked={!user.isActive}
                                disabled={statusUpdatingId === user.id}
                                onCheckedChange={(checked) => handleToggleUserStatus(user, checked)}
                                className="data-[state=unchecked]:bg-green-500 data-[state=checked]:bg-red-500"
                              />
                            </td>
                            <td className="text-center p-2 py-4 border-b border-[#f1f3f7]">
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setOpenActionRow(
                                      openActionRow === `investor-${index}`
                                        ? null
                                        : `investor-${index}`
                                    )
                                  }
                                  className="flex mx-auto items-center textprimaryColor"
                                >
                                  <Ellipsis className="w-4 h-4" />
                                </button>

                                {openActionRow === `investor-${index}` && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-40"
                                      onClick={() => setOpenActionRow(null)}
                                    />
                                    <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                      <ul className="p-2 text-sm space-y-1">
                                        <li
                                          onClick={() => {
                                            openViewForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Eye className="w-3 h-3" /> View Details
                                          </div>
                                        </li>

                                        <li
                                          onClick={() => {
                                            openEditForUser(user.id);
                                            setOpenActionRow(null);
                                          }}
                                          className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                        >
                                          <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                            <Pencil className="w-3 h-3" /> Edit
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
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-600">
                        Showing {pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}
                        {" - "}
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                        {" of "}
                        {pagination.total}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => pagination.prevPage && setPage(pagination.prevPage)}
                          disabled={!pagination.hasPrevPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Prev
                        </button>

                        <div className="text-sm text-gray-700">
                          Page {pagination.page} / {Math.max(1, pagination.totalPages || 1)}
                        </div>

                        <button
                          type="button"
                          onClick={() => pagination.nextPage && setPage(pagination.nextPage)}
                          disabled={!pagination.hasNextPage || loading}
                          className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                        >
                          Next
                        </button>

                        <div className="ml-2 flex items-center gap-2">
                          <span className="text-sm text-gray-600">Rows</span>
                          <select
                            value={limit}
                            onChange={(e) => {
                              const v = parseInt(e.target.value, 10) || 10;
                              setLimit(v);
                              setPage(1);
                            }}
                            className="rounded-md border px-2 py-1 text-sm"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
              <button
                onClick={() => {
                  setAddUserError("");
                  setOpenmodal(false);
                }}
              >
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {/* Body */}
            <form className="space-y-4" onSubmit={handleCreateUser}>
              {addUserError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {addUserError}
                </div>
              ) : null}
              {/* Business Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={addUserForm.name}
                  onChange={(e) => {
                    setAddUserError("");
                    setAddUserForm((p) => ({ ...p, name: e.target.value }));
                  }}
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
                  value={addUserForm.email}
                  onChange={(e) => {
                    setAddUserError("");
                    setAddUserForm((p) => ({ ...p, email: e.target.value }));
                  }}
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
                  value={addUserForm.password}
                  onChange={(e) => {
                    setAddUserError("");
                    setAddUserForm((p) => ({ ...p, password: e.target.value }));
                  }}
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
                  <Select
                    value={addUserForm.role}
                    onValueChange={(val) => {
                      setAddUserError("");
                      setAddUserForm((p) => ({ ...p, role: val }));
                    }}
                  >
                    <SelectTrigger
                      className="w-full p-3 rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="BUSINESS_OWNER">Business Owner</SelectItem>
                      <SelectItem value="INVESTOR">Investor</SelectItem>
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
                  value={addUserForm.mobile}
                  onChange={(e) => {
                    setAddUserError("");
                    setAddUserForm((p) => ({
                      ...p,
                      mobile: normalizeMobile10(e.target.value),
                    }));
                  }}
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setAddUserError("");
                    setOpenmodal(false);
                  }}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addUserLoading}
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {addUserLoading ? "Creating..." : "Create User"}
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
              <button
                onClick={() => {
                  setEditUserError("");
                  setSelectedUserId(null);
                  setOpenEditmodal(false);
                }}
              >
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {/* Body */}
            <form className="space-y-4" onSubmit={handleUpdateUser}>
              {editUserError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {editUserError}
                </div>
              ) : null}

              {editUserLoading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : null}
              {/* Business Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={editUserForm.name}
                  onChange={(e) => {
                    setEditUserError("");
                    setEditUserForm((p) => ({ ...p, name: e.target.value }));
                  }}
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
                  value={editUserForm.email}
                  disabled
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50 text-gray-500
                     focus:outline-none"
                />
              </div>

              {/* Owner Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="(not editable here)"
                  disabled
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50 text-gray-500
                     focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2 textColor">
                  Role
                </label>

                <div className="relative w-full">
                  <Select
                    value={editUserForm.role}
                    onValueChange={(val) => {
                      setEditUserError("");
                      setEditUserForm((p) => ({ ...p, role: val }));
                    }}
                  >
                    <SelectTrigger
                      className="w-full p-3 rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="BUSINESS_OWNER">Business Owner</SelectItem>
                      <SelectItem value="INVESTOR">Investor</SelectItem>
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
                  value={editUserForm.mobile}
                  onChange={(e) => {
                    setEditUserError("");
                    setEditUserForm((p) => ({
                      ...p,
                      mobile: normalizeMobile10(e.target.value),
                    }));
                  }}
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setEditUserError("");
                    setSelectedUserId(null);
                    setOpenEditmodal(false);
                  }}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editUserLoading || !selectedUserId}
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {editUserLoading ? "Updating..." : "Update User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {openViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">User Details</h2>
              <button
                onClick={() => {
                  setViewUserError("");
                  setViewUser(null);
                  setOpenViewModal(false);
                }}
              >
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {viewUserError ? (
              <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{viewUserError}</div>
            ) : null}

            {viewUserLoading ? (
              <div className="py-2 text-sm text-gray-500">Loading...</div>
            ) : null}

            {!viewUserLoading && !viewUserError ? (
              <div className="space-y-3">
                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-xs text-gray-500">Name</div>
                  <div className="text-sm font-semibold text-gray-800">{viewUser?.name || "-"}</div>
                </div>

                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-sm font-semibold text-gray-800">{viewUser?.email || "-"}</div>
                </div>

                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm font-semibold text-gray-800">{viewUser?.mobile || "-"}</div>
                </div>

                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-xs text-gray-500">Role</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {viewUser?.role === "BUSINESS_OWNER" ? "Owner" : viewUser?.role || "-"}
                  </div>
                </div>

                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {viewUser?.isActive ? "Active" : "Blocked"}
                  </div>
                </div>

                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-xs text-gray-500">Joined</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {viewUser?.createdAt ? new Date(viewUser.createdAt).toLocaleString() : "-"}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setViewUserError("");
                      setViewUser(null);
                      setOpenViewModal(false);
                    }}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}