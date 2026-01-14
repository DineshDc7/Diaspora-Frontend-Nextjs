"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Building2, Eye, X, Search, MoreHorizontal, Pencil } from "lucide-react";
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
          page: 1,
          limit: 10,
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

  // ✅ Open modal in Edit mode and prefill values
  const openEditBusiness = async (businessId) => {
    setOpenActionMenuId(null);
    setAddBusinessError("");
    setIsEditMode(true);
    setSelectedBusinessId(businessId);

    try {
      const res = await apiClient.get(`/api/admin/businesses/${businessId}`);
      const b = res?.data?.data?.business;

      setAddBusinessForm({
        businessName: b?.businessName || "",
        ownerName: b?.ownerName || "",
        ownerPhone: b?.ownerPhone || "",
        category: b?.category || "",
        city: b?.city || "",
      });

      setOpenModal(true);
    } catch (err) {
      setAddBusinessError(err?.response?.data?.message || "Failed to load business");
      setOpenModal(true);
    }
  };

  // ✅ Same handler for Create + Update
  const handleSubmitBusiness = async (e) => {
    e.preventDefault();
    if (addBusinessLoading) return;

    setAddBusinessLoading(true);
    setAddBusinessError("");

    const phoneDigits = normalizePhone10(addBusinessForm.ownerPhone);
    if (addBusinessForm.ownerPhone && phoneDigits.length !== 10) {
      setAddBusinessError("Owner phone must be exactly 10 digits");
      setAddBusinessLoading(false);
      return;
    }

    try {
      const payload = {
        businessName: addBusinessForm.businessName,
        ownerName: addBusinessForm.ownerName,
        ownerPhone: phoneDigits ? phoneDigits : null,
        category: addBusinessForm.category,
        city: addBusinessForm.city,
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
      await fetchBusinesses();
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
      ownerName: "",
      ownerPhone: "",
      category: "",
      city: "",
    });
    setOpenActionMenuId(null);
    setOpenModal(true);
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
                  <button
                    onClick={() => setOpen(true)}
                    className="md:hidden p-2 rounded-md"
                  >
                    ☰
                  </button>
                  <div>
                    <h1 className="text-2xl font-semibold headingColor">
                      Businesses
                    </h1>
                    <p className="py-2 text-sm textColor">
                      {loading
                        ? "Loading..."
                        : `Managing ${pagination.total || businesses.length} businesses`}
                    </p>
                  </div>
                </div>

                <div>
                  {!isMobile ? (
                    <button
                      onClick={openCreateModal}
                      className="primaryColor text-white text-sm font-semibold p-2 rounded-md flex gap-2"
                    >
                      <Building2 className="w-5 h-5" /> Add Business
                    </button>
                  ) : (
                    <button
                      onClick={openCreateModal}
                      className="primaryColor text-white text-sm font-semibold p-2 rounded-md flex gap-2"
                    >
                      <Building2 className="w-5 h-5" />
                    </button>
                  )}
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
                  <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {loading ? (
                  <div className="py-6 text-sm text-gray-500">
                    Loading businesses...
                  </div>
                ) : null}

                <div className="py-5 overflow-x-auto">
                  <table className="min-w-[900px] w-full table-fixed border border-[#f1f3f7]">
                    <thead>
                      <tr className="secondaryColor">
                        <th
                          className="text-start p-2 border-[#f1f3f7] w-[28%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Business</h5>
                        </th>
                        <th
                          className="text-center p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Owner</h5>
                        </th>
                        <th
                          className="text-center p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Category</h5>
                        </th>
                        <th
                          className="text-center p-2 border-[#f1f3f7] w-[18%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">City</h5>
                        </th>
                        <th
                          className="text-center p-2 border-[#f1f3f7] w-[12%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Reports</h5>
                        </th>
                        <th
                          className="text-center p-2 border-[#f1f3f7] w-[15%]"
                          style={{ verticalAlign: "center" }}
                        >
                          <h5 className="subHeadingColor text-base">Actions</h5>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {businesses.map((item, index) => (
                        <tr key={item.id || index}>
                          <td className="p-2 py-4 border-b border-[#f1f3f7]">
                            <div>
                              <h4 className="headingColor font-semibold text-sm">
                                {item.businessName}
                              </h4>
                              <p className="textColor text-xs">
                                {item.ownerPhone || "-"}
                              </p>
                            </div>
                          </td>

                          <td className="p-2 text-center py-4 border-b border-[#f1f3f7]">
                            <p className="textColor text-sm">{item.ownerName}</p>
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
      onClick={() =>
        setOpenActionMenuId(openActionMenuId === item.id ? null : item.id)
      }
      className="p-2 rounded-full hover:bg-gray-100"
    >
      <MoreHorizontal className="w-5 h-5 text-gray-600" />
    </button>

    {openActionMenuId === item.id && (
      <>
        {/* Action menu (same like Users) */}
        <div className="absolute right-20 bottom-0 z-50 w-45 rounded-md bg-white text-start shadow-md border">
          <ul className="p-2 text-sm space-y-1">
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
              onClick={() => {
                setOpenActionMenuId(null);
              }}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
            >
              <Link
                href="/admin/allreports"
                className="flex gap-2 items-center textprimaryColor text-sm font-semibold"
              >
                <Eye className="w-3 h-3" /> View Reports
              </Link>
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
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {isEditMode ? "Edit Business" : "Add New Business"}
              </h2>
              <button onClick={closeModal}>
                <X className="h-5 w-5" color="#797979" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitBusiness}>
              {addBusinessError ? (
                <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {addBusinessError}
                </div>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="ABC Store"
                  value={addBusinessForm.businessName}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({
                      ...p,
                      businessName: e.target.value,
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={addBusinessForm.ownerName}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({
                      ...p,
                      ownerName: e.target.value,
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Owner Phone
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="1234567890"
                  value={addBusinessForm.ownerPhone}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({
                      ...p,
                      ownerPhone: normalizePhone10(e.target.value),
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Restaurant, Retail, etc."
                  value={addBusinessForm.category}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({
                      ...p,
                      category: e.target.value,
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="New York"
                  value={addBusinessForm.city}
                  onChange={(e) => {
                    setAddBusinessError("");
                    setAddBusinessForm((p) => ({
                      ...p,
                      city: e.target.value,
                    }));
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
    </>
  );
}