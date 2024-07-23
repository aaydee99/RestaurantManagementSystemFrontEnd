import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
