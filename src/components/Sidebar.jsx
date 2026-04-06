import { LayoutDashboard, TrendingUp, BarChart3, LogOut } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, role, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-gradient-to-b from-gray-900/95 to-black/95 border-r border-gray-700/50 backdrop-blur-sm flex flex-col">

      {/* 🔥 Logo */}
      <div className="p-4 md:p-6 border-b border-gray-700/50 flex items-center justify-center md:justify-start">
        <h2 className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Finance
        </h2>
      </div>

      {/* 🔥 Navigation */}
      <nav className="flex-1 px-2 md:px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-lg transition-all duration-200
              outline-none focus:outline-none focus:ring-0 active:outline-none border-0 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />

              {/* Hide text on small screens */}
              <span className="hidden md:block font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 🔥 Bottom Section */}
      <div className="border-t border-gray-700/50 p-4 space-y-3">

        {/* Role */}
        <div className="hidden md:block text-center text-sm text-gray-300">
          {role === 'admin' ? '👤 Admin' : '👁️ Viewer'}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all duration-200 font-medium
          outline-none focus:outline-none focus:ring-0 active:outline-none"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
}