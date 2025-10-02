import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, Bell, Menu, X, Search } from "lucide-react";
import TopSearchBtn from "../Button/TopSearchBtn.jsx"; 

function Header() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "";
  const profile_photo = user?.profile_photo || "";
  const username = `${user?.first_name || ''} ${user?.last_name || ''}`.trim();
  const role = user?.role || "";
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications data
  const [notifications] = useState([
    {
      id: 1,
      title: "New mentorship request",
      message: "John Doe wants to connect with you",
      time: "5 min ago",
      read: false,
      type: "request"
    },
    {
      id: 2,
      title: "Session reminder",
      message: "Your session with Sarah starts in 30 minutes",
      time: "1 hour ago",
      read: false,
      type: "reminder"
    },
    {
      id: 3,
      title: "Profile completed",
      message: "Congratulations! Your profile is 100% complete",
      time: "2 days ago",
      read: true,
      type: "system"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    window.location.href = "/";
  }
   
  const getProfilePhotoUrl = () => {
    if (!profile_photo) return null;
    if (profile_photo.startsWith('http')) {
      return profile_photo;
    }
    return `http://localhost:2999/uploads/profiles/${profile_photo}`;
  };

  const profilePhotoUrl = getProfilePhotoUrl();

  // Condition to show Browse Mentors button - only for mentees or logged out users
  const showBrowseMentors = !token || role === "mentee";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link to="/" className="text-2xl font-bold text-[#0b2d4d] flex items-center">
              KhMentor
            </Link>
          </div>

          {/* Desktop Navigation - Only show if user has a role */}
          {role && (
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-center">
              <TopSearchBtn />
            </div>
          )}

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Responsive Browse Mentors Button - Desktop */}
            {/* Only show if user is not a mentor */}
            {showBrowseMentors && (
              <Link 
                to="/mentor/browse"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center space-x-2 min-w-0"
              >
                <Search size={18} />
                <span className="whitespace-nowrap">Browse Mentors</span>
              </Link>
            )}

            {/* Auth Section */}
            {!token ? (
              <Link
                to="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md whitespace-nowrap"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Bell size={20} className="text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <p className="text-sm text-gray-500">{unreadCount} unread</p>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !notification.read ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                              notification.type === 'request' ? 'bg-green-100 text-green-800' :
                              notification.type === 'reminder' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {notification.type}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="px-4 py-2 border-t border-gray-200">
                        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 rounded-full border px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors min-w-0 max-w-48"
                  >
                    {profilePhotoUrl ? (
                      <img 
                        src={profilePhotoUrl} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {username ? username.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className="hidden sm:flex flex-col items-start min-w-0 flex-1">
                      <span className="text-sm font-medium text-gray-700 truncate max-w-24">
                        {username || email.split('@')[0]}
                      </span>
                      <span className="text-xs text-gray-500 capitalize truncate max-w-24">
                        {user?.role || 'User'}
                      </span>
                    </div>
                    
                    <ChevronDown className="h-4 w-4 text-gray-600 flex-shrink-0" />
                  </button>

                  {/* Profile Dropdown */}
                  {open && (
                    <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="truncate font-medium text-gray-800">{email}</p>
                        <p className="text-sm text-gray-600 capitalize">{user?.role || 'User'}</p>
                      </div>
                      
                      <div className="border-b border-gray-200">
                        <Link 
                          to={role === 'mentor' ? "/mentor/profile" : "/mentee/profile"} 
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          My Profile
                        </Link>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                          Help Center
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
              </div>
            )}
          </div>

          {/* Mobile Auth Button */}
          {!token && (
            <div className="lg:hidden flex items-center space-x-2">
              <Link
                to="/auth/login"
                className="bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md text-sm whitespace-nowrap"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Browse Button - Visible on mobile */}
          {/* Only show if user is not a mentor */}
          {token && showBrowseMentors && (
            <div className="lg:hidden flex items-center">
              <Link
                to="/mentor/browse"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center justify-center"
                title="Browse Mentors"
              >
                <Search size={20} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-4">
            {/* Mobile Search - Only show if user has a role */}
            {role && <TopSearchBtn />}

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {/* Mobile Browse Mentors Button - Full width in menu */}
              {/* Only show if user is not a mentor */}
              {showBrowseMentors && (
                <Link
                  to="/mentor/browse"
                  className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Search size={20} />
                  <span>Browse All Mentors</span>
                </Link>
              )}

              {token && (
                <>
                  {/* Mobile Notifications */}
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Bell size={20} className="text-gray-600" />
                      <span>Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Mobile Profile Links */}
                  <Link
                    to={role === 'mentor' ? "/mentor/profile" : "/mentee/profile"}
                    className="block px-4 py-3 hover:bg-gray-50 rounded-lg border border-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button className="block w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg border border-gray-200">
                    Help Center
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdowns when clicking outside */}
      {(open || notificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setOpen(false);
            setNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
}

export default Header;