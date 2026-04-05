const STORAGE_KEY = 'finance_transactions';

export async function fetchTransactions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export async function addTransaction(transaction) {
  try {
    const transactions = await fetchTransactions();
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    transactions.unshift(newTransaction);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return newTransaction;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
}

export async function updateTransaction(id, updates) {
  try {
    const transactions = await fetchTransactions();
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Transaction not found');

    transactions[index] = { ...transactions[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return transactions[index];
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(id) {
  try {
    const transactions = await fetchTransactions();
    const filtered = transactions.filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}
