"use client";
import { Eye } from 'lucide-react';
export default function BusinessTable() {
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
              <a className="textColor" href="/admin/business">
                View all
              </a>
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
            <table className="min-w-[900px] md:min-w-auto w-full table-fixed border-collapse">
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
           
                <tr>
                  <td className="py-4">
                    <div>
                      <h4 className="headingColor font-semibold text-sm">
                        Kantor imigrasi kelas i denpasar
                      </h4>
                      <p className="textColor text-sm">Kano - Retail</p>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Vishal Singh</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="mx-auto text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                      Retail
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Kab Gianyar</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">0</p>
                  </td>
                  
                </tr>
                <tr>
                  <td className="py-4">
                    <div>
                      <h4 className="headingColor font-semibold text-sm">
                        Kantor imigrasi kelas i denpasar
                      </h4>
                      <p className="textColor text-sm">Kano - Retail</p>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Vishal Singh</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="mx-auto text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                      Retail
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Kab Gianyar</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">0</p>
                  </td>
                  
                </tr>
                <tr>
                  <td className="py-4">
                    <div>
                      <h4 className="headingColor font-semibold text-sm">
                        Kantor imigrasi kelas i denpasar
                      </h4>
                      <p className="textColor text-sm">Kano - Retail</p>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Vishal Singh</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="mx-auto text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                      Retail
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Kab Gianyar</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">0</p>
                  </td>
                  
                </tr>
                <tr>
                  <td className="py-4">
                    <div>
                      <h4 className="headingColor font-semibold text-sm">
                        Kantor imigrasi kelas i denpasar
                      </h4>
                      <p className="textColor text-sm">Kano - Retail</p>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Vishal Singh</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="mx-auto text-blue-600 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 w-fit">
                      Retail
                    </p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">Kab Gianyar</p>
                  </td>
                  <td className="py-4 text-center">
                    <p className="textColor text-sm">0</p>
                  </td>
                  
                </tr>
             

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
