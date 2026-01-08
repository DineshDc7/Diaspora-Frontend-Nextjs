"use client";

import BusinessLayout from "../components/BusinessLayout";
import { PhoneCall, ChartColumnStacked, Building2 } from "lucide-react";


const details = [
        {
            business_name: "Nairobi Fresh Mart 1",
            owner_name: "John Don",
            number: "8989675847",
            category: "Retail",
            city: "Noida",
        },
        {
            business_name: "Nairobi Fresh Mart 2",
            owner_name: "John Don",
            number: "8989675847",
            category: "Retail",
            city: "Noida",
        },
        {
            business_name: "Nairobi Fresh Mart 3",
            owner_name: "John Don",
            number: "8989675847",
            category: "Retail",
            city: "Noida",
        },
        {
            business_name: "Nairobi Fresh Mart 4",
            owner_name: "John Don",
            number: "8989675847",
            category: "Retail",
            city: "Noida",
        },
    ];


export default function BusinessInfo() {
    return (
        <BusinessLayout>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">

                <div className="xl:col-span-4 space-y-6">
                    <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
                        {/* <h1 className="headingColor text-lg font-semibold mb-10">Adams Baker <span className="text-base text-gray-500">(Owner)</span></h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3">
                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-3 rounded-4xl"><PhoneCall className="w-5 h-5 text-blue-500"/></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">Phone</h3>
                                        <p className="text-lg"><a href="#">8876787678</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-3 rounded-4xl"><ChartColumnStacked className="w-5 h-5 text-blue-500" /></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">Category</h3>
                                        <p className="text-lg"><a href="#">Retail</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-3 rounded-4xl"><Building2 className="w-5 h-5 text-blue-500" /></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">City</h3>
                                        <p className="text-lg"><a href="#">Nairobi</a></p>
                                    </div>
                                </div>
                            </div>
                        </div> */}


<div className="mt-4 overflow-x-auto">
                            <table className="w-full min-w-[640px] border-collapse">
                                <thead>
                                    <tr className="secondaryColor text-center text-sm textColor">
                                        <th className="py-3 px-2 w-[30%] text-start">Business Name</th>
                                        <th className="py-3 px-2 w-[19%]">Owner Name</th>
                                        <th className="py-3 px-2 w-[17%]">Phone Number</th>
                                        <th className="py-3 px-2 w-[17%]">Category</th>
                                        <th className="py-3 px-2 w-[17%]">City</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {details.map((item) => (
                                        <tr
                                            key={item.business_name}
                                            className="border-b last:border-0 border-gray-50 text-sm hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-2 text-base font-semibold headingColor whitespace-nowrap">
                                                {item.business_name}
                                            </td>
                                            <td className="py-3 px-2 textColor text-center">
                                                {item.owner_name}
                                            </td>
                                            <td className="py-3 px-2 textColor text-center">
                                                {item.number}
                                            </td>
                                            <td className="py-3 px-2 textColor text-center">
                                                {item.category}
                                            </td>
                                            <td className="py-3 px-2 textColor text-center">
                                                {item.city}
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>



                </div>

            </div>
        </BusinessLayout>
    );
}
