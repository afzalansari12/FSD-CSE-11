import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import './item.css';

const Item = ({ props, item }) => {
  const data = props || item || {};
  const { addToCart } = useShop();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addToCart(data);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const discountPercent = data.originalPrice
    ? Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100)
    : 20;

  return (
    <div className="item-card">
      <div className="item-card-top">
        <span className="category-tag">{data.category || 'Tech'}</span>
        {data.badge && <span className="item-badge">{data.badge}</span>}
      </div>

      <div className="item-icon-wrapper">
        <span className="item-emoji">{data.icon || '💻'}</span>
      </div>

      <div className="item-details">
        <h3 className="item-title">{data.title}</h3>
        {data.description && (
          <p className="item-description">{data.description}</p>
        )}

        <div className="item-rating">
          <span className="stars">⭐ {data.rating || 4.8}</span>
          <span className="reviews">({data.reviews || 500}+ students)</span>
        </div>

        <div className="item-pricing">
          <span className="current-price">₹{data.price}</span>
          {data.originalPrice && (
            <span className="original-price">₹{data.originalPrice}</span>
          )}
          <span className="discount-tag">{discountPercent}% OFF</span>
        </div>

        <button
          className={`btn-add-cart ${justAdded ? 'btn-added' : ''}`}
          onClick={handleAdd}
        >
          {justAdded ? '✓ In Cart!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default Item;
