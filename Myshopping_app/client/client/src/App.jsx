import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './components/UserLayout';
import ItemStore from './components/ItemStore';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Settings from './components/Settings';
import { ShopProvider } from './context/ShopContext';
import './App.css';

const App = () => {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<ItemStore />} />
            <Route path="myCart" element={<Cart />} />
            <Route path="myOrders" element={<Orders />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
};

export default App;
