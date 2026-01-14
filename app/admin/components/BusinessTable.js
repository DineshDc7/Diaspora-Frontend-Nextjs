"use client";

import Link from "next/link";

export default function BusinessTable({ businesses = [] }) {
  return (
    <>
      <div className="shadow-lg rounded-lg bg-white p-4">
        <div className="flex justify-between items-center">
          <div className='w-[80%]'>
            <h2 className="headingColor text-lg font-semibold">Businesses</h2>
            <p className="textColor">
              Drill into any Nigerian business for financials, media, and
              compliance
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <Link className="textColor" href="/admin/business">
                View all
              </Link>
            </div>
            {/* <div>
              <a
                className="primaryColor text-white text-sm font-semibold p-3 rounded-md"
                href="#"
              >
                Add business
              </a>
            </div> */}
          </div>
        </div>
        <div className="bg-neutral-50 p-4 mt-3">
          

          <div className="overflow-x-auto">
            <table className="min-w-[600px] md:min-w-auto w-full table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="text-start pb-4 border-b border-gray-100 w-[30%]">
                    <h5 className="subHeadingColor text-base">Business</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[15%]">
                    <h5 className="subHeadingColor text-base">Owner</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                    <h5 className="subHeadingColor text-base">Category</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[15%]">
                    <h5 className="subHeadingColor text-base">City</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                    <h5 className="subHeadingColor text-base">Reports</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {businesses.length === 0 ? (
                  <tr>
                    <td className="py-6 text-center text-sm text-gray-500" colSpan={5}>
                      No businesses found.
                    </td>
                  </tr>
                ) : (
                  businesses.map((b) => (
                    <tr key={b.id}>
                      <td className="py-4">
                        <div>
                          <h4 className="headingColor font-semibold text-sm">
                            {b.businessName}
                          </h4>
                          <p className="textColor text-sm">{b.ownerPhone || "-"}</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <p className="textColor text-sm">{b.ownerName || "-"}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="mx-auto text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                          {b.category || "-"}
                        </p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="textColor text-sm">{b.city || "-"}</p>
                      </td>
                      <td className="py-4 text-center">
                        <p className="textColor text-sm">0</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
