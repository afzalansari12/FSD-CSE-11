import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Orders = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="orders-empty-container">
        <div className="orders-empty-card">
          <span className="empty-orders-emoji">📦</span>
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet. Check out our store courses!</p>
          <Link to="/" className="btn-continue-shopping">
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>My Orders ({orders.length})</h2>
        <p>Track your past purchases, download invoices and access your courses.</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-header-meta">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">Placed on {order.date}</span>
              </div>
              <span className={`order-status-badge status-${order.status.toLowerCase()}`}>
                ● {order.status}
              </span>
            </div>

            <div className="order-items-grid">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-snippet">
                  <span className="order-item-icon">{item.icon || '💻'}</span>
                  <div className="order-item-snippet-details">
                    <span className="order-item-title">{item.title}</span>
                    <span className="order-item-qty-price">
                      Qty: {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <div className="order-total-block">
                <span>Total Amount:</span>
                <strong>₹{order.total}</strong>
              </div>
              <div className="order-action-buttons">
                <button
                  className="btn-order-action"
                  onClick={() => alert(`Viewing materials for order ${order.id}`)}
                >
                  Access Course Content
                </button>
                <button
                  className="btn-order-action-secondary"
                  onClick={() => alert(`Invoice downloaded for order ${order.id}`)}
                >
                  Download Invoice 📄
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
