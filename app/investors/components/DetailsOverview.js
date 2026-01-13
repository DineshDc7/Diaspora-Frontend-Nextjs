"use client";
import { ScrollText, UserRoundPlus, BriefcaseBusiness, Percent } from "lucide-react";
export default function DetailsOverview() {
    return (
        <>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-5">
                    <div className="p-4 bg-[#f5faff] rounded-lg shadow-[0px_10px_15px_#e4e4e4c2] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">Following</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">4</h2>
                            </div>
                            <div className="absolute right-6 bottom-6">
                                <UserRoundPlus className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>
                    <div className="p-4 bg-[#f5faff] rounded-lg shadow-[0px_10px_15px_#e4e4e4c2] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">Total Reports</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">5</h2>
                            </div>
                            <div className="absolute right-6 bottom-6">
                                <ScrollText className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>
                    <div className="p-4 bg-[#f5faff] rounded-lg shadow-[0px_10px_15px_#e4e4e4c2] relative">
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
                    <div className="p-4 bg-[#f5faff] rounded-lg shadow-[0px_10px_15px_#e4e4e4c2] relative">
                        <div className="flex justify-between items-center gap-2">
                            <div>
                                <h5 className="subHeadingColor text-base">All Businesses</h5>
                                <h2 className="headingColor text-3xl font-semibold py-3">5</h2>
                            </div>
                            <div>
                                <BriefcaseBusiness className="w-15 h-15" color="#cfdced" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}
