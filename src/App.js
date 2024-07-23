import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import CustomersPage from './pages/Customers';
import TablesPage from './pages/Tables';
import EmployeesPage from './pages/Employees';
import ReservationsPage from './pages/Reservations';
import OrdersPage from './pages/Orders';
import MenuPage from './pages/Menu';
import SuppliersPage from './pages/Suppliers';
import InventoryPage from './pages/Inventory';
import Header from './components/Header';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customers" element={<ProtectedRoute component={CustomersPage} />} />
        <Route path="/employees" element={<ProtectedRoute component={EmployeesPage} />} />
        <Route path="/tables" element={<ProtectedRoute component={TablesPage} />} />
        <Route path="/reservations" element={<ProtectedRoute component={ReservationsPage} />} />
        <Route path="/orders" element={<ProtectedRoute component={OrdersPage} />} />
        <Route path="/menu" element={<ProtectedRoute component={MenuPage} />} />
        <Route path="/suppliers" element={<ProtectedRoute component={SuppliersPage} />} />
        <Route path="/inventory" element={<ProtectedRoute component={InventoryPage} />} />
        <Route path="/" element={<ProtectedRoute component={Home}/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
