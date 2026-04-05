import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-6 rounded-xl border border-blue-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Total Balance</span>
          <Wallet className="w-5 h-5 text-blue-400" />
        </div>
        <p className="text-3xl font-bold text-blue-400">{formatCurrency(summary.balance)}</p>
        <p className="text-xs text-gray-400 mt-2">Current balance</p>
      </div>

      <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 p-6 rounded-xl border border-green-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Total Income</span>
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <p className="text-3xl font-bold text-green-400">{formatCurrency(summary.income)}</p>
        <p className="text-xs text-gray-400 mt-2">All time income</p>
      </div>

      <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 p-6 rounded-xl border border-pink-500/30 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Total Expenses</span>
          <TrendingDown className="w-5 h-5 text-pink-400" />
        </div>
        <p className="text-3xl font-bold text-pink-400">{formatCurrency(summary.expenses)}</p>
        <p className="text-xs text-gray-400 mt-2">All time expenses</p>
      </div>
    </div>
  );
}
