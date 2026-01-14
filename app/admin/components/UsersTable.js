

"use client";

import Link from "next/link";

const roleLabel = (role) => {
  if (role === "ADMIN") return "Admin";
  if (role === "BUSINESS_OWNER") return "Business Owner";
  if (role === "INVESTOR") return "Investor";
  return role || "-";
};

export default function UsersTable({ users = [] }) {
  return (
    <div className="shadow-lg rounded-lg bg-white p-4">
      <div className="flex justify-between items-center">
        <div className="w-[80%]">
          <h2 className="headingColor text-lg font-semibold">Users</h2>
          <p className="textColor">Recently added users across all roles</p>
        </div>
        <div className="flex gap-5 items-center">
          <div>
            <Link className="textColor" href="/admin/user">
              View all
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 p-4 mt-3">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] md:min-w-auto w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="text-start pb-4 border-b border-gray-100 w-[30%]">
                  <h5 className="subHeadingColor text-base">User</h5>
                </th>
                <th className="text-start pb-4 border-b border-gray-100 w-[30%]">
                  <h5 className="subHeadingColor text-base">Email</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                  <h5 className="subHeadingColor text-base">Role</h5>
                </th>
                <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                  <h5 className="subHeadingColor text-base">Status</h5>
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td className="py-6 text-center text-sm text-gray-500" colSpan={4}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-4">
                      <div>
                        <h4 className="headingColor font-semibold text-sm">
                          {u.name || "-"}
                        </h4>
                        <p className="textColor text-xs">{u.mobile || "-"}</p>
                      </div>
                    </td>

                    <td className="py-4">
                      <p className="textColor text-sm">{u.email || "-"}</p>
                    </td>

                    <td className="py-4 text-center">
                      <p className="mx-auto text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                        {roleLabel(u.role)}
                      </p>
                    </td>

                    <td className="py-4 text-center">
                      <p
                        className={`mx-auto px-3 py-1 text-xs font-semibold rounded-full w-fit ${
                          u.isActive
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                        }`}
                      >
                        {u.isActive ? "Active" : "Inactive"}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}