import React from 'react';

const Header = () => {
    return (
        <>
            {/* Navbar */}
      <header className="">
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

          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="subHeadingColor hover:text-black">
              Docs
            </a>
            <a href="#" className="subHeadingColor hover:text-black">
              Support
            </a>
            <a href="/login" className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
              Log in
            </a>
          </nav>
        </div>
      </header>
        </>
    );
}

export default Header;
