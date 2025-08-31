import { Link } from "react-router-dom";
import TopSearchBtn from "../Button/TopSearchBtn.jsx";
import LoginBtn from "../Button/LoginBtn.jsx";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* <img src="/logo.svg" alt="Logo" className="h-8 w-8" /> */}
          <Link to="/" className="text-2xl font-bold text-[#0b2d4d]">
            KhMentor
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <TopSearchBtn />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* <Link
            to="/business"
            className="text-gray-700 hover:text-gray-900 text-[15px]"
          >
            For Businesses
          </Link> */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
            Browse all mentors
          </button>
          <LoginBtn />
        </div>
      </div>
      <hr />
    </header>
  );
}

export default Header;
