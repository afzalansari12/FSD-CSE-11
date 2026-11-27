import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const titles = {
  '/': 'Dashboard',
  '/students': 'Students',
  '/students/add': 'Add Student',
  '/scorecards': 'Scorecards',
  '/scorecards/add': 'Add Score',
  '/reports': 'Reports',
}

function Navbar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const getTitle = () => {
    if (titles[pathname]) return titles[pathname]
    if (pathname.includes('/students/') && pathname.includes('/edit')) return 'Edit Student'
    if (pathname.includes('/students/')) return 'Student Detail'
    return 'Scorecard Management'
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{getTitle()}</h1>
        <span className="topbar-college">ABESEC Ghaziabad</span>
      </div>
      <div className="topbar-right">
        <span className="topbar-date">
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <div className="topbar-user">
          <span className="topbar-name">{user?.name}</span>
          <span className={`badge ${user?.role === 'admin' ? 'badge-admin' : 'badge-student'}`}>{user?.role}</span>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
        <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
      </div>
    </header>
  )
}

export default Navbar
