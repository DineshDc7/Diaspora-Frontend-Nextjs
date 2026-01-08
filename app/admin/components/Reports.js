import React from "react";
import { Eye } from "lucide-react";
const Reports = () => {
  return (
    <>
      <div className="shadow-lg rounded-lg bg-white p-4">
        <div className="flex justify-between items-center">
          <div className="w-[80%]">
            <h2 className="headingColor text-lg font-semibold">Reports</h2>
            <p className="textColor">
              Drill into any Nigerian business for financials, media, and
              compliance
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <a className="textColor" href="/admin/allreports">
                View all
              </a>
            </div>
          </div>
        </div>
        <div className="bg-neutral-50 p-4 mt-3">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full table-fixed border-collapse">
              <thead>
                <tr>
                  <th className="text-start pb-4 border-b border-gray-100 w-[20%]">
                    <h5 className="subHeadingColor text-base">Business</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[15%]">
                    <h5 className="subHeadingColor text-base">Date</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                    <h5 className="subHeadingColor text-base">Sales</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[15%]">
                    <h5 className="subHeadingColor text-base">Expenses</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[20%]">
                    <h5 className="subHeadingColor text-base">Customers</h5>
                  </th>
                  <th className="text-center pb-4 border-b border-gray-100 w-[10%]">
                    <h5 className="subHeadingColor text-base">Profit</h5>
                  </th>
                  {/* <th className="text-start pb-4 border-b border-gray-100">
                    <h5 className="subHeadingColor text-base">Actions</h5>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4">
                    <h4 className="headingColor font-semibold text-sm">
                      Nairobi Fresh Mart
                    </h4>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">
                      12/12/2025
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-600 text-sm font-semibold">
                      $1,199.91
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-red-600 text-sm font-semibold">$2000</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">23</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-700 text-sm font-semibold">$500</p>
                  </td>
                  {/* <td className="py-4">
                    <a href="#" className="flex gap-2 items-center textprimaryColor text-sm font-semibold"><Eye className='w-5 h-5' /> View</a>
                  </td> */}
                </tr>
                <tr>
                  <td className="py-4">
                    <h4 className="headingColor font-semibold text-sm">
                      Nairobi Fresh Mart
                    </h4>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">
                      12/12/2025
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-600 text-sm font-semibold">
                      $1,199.91
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-red-600 text-sm font-semibold">$2000</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">23</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-700 text-sm font-semibold">$500</p>
                  </td>
                  {/* <td className="py-4">
                    <a href="#" className="flex gap-2 items-center textprimaryColor text-sm font-semibold"><Eye className='w-5 h-5' /> View</a>
                  </td> */}
                </tr>
                <tr>
                  <td className="py-4">
                    <h4 className="headingColor font-semibold text-sm">
                      Nairobi Fresh Mart
                    </h4>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">
                      12/12/2025
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-600 text-sm font-semibold">
                      $1,199.91
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-red-600 text-sm font-semibold">$2000</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">23</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-700 text-sm font-semibold">$500</p>
                  </td>
                  {/* <td className="py-4">
                    <a href="#" className="flex gap-2 items-center textprimaryColor text-sm font-semibold"><Eye className='w-5 h-5' /> View</a>
                  </td> */}
                </tr>
                <tr>
                  <td className="py-4">
                    <h4 className="headingColor font-semibold text-sm">
                      Nairobi Fresh Mart
                    </h4>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">
                      12/12/2025
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-600 text-sm font-semibold">
                      $1,199.91
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-red-600 text-sm font-semibold">$2000</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm font-semibold">23</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="text-green-700 text-sm font-semibold">$500</p>
                  </td>
                  {/* <td className="py-4">
                    <a href="#" className="flex gap-2 items-center textprimaryColor text-sm font-semibold"><Eye className='w-5 h-5' /> View</a>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
