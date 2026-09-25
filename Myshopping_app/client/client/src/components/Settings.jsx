import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

const Settings = () => {
  const { showToast } = useShop();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [currency, setCurrency] = useState('INR');
  const [portSetting] = useState('4848 (Active Host)');

  const handleSave = () => {
    showToast('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>App & Account Settings</h2>
        <p className="settings-subtitle">Manage preferences and server configuration.</p>

        <div className="settings-section">
          <h3>Server & Host Status</h3>
          <div className="settings-row">
            <div>
              <strong>Vite Dev Server Port</strong>
              <p>Port configured via vite.config.js</p>
            </div>
            <span className="badge-highlight">{portSetting}</span>
          </div>
          <div className="settings-row">
            <div>
              <strong>Host Mode</strong>
              <p>Network listening: <code>host: true</code> (0.0.0.0)</p>
            </div>
            <span className="badge-success">Enabled</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          <div className="settings-row">
            <div>
              <strong>Order & Delivery Notifications</strong>
              <p>Receive live status updates on new course materials</p>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="toggle-checkbox"
            />
          </div>

          <div className="settings-row">
            <div>
              <strong>Email Newsletter & Discounts</strong>
              <p>Get notified about flash discounts on tech courses</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="toggle-checkbox"
            />
          </div>

          <div className="settings-row">
            <div>
              <strong>Display Currency</strong>
              <p>Select preferred currency for prices</p>
            </div>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
            >
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
            </select>
          </div>
        </div>

        <button className="btn-save-settings" onClick={handleSave}>
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Settings;
