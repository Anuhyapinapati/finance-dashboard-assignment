import { User } from 'lucide-react';

export function Header({ role, setRole }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Finance Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Track and manage your financial activity</p>
      </div>

      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
        <User className="w-5 h-5 text-blue-400" />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-transparent text-white border-none outline-none cursor-pointer font-medium"
        >
          <option value="viewer" className="bg-gray-900">
            Viewer
          </option>
          <option value="admin" className="bg-gray-900">
            Admin
          </option>
        </select>
      </div>
    </div>
  );
}
