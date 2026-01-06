"use client";

import BusinessLayout from "../components/BusinessLayout";

export default function BusinessInfo() {
    return (
        <BusinessLayout>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">

                <div className="xl:col-span-4 space-y-6">
                    <div className="shadow-lg rounded-lg bg-white p-4 pb-10">
                        <h1 className="headingColor text-lg font-semibold mb-10">Adams Baker <span className="text-base text-gray-500">(Owner)</span></h1>

                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="p-4 border border-neutral-100 rounded-md">

                            </div>
                        </div>

                    </div>



                </div>

            </div>
        </BusinessLayout>
    );
}
