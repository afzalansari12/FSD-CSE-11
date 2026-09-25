import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

const Profile = () => {
  const { showToast } = useShop();
  const [user, setUser] = useState({
    name: 'Aditya Yadav',
    email: 'aditya.cse11@college.edu',
    phone: '+91 98765 43210',
    rollNo: 'CSE-11-2024',
    department: 'Computer Science & Engineering',
    address: 'Campus Hostel Block B, Room 204, New Delhi',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = (e) => {
    e.preventDefault();
    setUser({ ...formData });
    setIsEditing(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header-banner">
          <div className="profile-avatar">👨‍💻</div>
          <div className="profile-user-info">
            <h2>{user.name}</h2>
            <span className="profile-tag">{user.department}</span>
          </div>
        </div>

        <div className="profile-content">
          {!isEditing ? (
            <div className="profile-info-grid">
              <div className="info-group">
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
              <div className="info-group">
                <label>Roll Number / Section</label>
                <p>{user.rollNo}</p>
              </div>
              <div className="info-group">
                <label>Phone Number</label>
                <p>{user.phone}</p>
              </div>
              <div className="info-group">
                <label>Shipping Address</label>
                <p>{user.address}</p>
              </div>

              <button
                className="btn-edit-profile"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Profile Details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save-profile">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-cancel-profile"
                  onClick={() => {
                    setFormData({ ...user });
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
