"use client";

import InvestorLayout from "../components/InvestorLayout";



const details = [
    {
        bname: "Kantor Imigrasi Kelas I Denpasar",
        owner: "Vishal Singh",
        category: "Retail",
        place: "KAB. ",
    },
    {
        bname: "Nairobi Fresh Mart",
        owner: "John Don",
        category: "Retail",
        place: "Nairobi",
    },

];
export default function AllBusiness() {
    return (
        <InvestorLayout title="All Businesses" subtitle="Browse and Select Businesses to Follow">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
                <div className="xl:col-span-4 space-y-6">
                    <div className="shadow-lg rounded-lg bg-white p-4">
                        {/* Header */}
                        <div>
                            <p className="textColor text-base">
                                Select businesses you want to follow and track their daily reports
                            </p>
                        </div>

                        {/* <div className="grid grid-cols-2 gap-5">
                            <div className="p-4 bg-[#f5faff] rounded-lg shadow-[0px_10px_15px_#e4e4e4c2]">
                                <h5 className="subHeadingColor text-base">Total Business</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">4</h2>
                            </div>
                            <div className="p-4 bg-[#f5faff] rounded-lg shadow-[0px_10px_15px_#e4e4e4c2]">
                                <h5 className="subHeadingColor text-base">Following Business</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">4</h2>
                            </div>
                        </div> */}

                        {/* Table */}
                        <div className="mt-4 overflow-x-auto">
                            <table className="w-full min-w-[800px] border-collapse">
                                <thead>
                                    <tr className="secondaryColor text-left subHeadingColor text-base">
                                        <th className="py-3 px-2 w-[30%]">Business Name</th>
                                        <th className="py-3 px-2 w-[17%]">Owner Name</th>
                                        <th className="py-3 px-2 w-[17%]">Category</th>
                                        <th className="py-3 px-2 w-[18%]">Place</th>
                                        <th className="py-3 px-2 w-[18%] text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {details.map((item) => (
                                        <tr
                                            key={item.bname}
                                            className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-2 text-sm font-semibold headingColor whitespace-nowrap">
                                                {item.bname}
                                            </td>
                                            <td className="py-3 px-2">
                                                {item.owner}
                                            </td>
                                            <td className="py-3 px-2">
                                                {item.category}
                                            </td>
                                            <td className="py-3 px-2">
                                                {item.place}
                                            </td>

                                            <td className="py-3 px-2 text-center">
                                                <div className="flex gap-3 items-center">
                                                    <button className="primaryColor text-white font-semibold text-sm rounded-md px-3 py-1">Follow</button>
                                                    {/* <button className="bg-red-600 text-white font-semibold text-sm rounded-md px-3 py-1">Unfollow</button> */}
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
        </InvestorLayout>
    );
}
