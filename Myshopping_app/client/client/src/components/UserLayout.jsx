import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { useShop } from '../context/ShopContext';

const UserLayout = () => {
  const { cartCount, orders, toast } = useShop();

  return (
    <div className="layout-container">
      <Header />

      <nav className="Navbar">
        <div className="nav-inner">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-nav' : '')}>
            🏠 Store
          </NavLink>
          <NavLink to="/myCart" className={({ isActive }) => (isActive ? 'active-nav' : '')}>
            🛒 My Cart {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </NavLink>
          <NavLink to="/myOrders" className={({ isActive }) => (isActive ? 'active-nav' : '')}>
            📦 My Orders {orders.length > 0 && <span className="nav-badge-alt">{orders.length}</span>}
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active-nav' : '')}>
            👤 Profile
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active-nav' : '')}>
            ⚙️ Settings
          </NavLink>
        </div>
      </nav>

      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      <main className="main-wrapper">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
