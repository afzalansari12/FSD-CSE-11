import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-credit">
          Design & Developed with ❤️ by <strong>Aditya Yadav</strong> | CSE-11
        </p>
        <p className="footer-meta">
          Myshopping App • Running on Vite (Port 4848, Host: true) • © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
