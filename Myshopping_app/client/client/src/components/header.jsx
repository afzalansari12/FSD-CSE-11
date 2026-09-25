import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Header = () => {
  const { cartCount, searchQuery, setSearchQuery } = useShop();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="brand-logo">
          <span className="brand-icon">🛒</span>
          <div className="brand-text">
            <h1>Myshopping App</h1>
            <span className="brand-tagline">CSE-11 Learning & Tech Store</span>
          </div>
        </Link>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search courses, frameworks, technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        <div className="header-actions">
          <span className="header-pill">⚡ Port: 4848 (Host Active)</span>
          <Link to="/myCart" className="header-cart-btn">
            <span>🛒 Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
