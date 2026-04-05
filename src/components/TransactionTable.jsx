import { CreditCard as Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

export function TransactionTable({ transactions, role, onEdit, onDelete, isDeleting }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
            <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
            <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
            {role === 'admin' && <th className="text-center py-3 px-4 text-gray-400 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={role === 'admin' ? 6 : 5} className="text-center py-8 text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-3 px-4 text-gray-300">{transaction.date}</td>
                <td className="py-3 px-4">{transaction.description}</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {transaction.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${
                      transaction.type === 'income'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-pink-500/20 text-pink-400'
                    } px-3 py-1 rounded-full text-sm capitalize`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td
                  className={`py-3 px-4 text-right font-semibold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-pink-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
                {role === 'admin' && (
                  <td className="py-3 px-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(transaction)}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 p-2 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this transaction?')) {
                            onDelete(transaction.id);
                          }
                        }}
                        disabled={isDeleting}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/40 p-2 rounded transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
