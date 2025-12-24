"use client";

export default function KPIGrid() {
  return (
    <>
      <div className="shadow-lg rounded-lg bg-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="headingColor text-lg font-semibold">Portfolio KPIs</h2>
            <p className="textColor">Snapshot across all Nigerian businesses you back</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="px-3 py-1 text-sm font-semibold subHeadingColor rounded-full secondaryColor">
              Last 30 days
            </p>
            <p className="px-3 py-1 text-sm subHeadingColor rounded-full secondaryColor">
              Country : All
            </p>
            <p className="px-3 py-1 text-sm subHeadingColor rounded-full secondaryColor">
              Sector : All
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
