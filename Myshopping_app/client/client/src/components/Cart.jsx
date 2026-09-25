import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, placeOrder } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal - discount;

  const handleCheckout = () => {
    const success = placeOrder();
    if (success) {
      navigate('/myOrders');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-card">
          <span className="empty-cart-emoji">🛒</span>
          <h2>Your Cart is Empty</h2>
          <p>Explore our courses and tech stacks to start learning today!</p>
          <Link to="/" className="btn-continue-shopping">
            Browse Courses & Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header-row">
        <h2>My Shopping Cart ({cart.length} item{cart.length > 1 ? 's' : ''})</h2>
        <button className="btn-clear-cart" onClick={clearCart}>
          Clear All
        </button>
      </div>

      <div className="cart-content-layout">
        {/* Cart Items List */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div className="cart-item-icon">
                <span>{item.icon || '💻'}</span>
              </div>

              <div className="cart-item-info">
                <h4>{item.title}</h4>
                <span className="cart-item-cat">{item.category}</span>
                <span className="cart-item-price">₹{item.price} each</span>
              </div>

              <div className="cart-item-qty">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, -1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                <span>₹{item.price * item.quantity}</span>
              </div>

              <button
                className="btn-remove-item"
                onClick={() => removeFromCart(item.id)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary-card">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row summary-discount">
            <span>10% Instant Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="summary-row">
            <span>Platform & Delivery Fee</span>
            <span className="fee-free">FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row summary-total">
            <span>Total Payable</span>
            <span>₹{total}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout 🚀
          </button>

          <p className="summary-guarantee">
            🔒 Safe & Secure Checkout • Instant Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
