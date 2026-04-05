import { useState, useMemo, useEffect } from 'react';
import { MOCK_TRANSACTIONS } from './data/mockTransactions';
import {
  calculateSummary,
  calculateMonthlyData,
  calculateCategoryData,
  calculateInsights,
  filterTransactions,
} from './utils/calculations';
import { addTransaction, updateTransaction, deleteTransaction, fetchTransactions } from './api/transactions';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { ChartsGrid } from './components/Charts';
import { Insights } from './components/Insights';
import { TransactionFilters } from './components/TransactionFilters';
import { AddTransactionForm } from './components/AddTransactionForm';
import { TransactionTable } from './components/TransactionTable';
import { EditTransactionModal } from './components/EditTransactionModal';

function App() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [role, setRole] = useState('viewer');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'expense',
    description: '',
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      if (data && data.length > 0) {
        setTransactions(data);
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filterType, searchTerm, sortBy, sortOrder),
    [transactions, filterType, searchTerm, sortBy, sortOrder]
  );

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const monthlyData = useMemo(() => calculateMonthlyData(transactions), [transactions]);

  const categoryData = useMemo(() => calculateCategoryData(transactions), [transactions]);

  const insights = useMemo(
    () => calculateInsights(transactions, categoryData, monthlyData, summary),
    [transactions, categoryData, monthlyData, summary]
  );

  const handleAddTransaction = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const transaction = {
        date: newTransaction.date,
        amount: Number(newTransaction.amount),
        category: newTransaction.category,
        type: newTransaction.type,
        description: newTransaction.description,
      };

      const result = await addTransaction(transaction);
      setTransactions([result, ...transactions]);
      setNewTransaction({
        date: '',
        amount: '',
        category: '',
        type: 'expense',
        description: '',
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add transaction:', error);
      alert('Failed to add transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setEditFormData({ ...transaction });
  };

  const handleSaveEdit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const updates = {
        date: editFormData.date,
        amount: Number(editFormData.amount),
        category: editFormData.category,
        type: editFormData.type,
        description: editFormData.description,
      };

      await updateTransaction(editingTransaction.id, updates);
      setTransactions(
        transactions.map((t) => (t.id === editingTransaction.id ? { ...t, ...updates } : t))
      );
      setEditingTransaction(null);
      setEditFormData({});
    } catch (error) {
      console.error('Failed to update transaction:', error);
      alert('Failed to update transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      alert('Failed to delete transaction');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header role={role} setRole={setRole} />
        <SummaryCards summary={summary} />

        <ChartsGrid monthlyData={monthlyData} categoryData={categoryData} />

        <Insights insights={insights} />

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold">Transactions</h2>
            {role === 'admin' && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
                disabled={isLoading}
              >
                {showAddForm ? 'Cancel' : '+ Add Transaction'}
              </button>
            )}
          </div>

          {showAddForm && role === 'admin' && (
            <AddTransactionForm
              newTransaction={newTransaction}
              setNewTransaction={setNewTransaction}
              onAdd={handleAddTransaction}
              onCancel={() => setShowAddForm(false)}
              isLoading={isLoading}
            />
          )}

          <TransactionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <TransactionTable
            transactions={filteredTransactions}
            role={role}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            isDeleting={isDeleting}
          />
        </div>
      </div>

      {editingTransaction && (
        <EditTransactionModal
          transaction={editFormData}
          setTransaction={setEditFormData}
          onSave={handleSaveEdit}
          onCancel={() => {
            setEditingTransaction(null);
            setEditFormData({});
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
