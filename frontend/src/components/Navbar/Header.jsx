import { Link } from "react-router-dom";
import { useState } from "react";
import TopSearchBtn from "../Button/TopSearchBtn.jsx";
import { ChevronDown } from "lucide-react";

function Header() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // const email = user?.email || "";
  const username = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-[#0b2d4d]">
            KhMentor
          </Link>
        </div>
        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            <Link to="/mentor/browse">
              Browse all mentors
            </Link>
          </button>

          {/* Auth Section */}
          {!token ? (
            <Link
              to="/auth/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full border px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="truncate font-medium text-gray-800">{username}</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                      Help Center
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                      Subscription & Billing
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                      Perks
                    </button>
                  </div>
                  <div className="border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;
