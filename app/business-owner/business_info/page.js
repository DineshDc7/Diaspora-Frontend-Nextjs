"use client";

import BusinessLayout from "../components/BusinessLayout";
import { PhoneCall, ChartColumnStacked, Building2 } from "lucide-react";

export default function BusinessInfo() {
    return (
        <BusinessLayout>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">

                <div className="xl:col-span-4 space-y-6">
                    <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
                        <h1 className="headingColor text-lg font-semibold mb-10">Adams Baker <span className="text-base text-gray-500">(Owner)</span></h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-100 p-4 rounded-4xl"><PhoneCall className="w-7 h-7"/></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">Phone</h3>
                                        <p className="text-lg"><a href="#">8876787678</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div><ChartColumnStacked /></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">Category</h3>
                                        <p className="text-lg"><a href="#">Retail</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border border-neutral-100 rounded-md">
                                <div className="flex items-center gap-5">
                                    <div><Building2 /></div>
                                    <div>
                                        <h3 className="subHeadingcolor text-sm font-semibold">City</h3>
                                        <p className="text-lg"><a href="#">Nairobi</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>

            </div>
        </BusinessLayout>
    );
}
