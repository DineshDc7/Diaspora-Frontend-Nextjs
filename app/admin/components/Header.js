import React from 'react';

const Header = () => {
    return (
        <>
            {/* Navbar */}
      <header className="shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 primaryColor text-white rounded-md flex items-center justify-center">
              <a href="/"><h1>DI</h1></a>
            </div>
            <div>
              <a href="/"><h4 className="font-semibold text-lg headingColor">Diaspora Insight</h4></a>
              <p className="text-sm subHeadingColor">Accountability for cross-border capital</p>
            </div>
          </div>

         <div>
            <div className="flex gap-2">
                <p className="px-3 py-1 font-semibold text-sm subHeadingColor rounded-full secondaryColor">
                  Role Selected - Admin
                </p>
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

export default Header;
