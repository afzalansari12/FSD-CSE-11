import React from 'react';
import Item from './item';
import { useShop } from '../context/ShopContext';

const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Database', 'DevOps'];

const ItemStore = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory } = useShop();

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="store-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <span className="hero-badge">Special Student Offer 🚀</span>
          <h2>Build & Upgrade Your Tech Stack Today</h2>
          <p>
            Get instant access to top-rated full stack engineering courses, databases, and DevOps modules.
          </p>
        </div>
        <div className="hero-highlights">
          <div className="highlight-pill">✓ Lifetime Access</div>
          <div className="highlight-pill">✓ 24/7 Mentor Support</div>
          <div className="highlight-pill">✓ Verified Certificates</div>
        </div>
      </div>

      {/* Category Pills & Search Info */}
      <div className="store-toolbar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="store-stats">
          <span>
            Showing <strong>{filteredProducts.length}</strong> items
            {searchQuery && ` for "${searchQuery}"`}
          </span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((item) => (
            <Item key={item.id} props={item} />
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <div className="empty-icon">🔍</div>
          <h3>No products match your search</h3>
          <p>Try clearing filters or search for something else like "React" or "MongoDB".</p>
          <button
            className="btn-reset-filters"
            onClick={() => {
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemStore;
