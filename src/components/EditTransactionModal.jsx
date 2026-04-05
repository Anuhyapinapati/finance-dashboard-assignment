import { X } from 'lucide-react';

export function EditTransactionModal({ transaction, setTransaction, onSave, onCancel, isLoading }) {
  const handleSubmit = () => {
    if (
      !transaction.date ||
      !transaction.amount ||
      !transaction.category ||
      !transaction.description
    ) {
      alert('Please fill all fields');
      return;
    }
    onSave();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Edit Transaction</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="date"
            value={transaction.date}
            onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
          <input
            type="number"
            placeholder="Amount"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Category"
            value={transaction.category}
            onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
          <select
            value={transaction.type}
            onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="text"
            placeholder="Description"
            value={transaction.description}
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
