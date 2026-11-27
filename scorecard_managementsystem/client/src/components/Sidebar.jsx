import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { isAdmin, isStudent } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-icon">📊</span>
        <div>
          <h2>ScoreCard</h2>
          <span className="sidebar-college">ABESEC Ghaziabad</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <span className="nav-icon">🏠</span> Dashboard
        </NavLink>
        {isAdmin && (
          <>
            <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">👨‍🎓</span> Students
            </NavLink>
            <NavLink to="/scorecards" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">📝</span> Scorecards
            </NavLink>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon">📈</span> Reports
            </NavLink>
          </>
        )}
        {isStudent && (
          <NavLink to="/" end className={() => 'nav-link'}>
            <span className="nav-icon">📋</span> My Scores
          </NavLink>
        )}
      </nav>
      <div className="sidebar-footer">
        <p>FSD CSE-11</p>
      </div>
    </aside>
  )
}

export default Sidebar
