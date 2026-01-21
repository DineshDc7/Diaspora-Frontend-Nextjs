"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Building2, Eye, X, Search, MoreHorizontal, Pencil, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";
import apiClient from "../../../lib/apiClient";

export default function AdminBusiness() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // ✅ Edit support (same modal)
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);

  // ✅ Assign Owner modal
  const [assignOwnerOpen, setAssignOwnerOpen] = useState(false);
  const [ownersOptions, setOwnersOptions] = useState([]);
  const [ownersLoading, setOwnersLoading] = useState(false);
  const [ownersError, setOwnersError] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [assignOwnerLoading, setAssignOwnerLoading] = useState(false);
  const [assignOwnerError, setAssignOwnerError] = useState("");

  // ✅ View Details modal
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [viewDetailsLoading, setViewDetailsLoading] = useState(false);
  const [viewDetailsError, setViewDetailsError] = useState("");
  const [selectedBusinessDetails, setSelectedBusinessDetails] = useState(null);

  const isMobile = useIsMobile();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const searchDebounceRef = useRef(null);

  const [addBusinessForm, setAddBusinessForm] = useState({
    businessName: "",
    ownerUserId: "", // optional
    ownerName: "",
    ownerPhone: "",
    category: "",
    city: "",
  });

  const [addBusinessLoading, setAddBusinessLoading] = useState(false);
  const [addBusinessError, setAddBusinessError] = useState("");

  const normalizePhone10 = (v) => String(v || "").replace(/\D/g, "").slice(0, 10);

  const fetchBusinesses = async (override = {}) => {
    setLoading(true);
    setError("");

    try {
      const res = await apiClient.get("/api/admin/businesses", {
        params: {
          page: override.page ?? pagination?.page ?? 1,
          limit: override.limit ?? pagination?.limit ?? 10,
          ...(searchText.trim() ? { search: searchText.trim() } : {}),
          ...override,
        },
      });

      const data = res?.data?.data;
      setBusinesses(Array.isArray(data?.businesses) ? data.businesses : []);
      setPagination(
        data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load businesses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Owner dropdown: fetch BUSINESS_OWNER users
  const fetchOwnerOptions = async () => {
    setOwnersLoading(true);
    setOwnersError("");

    try {
      const res = await apiClient.get("/api/admin/users/options", {
        params: { role: "BUSINESS_OWNER" },
      });

      const list = res?.data?.data?.users;
      setOwnersOptions(Array.isArray(list) ? list : []);
    } catch (err) {
      setOwnersError(err?.response?.data?.message || "Failed to load owners");
      setOwnersOptions([]);
    } finally {
      setOwnersLoading(false);
    }
  };

  const openAssignOwnerForBusiness = async (businessId) => {
    setOpenActionMenuId(null);
    setSelectedBusinessId(businessId);
    setSelectedOwnerId("");
    setAssignOwnerError("");
    setOwnersError("");
    setAssignOwnerOpen(true);

    await fetchOwnerOptions();
  };

  const closeAssignOwnerModal = () => {
    setAssignOwnerError("");
    setOwnersError("");
    setSelectedOwnerId("");
    setAssignOwnerOpen(false);
  };

  const openViewDetails = async (businessId) => {
    setOpenActionMenuId(null);
    setViewDetailsError("");
    setSelectedBusinessDetails(null);
    setViewDetailsOpen(true);
    setViewDetailsLoading(true);

    try {
      const res = await apiClient.get(`/api/admin/businesses/${businessId}`);
      const b = res?.data?.data?.business;
      setSelectedBusinessDetails(b || null);
    } catch (err) {
      setViewDetailsError(err?.response?.data?.message || "Failed to load business details");
      setSelectedBusinessDetails(null);
    } finally {
      setViewDetailsLoading(false);
    }
  };

  const closeViewDetails = () => {
    setViewDetailsError("");
    setSelectedBusinessDetails(null);
    setViewDetailsOpen(false);
  };

  // ✅ PUT /admin/businesses/:id/assign-owner (via Next API proxy)
  const handleAssignOwner = async (e) => {
    e.preventDefault();

    if (!selectedBusinessId) {
      setAssignOwnerError("Business not selected");
      return;
    }

    if (!selectedOwnerId) {
      setAssignOwnerError("Please select an owner");
      return;
    }

    setAssignOwnerLoading(true);
    setAssignOwnerError("");

    try {
      // ✅ backend is PUT, so frontend must use PUT
      await apiClient.put(`/api/admin/businesses/${selectedBusinessId}/assign-owner`, {
        ownerUserId: Number(selectedOwnerId),
      });

      closeAssignOwnerModal();

      await fetchBusinesses({
        page: pagination?.page || 1,
        limit: pagination?.limit || 10,
        ...(searchText.trim() ? { search: searchText.trim() } : {}),
      });
    } catch (err) {
      setAssignOwnerError(err?.response?.data?.message || "Failed to assign owner");
    } finally {
      setAssignOwnerLoading(false);
    }
  };

  // ✅ Open modal in Edit mode and prefill values
  const openEditBusiness = async (businessId) => {
    setOpenActionMenuId(null);
    setAddBusinessError("");
    setIsEditMode(true);
    setSelectedBusinessId(businessId);

    try {
      // Make sure owners list exists for dropdown
      await fetchOwnerOptions();

      const res = await apiClient.get(`/api/admin/businesses/${businessId}`);
      const b = res?.data?.data?.business;

      const ownerUserId = b?.ownerUserId ? String(b.ownerUserId) : "";
      const ownerPhone = b?.ownerUser?.mobile || b?.ownerPhone || "";

      setAddBusinessForm({
        businessName: b?.businessName || "",
        ownerUserId,
        ownerName: b?.ownerUser?.name || b?.ownerName || "",
        ownerPhone: ownerPhone || "",
        category: b?.category || "",
        city: b?.city || "",
      });

      setOpenModal(true);
    } catch (err) {
      setAddBusinessError(err?.response?.data?.message || "Failed to load business");
      setOpenModal(true);
    }
  };

  // ✅ Create + Update
  const handleSubmitBusiness = async (e) => {
    e.preventDefault();
    if (addBusinessLoading) return;

    setAddBusinessLoading(true);
    setAddBusinessError("");

    try {
      const selectedOwner = ownersOptions.find(
        (u) => String(u.id) === String(addBusinessForm.ownerUserId)
      );

      const hasOwnerSelected = Boolean(addBusinessForm.ownerUserId);

      // If owner selected -> auto fill, else send placeholder (backend currently requires ownerName)
      const finalOwnerName = hasOwnerSelected
        ? (selectedOwner?.name || addBusinessForm.ownerName)
        : "Owner not assigned";

      const finalOwnerPhoneRaw = hasOwnerSelected
        ? (selectedOwner?.mobile || addBusinessForm.ownerPhone)
        : "";

      // Validate phone if provided
      const phoneDigits = normalizePhone10(finalOwnerPhoneRaw);
      if (finalOwnerPhoneRaw && phoneDigits.length !== 10) {
        setAddBusinessError("Owner phone must be exactly 10 digits");
        setAddBusinessLoading(false);
        return;
      }

      const payload = {
        businessName: addBusinessForm.businessName,
        category: addBusinessForm.category,
        city: addBusinessForm.city,

        // Optional assignment
        ownerUserId: addBusinessForm.ownerUserId ? Number(addBusinessForm.ownerUserId) : null,

        // Keep these for your current backend validation
        ownerName: finalOwnerName,
        ownerPhone: hasOwnerSelected && phoneDigits ? phoneDigits : null,
      };

      if (isEditMode && selectedBusinessId) {
        await apiClient.put(`/api/admin/businesses/${selectedBusinessId}`, payload);
      } else {
        await apiClient.post("/api/admin/businesses", payload);
      }

      setOpenModal(false);
      setIsEditMode(false);
      setSelectedBusinessId(null);
      setAddBusinessForm({
        businessName: "",
        ownerUserId: "",
        ownerName: "",
        ownerPhone: "",
        category: "",
        city: "",
      });

      await fetchBusinesses();
    } catch (err) {
      setAddBusinessError(
        err?.response?.data?.message ||
          (isEditMode ? "Failed to update business" : "Failed to create business")
      );
    } finally {
      setAddBusinessLoading(false);
    }
  };

  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    searchDebounceRef.current = setTimeout(async () => {
      await fetchBusinesses({ page: 1 });
    }, 400);

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateModal = () => {
    setAddBusinessError("");
    setIsEditMode(false);
    setSelectedBusinessId(null);
    setAddBusinessForm({
      businessName: "",
      ownerUserId: "",
      ownerName: "",
      ownerPhone: "",
      category: "",
      city: "",
    });
    setOpenActionMenuId(null);
    setOpenModal(true);

    // preload owner options for dropdown
    fetchOwnerOptions();
  };

  const closeModal = () => {
    setOpenActionMenuId(null);
    setAddBusinessError("");
    setIsEditMode(false);
    setSelectedBusinessId(null);
    setOpenModal(false);
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
                  <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-md">
                    ☰
                  </button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">Businesses</h1>
                    <p className="py-2 text-sm textColor">
                      {loading ? "Loading..." : `Managing ${pagination.total || businesses.length} businesses`}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={openCreateModal}
                    className="primaryColor text-white text-sm font-semibold p-2 rounded-md flex gap-2"
                  >
                    <Building2 className="w-5 h-5" /> {!isMobile ? "Add Business" : ""}
                  </button>
                </div>
              </div>

              <div className="shadow-md rounded-lg p-4 mb-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search Businesses"
                    className="w-full rounded-lg border text-sm border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error ? (
                  <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
                ) : null}

                {loading ? <div className="py-6 text-sm text-gray-500">Loading businesses...</div> : null}

                <div className="py-5 overflow-x-auto">
                  <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th className="text-start p-2 border-[#f1f3f7] w-[28%]">
                          <h5 className="subHeadingColor text-base">Business</h5>
                        </th>
                        <th className="text-center p-2 border-[#f1f3f7] w-[15%]">
                          <h5 className="subHeadingColor text-base">Owner</h5>
                        </th>
                        <th className="text-center p-2 border-[#f1f3f7] w-[12%]">
                          <h5 className="subHeadingColor text-base">Category</h5>
                        </th>
                        <th className="text-center p-2 border-[#f1f3f7] w-[18%]">
                          <h5 className="subHeadingColor text-base">City</h5>
                        </th>
                        <th className="text-center p-2 border-[#f1f3f7] w-[12%]">
                          <h5 className="subHeadingColor text-base">Reports</h5>
                        </th>
                        <th className="text-center p-2 border-[#f1f3f7] w-[15%]">
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {businesses.map((item, index) => (
                        <tr key={item.id || index}>
                          <td className="p-2 py-4 border-b border-[#f1f3f7]">
                            <div>
                              <h4 className="headingColor font-semibold text-sm">{item.businessName}</h4>
                              <p className="textColor text-xs">{item.ownerPhone || item?.ownerUser?.mobile || "-"}</p>
                            </div>
                          </td>

                          <td className="p-2 text-center py-4 border-b border-[#f1f3f7]">
                            {item?.ownerUser ? (
                              <div>
                                <p className="textColor text-sm">{item.ownerUser.name}</p>
                                <p className="textColor text-xs">{item.ownerUser.email}</p>
                              </div>
                            ) : (
                              <p className="textColor text-sm">{item.ownerName || "-"}</p>
                            )}
                          </td>

                          <td className="p-2 py-4 border-b border-[#f1f3f7]">
                            <p className="text-blue-600 mx-auto px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                              {item.category}
                            </p>
                          </td>

                          <td className="p-2 text-center py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">{item.city}</p>
                          </td>

                          <td className="p-2 text-center py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">-</p>
                          </td>

                          <td className="p-2 py-4 border-b border-[#f1f3f7] relative">
                            <div className="flex justify-center">
                              <button
                                type="button"
                                onClick={() => setOpenActionMenuId(openActionMenuId === item.id ? null : item.id)}
                                className="p-2 rounded-full hover:bg-gray-100"
                              >
                                <MoreHorizontal className="w-5 h-5 text-gray-600" />
                              </button>

                              {openActionMenuId === item.id && (
                                <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
                                  <ul className="p-2 text-sm space-y-1">
                                    <li
                                      onClick={async () => {
                                        setOpenActionMenuId(null);
                                        await openViewDetails(item.id);
                                      }}
                                      className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                    >
                                      <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                        <Info className="w-3 h-3" /> View Details
                                      </div>
                                    </li>
                                    <li
                                      onClick={() => {
                                        openEditBusiness(item.id);
                                        setOpenActionMenuId(null);
                                      }}
                                      className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                    >
                                      <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                        <Pencil className="w-3 h-3" /> Edit
                                      </div>
                                    </li>

                                    <li
                                      onClick={async () => {
                                        setOpenActionMenuId(null);
                                        await openAssignOwnerForBusiness(item.id);
                                      }}
                                      className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                                    >
                                      <div className="flex gap-2 items-center textprimaryColor text-sm font-semibold">
                                        <Pencil className="w-3 h-3" /> Assign Owner
                                      </div>
                                    </li>

                                    <li className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
                                      <Link
                                        href="/admin/allreports"
                                        className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
                                      >
                                        <Eye className="w-3 h-3" /> View Reports
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {!loading && businesses.length === 0 ? (
                    <div className="py-6 text-sm text-gray-500">No businesses found.</div>
                  ) : null}

                  {/* Pagination */}
                  {pagination?.totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            fetchBusinesses({
                              page: pagination.page - 1,
                              limit: pagination.limit,
                            })
                          }
                          disabled={pagination.page <= 1 || loading}
                          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Prev
                        </button>

                        <button
                          onClick={() =>
                            fetchBusinesses({
                              page: pagination.page + 1,
                              limit: pagination.limit,
                            })
                          }
                          disabled={
                            pagination.page >= pagination.totalPages || loading
                          }
                          className="rounded-md border px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Business Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{isEditMode ? "Edit Business" : "Add New Business"}</h2>
              <button onClick={closeModal}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitBusiness}>
              {addBusinessError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{addBusinessError}</div>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  placeholder="ABC Store"
                  value={addBusinessForm.businessName}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({ ...p, businessName: e.target.value }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Assign Business Owner (optional)
                </label>
                <select
                  value={addBusinessForm.ownerUserId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAddBusinessError("");
                    const selectedOwner = ownersOptions.find((u) => String(u.id) === String(val));
                    setAddBusinessForm((p) => ({
                      ...p,
                      ownerUserId: val,
                      ownerName: val ? (selectedOwner?.name || "") : "",
                      ownerPhone: val ? (selectedOwner?.mobile || "") : "",
                    }));
                  }}
                  disabled={ownersLoading}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{ownersLoading ? "Loading..." : "No owner assigned"}</option>
                  {ownersOptions.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
                {!addBusinessForm.ownerUserId ? (
                  <p className="mt-2 text-xs text-gray-500">You can assign an owner later.</p>
                ) : null}
              </div>

              {addBusinessForm.ownerUserId ? (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Owner Name</label>
                    <input
                      type="text"
                      value={addBusinessForm.ownerName}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">Owner name is auto-filled from selected user.</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Owner Phone</label>
                    <input
                      type="text"
                      value={addBusinessForm.ownerPhone}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-gray-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">Owner phone is auto-filled from selected user.</p>
                  </div>
                </>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  placeholder="Restaurant, Retail, etc."
                  value={addBusinessForm.category}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({ ...p, category: e.target.value }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  placeholder="New York"
                  value={addBusinessForm.city}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({ ...p, city: e.target.value }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={closeModal}
                  type="button"
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addBusinessLoading}
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {addBusinessLoading
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Business"
                    : "Create Business"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Owner Modal */}
      {assignOwnerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Assign Owner</h2>
              <button onClick={closeAssignOwnerModal}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAssignOwner}>
              {ownersError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{ownersError}</div>
              ) : null}

              {assignOwnerError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{assignOwnerError}</div>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Select Business Owner</label>
                <select
                  value={selectedOwnerId}
                  onChange={(e) => {
                    setAssignOwnerError("");
                    setSelectedOwnerId(e.target.value);
                  }}
                  disabled={ownersLoading}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                    focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{ownersLoading ? "Loading..." : "Select owner"}</option>
                  {ownersOptions.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>

                {!ownersLoading && ownersOptions.length === 0 ? (
                  <p className="mt-2 text-xs text-gray-500">No business owners found.</p>
                ) : null}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeAssignOwnerModal}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 w-full"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={assignOwnerLoading}
                  className="primaryColor rounded-md px-4 py-2 text-sm font-semibold text-white w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {assignOwnerLoading ? "Assigning..." : "Assign Owner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Details Modal */}
      {viewDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Business Details</h2>
              <button onClick={closeViewDetails}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            {viewDetailsError ? (
              <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{viewDetailsError}</div>
            ) : null}

            {viewDetailsLoading ? (
              <div className="py-6 text-sm text-gray-500">Loading details...</div>
            ) : null}

            {!viewDetailsLoading && !viewDetailsError && selectedBusinessDetails ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Business Name</p>
                  <p className="font-semibold">{selectedBusinessDetails.businessName || "-"}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-semibold">{selectedBusinessDetails.category || "-"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <p className="font-semibold">{selectedBusinessDetails.city || "-"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500">Owner</p>
                  {selectedBusinessDetails.ownerUser ? (
                    <div>
                      <p className="font-semibold">{selectedBusinessDetails.ownerUser.name}</p>
                      <p className="text-gray-600">{selectedBusinessDetails.ownerUser.email}</p>
                      <p className="text-gray-600">{selectedBusinessDetails.ownerUser.mobile || "-"}</p>
                    </div>
                  ) : (
                    <p className="font-semibold">{selectedBusinessDetails.ownerName || "Owner not assigned"}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-semibold">{selectedBusinessDetails.isActive ? "Active" : "Inactive"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-semibold">
                      {selectedBusinessDetails.createdAt ? new Date(selectedBusinessDetails.createdAt).toLocaleString() : "-"}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <button
                type="button"
                onClick={closeViewDetails}
                className="primaryColor w-full rounded-md px-4 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}