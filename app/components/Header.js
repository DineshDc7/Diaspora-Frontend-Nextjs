import React from "react";

const Header = () => {
  return (
    <>
      {/* Navbar */}
      <header className="shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 primaryColor text-white rounded-md flex items-center justify-center">
              <a href="/">
                <h1>DI</h1>
              </a>
            </div>
            <div>
              <a href="/">
                <h4 className="font-semibold text-lg headingColor">
                  Diaspora Insight
                </h4>
              </a>
              <p className="text-sm subHeadingColor">
                Accountability for cross-border capital
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            <ul className="flex gap-6 items-center">
              <li>
                <a href="#" className="subHeadingColor hover:text-black">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="subHeadingColor hover:text-black">
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="px-2 py-1.5 text-blue-600 hover:text-blue-300"
                >
                  Sign up
                </a>/  
                <a
                  href="/login"
                  className="px-2 py-1.5 text-blue-600 hover:text-blue-300"
                >
                   Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
