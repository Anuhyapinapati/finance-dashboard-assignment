export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

export const calculateSummary = (transactions) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);
  return {
    balance: income - expenses,
    income,
    expenses,
  };
};

export const calculateMonthlyData = (transactions) => {
  const monthly = {};
  transactions.forEach((t) => {
    const month = t.date.substring(0, 7);
    if (!monthly[month]) {
      monthly[month] = { income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      monthly[month].income += Number(t.amount);
    } else {
      monthly[month].expenses += Number(t.amount);
    }
  });

  return Object.keys(monthly)
    .sort()
    .map((month) => ({
      month,
      balance: monthly[month].income - monthly[month].expenses,
      income: monthly[month].income,
      expenses: monthly[month].expenses,
    }));
};

export const calculateCategoryData = (transactions) => {
  const categories = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
    });
  return Object.keys(categories)
    .map((cat) => ({
      name: cat,
      value: categories[cat],
    }))
    .sort((a, b) => b.value - a.value);
};

export const calculateInsights = (transactions, categoryData, monthlyData, summary) => {
  const highestSpending = categoryData[0];
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const monthlyChange = previousMonth
    ? ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1)
    : 0;

  const expenseCount = transactions.filter((t) => t.type === 'expense').length;
  const avgTransaction = (summary.expenses / expenseCount).toFixed(0);

  return {
    highestCategory: highestSpending,
    monthlyChange: Number(monthlyChange),
    avgTransaction,
  };
};

export const filterTransactions = (transactions, filterType, searchTerm, sortBy, sortOrder) => {
  let filtered = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  filtered.sort((a, b) => {
    const aVal = sortBy === 'date' ? new Date(a.date).getTime() : a.amount;
    const bVal = sortBy === 'date' ? new Date(b.date).getTime() : b.amount;
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return filtered;
};
