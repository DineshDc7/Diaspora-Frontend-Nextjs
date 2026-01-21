import React from 'react';

const RoleHeader = () => {
    return (
        <>
            {/* Navbar */}
      <header className="shadow-sm">
        <div className="container mx-auto px-6 py-4 md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <a href="/"><img src="../DI.png"/> </a>
            </div>
            <div>
              <a href="/"><h4 className="font-semibold text-lg headingColor">Diaspora Insight</h4></a>
              <p className="text-sm subHeadingColor">Accountability for cross-border capital</p>
            </div>
          </div>

         <div className='md:mt-auto mt-5'>
            <div className="md:flex gap-2">
                {/* <p className="px-3 md:my-auto w-fit my-2 py-1 font-semibold text-sm subHeadingColor rounded-full secondaryColor">
                  Role Selected - Admin
                </p> */}
                <p className="px-3 py-1 font-semibold text-sm textColor rounded-full">
                  Already have an account? <a href="/login" className="text-blue-700">Login</a>
                </p>
              </div>
         </div>
        </div>
      </header>
        </>
    );
}

export default RoleHeader;
