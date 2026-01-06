"use client";
import { ScrollText, BadgeDollarSign, User, Percent } from "lucide-react";
export default function TotalDetails() {
    return (
        <>
            <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-5">
                    <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">Total Sales</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">$24,345</h2>
                            </div>
                            <div className="absolute right-6 bottom-6">
                                <BadgeDollarSign className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>
                    <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">Total Expenses</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">$24,345</h2>
                            </div>
                            <div className="absolute right-6 bottom-6">
                                <ScrollText className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>
                    <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">Total Profit/Loss</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">+$45</h2>
                            </div>
                            <div className="absolute right-6 bottom-6">
                               <Percent className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>
                    <div className="p-4 bg-neutral-50 rounded-lg shadow-[0px_10px_15px_#e4e4e4] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">Total Customers</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">120</h2>
                            </div>
                            <div>
                                <User className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
