export function AddTransactionForm({ newTransaction, setNewTransaction, onAdd, onCancel, isLoading }) {
  const handleSubmit = () => {
    if (
      !newTransaction.date ||
      !newTransaction.amount ||
      !newTransaction.category ||
      !newTransaction.description
    ) {
      alert('Please fill all fields');
      return;
    }
    onAdd();
  };

  return (
    <div className="bg-black/40 p-6 rounded-lg border border-gray-700/50 mb-6">
      <h3 className="text-lg font-semibold mb-4">New Transaction</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Category"
          value={newTransaction.category}
          onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        />
        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white md:col-span-2"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Transaction'}
        </button>
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="bg-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
