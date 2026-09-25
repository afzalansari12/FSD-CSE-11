import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

const initialProducts = [
  {
    id: 1,
    title: 'ReactJS Masterclass',
    category: 'Frontend',
    price: 1499,
    originalPrice: 2999,
    rating: 4.9,
    reviews: 1240,
    description: 'Master modern React 19, Hooks, Router, and Redux with hands-on projects.',
    icon: '⚛️',
    badge: 'Bestseller',
  },
  {
    id: 2,
    title: 'Node.js & Express Bootcamp',
    category: 'Backend',
    price: 1299,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 980,
    description: 'Build fast, scalable REST APIs, authentication, and microservices with Node.js.',
    icon: '🟩',
    badge: 'Popular',
  },
  {
    id: 3,
    title: 'Full Stack MERN Guide',
    category: 'Full Stack',
    price: 2499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 2150,
    description: 'End-to-end full stack development: MongoDB, Express, React, and Node.',
    icon: '🚀',
    badge: 'Featured',
  },
  {
    id: 4,
    title: 'MySQL & Database Design',
    category: 'Database',
    price: 999,
    originalPrice: 1999,
    rating: 4.7,
    reviews: 730,
    description: 'Comprehensive relational database design, indexing, queries, and optimization.',
    icon: '🐬',
    badge: 'Hot',
  },
  {
    id: 5,
    title: 'MongoDB & NoSQL Architecture',
    category: 'Database',
    price: 1199,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 860,
    description: 'Master MongoDB aggregations, schema design, clustering, and Atlas cloud.',
    icon: '🍃',
    badge: 'Trending',
  },
  {
    id: 6,
    title: 'Python & Data Structures',
    category: 'Backend',
    price: 1399,
    originalPrice: 2799,
    rating: 4.9,
    reviews: 1540,
    description: 'Master Python core concepts, algorithms, object-oriented design, and problem solving.',
    icon: '🐍',
    badge: 'Recommended',
  },
  {
    id: 7,
    title: 'Docker & Kubernetes DevOps',
    category: 'DevOps',
    price: 1799,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 640,
    description: 'Containerize applications and orchestrate deployments with Kubernetes CI/CD.',
    icon: '🐳',
    badge: 'Essential',
  },
  {
    id: 8,
    title: 'TypeScript for Professionals',
    category: 'Frontend',
    price: 1099,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 1120,
    description: 'Type-safe programming for React and Node with modern TypeScript patterns.',
    icon: '🔷',
    badge: 'Updated',
  }
];

export const ShopProvider = ({ children }) => {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shopping_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'ReactJS Masterclass',
        category: 'Frontend',
        price: 1499,
        quantity: 1,
        icon: '⚛️',
      }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shopping_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-98421',
        date: '2026-09-20',
        items: [
          { id: 2, title: 'Node.js & Express Bootcamp', price: 1299, quantity: 1, icon: '🟩' }
        ],
        total: 1299,
        status: 'Delivered',
      }
    ];
  });

  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopping_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        showToast(`Increased "${product.title}" quantity!`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showToast(`Added "${product.title}" to cart!`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.title}" from cart.`, 'info');
    }
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = () => {
    if (cart.length === 0) return false;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.round(subtotal * 0.1);
    const finalTotal = subtotal - discount;

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: finalTotal,
      status: 'Confirmed',
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    showToast('🎉 Order placed successfully!', 'success');
    return true;
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        orders,
        toast,
        cartCount,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
