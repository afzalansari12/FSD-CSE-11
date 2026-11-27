import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StudentDashboard from './pages/StudentDashboard'
import Students from './pages/Students'
import AddStudent from './pages/AddStudent'
import EditStudent from './pages/EditStudent'
import Scorecards from './pages/Scorecards'
import AddScore from './pages/AddScore'
import Reports from './pages/Reports'
import StudentDetail from './pages/StudentDetail'

function ProtectedRoute({ children, adminOnly = false }) {
  const { isLoggedIn, isAdmin } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}

function App() {
  const { isLoggedIn, isAdmin, isStudent } = useAuth()

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={isStudent ? <StudentDashboard /> : <Dashboard />} />
            <Route path="/students" element={<ProtectedRoute adminOnly><Students /></ProtectedRoute>} />
            <Route path="/students/add" element={<ProtectedRoute adminOnly><AddStudent /></ProtectedRoute>} />
            <Route path="/students/:id" element={<ProtectedRoute adminOnly><StudentDetail /></ProtectedRoute>} />
            <Route path="/students/:id/edit" element={<ProtectedRoute adminOnly><EditStudent /></ProtectedRoute>} />
            <Route path="/scorecards" element={<ProtectedRoute adminOnly><Scorecards /></ProtectedRoute>} />
            <Route path="/scorecards/add" element={<ProtectedRoute adminOnly><AddScore /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute adminOnly><Reports /></ProtectedRoute>} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
