import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomersPage from './pages/Customers';
import EmployeesPage from './pages/Employees';
import TablesPage from './pages/Tables';
import ReservationsPage from './pages/Reservations';
import OrdersPage from './pages/Orders';
import MenuPage from './pages/Menu';
import SuppliersPage from './pages/Suppliers';
import InventoryPage from './pages/Inventory';
import './App.css'
import Header from './components/Header';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/customers" element={<CustomersPage/>} />
        <Route path="/employees" element={<EmployeesPage/>} />
        <Route path="/tables" element={<TablesPage/>} />
        <Route path="/reservations" element={<ReservationsPage/>} />
        <Route path="/orders" element={<OrdersPage/>} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/suppliers" element={<SuppliersPage/>} />
        <Route path="/inventory" element={<InventoryPage/>} />
        <Route path="/" element={<h1>Welcome to the Restaurant Management System</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
