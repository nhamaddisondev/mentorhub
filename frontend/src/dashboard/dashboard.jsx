import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Activity,
  UserCheck
} from 'lucide-react';

export default function KhMentorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: 'Total Mentors',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: UserCheck,
      color: 'blue'
    },
    {
      title: 'Active Students',
      value: '4,892',
      change: '+18.3%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Sessions Completed',
      value: '2,834',
      change: '+7.2%',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      title: 'Revenue',
      value: '$42,156',
      change: '+15.8%',
      trend: 'up',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { 
      id: 1, 
      user: 'Sophea Chan', 
      action: 'Completed Python mentoring session', 
      time: '5 minutes ago', 
      avatar: 'SC',
      type: 'session'
    },
    { 
      id: 2, 
      user: 'David Kim', 
      action: 'New mentor registration approved', 
      time: '12 minutes ago', 
      avatar: 'DK',
      type: 'mentor'
    },
    { 
      id: 3, 
      user: 'Maya Patel', 
      action: 'Started Web Development course', 
      time: '25 minutes ago', 
      avatar: 'MP',
      type: 'student'
    },
    { 
      id: 4, 
      user: 'John Veasna', 
      action: 'Published new learning resource', 
      time: '1 hour ago', 
      avatar: 'JV',
      type: 'content'
    },
  ];

  const topMentors = [
    { name: 'Chhay Lim', specialty: 'Web Development', rating: 4.9, sessions: 156 },
    { name: 'Sreypov Nuth', specialty: 'Data Science', rating: 4.8, sessions: 142 },
    { name: 'Rathana Kong', specialty: 'Mobile Development', rating: 4.8, sessions: 138 },
    { name: 'Pisach Ouk', specialty: 'UI/UX Design', rating: 4.7, sessions: 124 },
  ];

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Mentors', active: false },
    { icon: UserCheck, label: 'Students', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-3"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">KhMentor</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="mt-6 px-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Dashboard Content */}
          <main className="p-6">
            {/* Dashboard Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                  <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your mentorship platform.</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    U
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-3">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                        <span className="text-sm text-gray-500 ml-2">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Learning Progress Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Learning Progress Overview</h3>
                <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Learning Analytics</p>
                    <p className="text-sm text-gray-400 mt-2">Student progress and completion rates</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  View all activity
                </button>
              </div>
            </div>

            {/* Additional Content Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Mentors</h3>
                <div className="space-y-4">
                  {topMentors.map((mentor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{mentor.name}</p>
                          <p className="text-xs text-gray-500">{mentor.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-yellow-600">⭐ {mentor.rating}</p>
                        <p className="text-xs text-gray-400">{mentor.sessions} sessions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl text-blue-700 font-semibold text-sm transition-all duration-200 border border-blue-200">
                    Add New Mentor
                  </button>
                  <button className="p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl text-green-700 font-semibold text-sm transition-all duration-200 border border-green-200">
                    Create Course
                  </button>
                  <button className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl text-purple-700 font-semibold text-sm transition-all duration-200 border border-purple-200">
                    Send Announcement
                  </button>
                  <button className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl text-orange-700 font-semibold text-sm transition-all duration-200 border border-orange-200">
                    Export Reports
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}