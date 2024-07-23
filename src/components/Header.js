import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const history = window.history;
//   const history = useHistory();

  const handleLogout = async() => {
    await logout();
    // history.pushState('/login');
    navigate('/login')
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/customers">Customers</Link>
              </li>
              <li className="nav-item">
                <Link to="/employees">Employees</Link>
              </li>
              <li className="nav-item">
                <Link to="/tables">Tables</Link>
              </li>
              <li className="nav-item">
                <Link to="/reservations">Reservations</Link>
              </li>
              <li className="nav-item">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link to="/suppliers">Suppliers</Link>
              </li>
              <li className="nav-item">
                <Link to="/inventory">Inventory</Link>
              </li>
              <li className="nav-item">
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
