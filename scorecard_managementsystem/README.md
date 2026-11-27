# 📊 Scorecard Management System

**MERN Stack Application** — Full Stack Development (FSD) Project  
**ABESEC Ghaziabad** · CSE Section 11

---

## 🌐 Live Deployment

**Render URL:** *(will be updated after deployment)*

---

## 🔐 Login Credentials

| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin` | `admin123` |
| **Student** | `aarav` | `aarav123` |
| **Student** | `priya` | `priya123` |
| **Student** | `rahul` | `rahul123` |
| **Student** | `sneha` | `sneha123` |
| **Student** | `ali` | `ali123` |

### Role Permissions

| Feature | Admin | Student |
|---------|-------|---------|
| Dashboard (overview) | ✅ | ✅ (own scores only) |
| Manage Students (CRUD) | ✅ | ❌ |
| Manage Scorecards | ✅ | ❌ |
| View Reports & Analytics | ✅ | ❌ |
| View Own Scores | — | ✅ |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React Router 7
- **Backend:** Node.js, Express.js
- **Styling:** Custom CSS (responsive, mobile-friendly)
- **State Management:** React Context API + localStorage
- **Deployment:** Render

---

## 📁 Project Structure

```
scorecard_managementsystem/
├── server.js                  # Express backend + API routes
├── package.json               # Server dependencies
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Navbar, Sidebar, Footer, StatCard, ScoreBar
│   │   ├── context/           # AuthContext, ScoreContext
│   │   ├── pages/             # Dashboard, Students, Scorecards, Reports, Login
│   │   └── index.css          # Global styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone <repo-url>
cd scorecard_managementsystem

# Install server deps
npm install

# Install client deps & build
cd client && npm install && npm run build && cd ..

# Start the server
npm start
# → Open http://localhost:5000
```

---

## 👥 Team

**Developed & Maintained By:**
- **Afzal Ansari**
- **Alok Madhesiya**

**Branch:** CSE — Section 11  
**Course:** Full Stack Development  

©️ 2026 ABESEC Ghaziabad. All Rights Reserved.
