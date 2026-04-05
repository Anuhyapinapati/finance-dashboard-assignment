import {
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, PieChart } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1'];

export function ChartsGrid({ monthlyData, categoryData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <BalanceTrendChart monthlyData={monthlyData} />
      <SpendingBreakdownChart categoryData={categoryData} />
    </div>
  );
}

function BalanceTrendChart({ monthlyData }) {
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm">
      
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold">Balance Trend</h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />

          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(value) => `₹${value.toLocaleString()}`}
          />

          <Legend />

          {/* ✅ Added Income */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981' }}
          />

          {/* ✅ Added Expenses */}
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444' }}
          />

          {/* ✅ Existing Balance */}
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: '#8b5cf6' }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* 🔴 Pie chart NOT changed */
function SpendingBreakdownChart({ categoryData }) {
  const totalSpending = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 p-6 rounded-xl border border-pink-500/20 backdrop-blur-sm">
      
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-pink-400" />
        <h2 className="text-xl font-semibold">Spending Breakdown</h2>
      </div>

      <div className="flex gap-8 items-center">
        
        <div className="flex-shrink-0">
          <ResponsiveContainer width={200} height={200}>
            <RePieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-4">
          
          <div className="text-sm font-semibold text-gray-300 mb-4">
            Total: ₹{totalSpending.toLocaleString()}
          </div>

          {categoryData.map((item, index) => {
            const percentage = ((item.value / totalSpending) * 100).toFixed(1);

            return (
              <div key={item.name} className="flex items-center justify-between">
                
                <div className="flex items-center gap-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-300">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-sm font-semibold text-gray-100 min-w-[80px] text-right">
                    ₹{item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 w-[50px] text-right">
                    {percentage}%
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}