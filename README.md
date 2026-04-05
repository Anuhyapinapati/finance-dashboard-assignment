# 💰 Financial Dashboard (React)

## 📌 Overview

This project is a **Financial Dashboard Web Application** built using React. It allows users to visualize and manage transactions with features like summaries, charts, insights, and filtering.

The application focuses on **clean UI, responsive design, and efficient state management**, along with role-based access control (RBAC).

---

## 🚀 Features

### 📊 Dashboard Analytics

- Total Balance, Income, and Expenses
- Monthly trend visualization
- Category-wise spending breakdown
- Smart insights (highest spending, monthly change, average transaction)

---

### 🔐 Role-Based Access Control (RBAC)

- **Admin**
  - Can add new transactions
  - Full dashboard access

- **Viewer**
  - Read-only access

---

### 🔍 Advanced Filtering & Sorting

- Filter by:
  - Income / Expense / All

- Search by:
  - Category or description

- Sort by:
  - Date or Amount (Ascending/Descending)

---

### 💡 Insights Engine

- Highest spending category
- Monthly expense change (%)
- Average transaction value

---

### 🌙 Dark Mode UI

- Fully implemented dark theme
- Gradient cards and modern UI
- Improved readability and visual hierarchy

---

### 📱 Responsive Design

- Adapts to:
  - Mobile devices
  - Tablets
  - Desktop screens

---

### 🎬 Animations & Transitions

- Smooth hover effects
- Button transitions
- UI state changes (form toggle, filtering)

---

### 🔌 Mock API Integration

- Uses local **mock JSON data**
- Simulates API behavior
- Easily replaceable with real backend APIs

---

## 🛠️ Tech Stack

- React (Hooks)
- Vite
- Tailwind CSS
- JavaScript (ES6+)
- Lucide Icons

---

## 🧠 Approach

### 1. Component-Based Architecture

- Modular and reusable components:
  - Header
  - SummaryCards
  - Charts
  - Insights
  - Filters
  - Table

---

### 2. State Management

- Used `useState` for managing UI and data
- Used `useMemo` for:
  - Optimizing derived data
  - Preventing unnecessary recalculations

---

### 3. Data Processing Layer

All calculations handled in a utility file:

calculations.js

👉 Ensures **clean separation of logic and UI**

---

### 4. Performance Optimization

- Memoization (`useMemo`)
- Efficient filtering and sorting
- Avoid unnecessary re-renders

---

### 5. Scalability

- Easy to integrate backend APIs
- Extendable features (currency switch, authentication, etc.)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd project-folder
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run the Development Server

```bash
npm run dev
```

---

### 4️⃣ Open in Browser

```
http://localhost:5173
```

---

## 📂 Project Structure

```
## 📂 Project Structure

```

src/
│
├── api/
│ └── transactions.js  
├── components/
│ ├── Header.jsx
│ ├── SummaryCards.jsx
│ ├── Charts.jsx
│ ├── Insights.jsx
│ ├── TransactionTable.jsx
│ ├── TransactionFilters.jsx
│ ├── AddTransactionForm.jsx
│ └── EditTransactionModal.jsx  
│
├── data/
│ └── mockTransactions.js
│
├── utils/
│ └── calculations.js
│
├── App.jsx
└── main.jsx

```

---

## 📌 Explanation

* **api/transactions.js**
  Contains functions to simulate API calls like:

  * Fetch transactions
  * Add transaction
  * Edit transaction
  * Delete transaction

* **components/EditTransactionModal.jsx**
  A reusable modal component that allows users (Admin role) to:

  * Edit transaction details
  * Update values and save changes

---

```

---

## 🔮 Future Improvements

- Backend API integration
- Authentication system
- Export reports (PDF/CSV)
- Multi-currency support
- Real-time data updates

---

## 👩‍💻 Author

Developed as part of a frontend assignment focusing on dashboard design, performance, and usability.

---
