import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export function Insights({ insights }) {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 p-6 rounded-xl border border-blue-500/20 backdrop-blur-sm mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-green-400" />
        Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
          <p className="text-gray-400 text-sm mb-1">Highest Spending Category</p>
          <p className="text-2xl font-bold text-orange-400">{insights.highestCategory?.name}</p>
          <p className="text-gray-400 text-sm mt-1">{formatCurrency(insights.highestCategory?.value)}</p>
        </div>
        <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
          <p className="text-gray-400 text-sm mb-1">Monthly Change</p>
          <p
            className={`text-2xl font-bold ${insights.monthlyChange > 0 ? 'text-red-400' : 'text-green-400'}`}
          >
            {insights.monthlyChange > 0 ? '+' : ''}{insights.monthlyChange}%
          </p>
          <p className="text-gray-400 text-sm mt-1">vs last month</p>
        </div>
        <div className="bg-black/30 p-4 rounded-lg border border-gray-700/50">
          <p className="text-gray-400 text-sm mb-1">Avg Transaction</p>
          <p className="text-2xl font-bold text-blue-400">{formatCurrency(insights.avgTransaction)}</p>
          <p className="text-gray-400 text-sm mt-1">per expense</p>
        </div>
      </div>
    </div>
  );
}
