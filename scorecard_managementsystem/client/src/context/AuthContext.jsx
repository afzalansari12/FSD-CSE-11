import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const USERS = [
  { id: 'admin1', username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 'stu1', username: 'aarav', password: 'aarav123', name: 'Aarav Sharma', role: 'student', studentId: '1' },
  { id: 'stu2', username: 'priya', password: 'priya123', name: 'Priya Patel', role: 'student', studentId: '2' },
  { id: 'stu3', username: 'rahul', password: 'rahul123', name: 'Rahul Kumar', role: 'student', studentId: '3' },
  { id: 'stu4', username: 'sneha', password: 'sneha123', name: 'Sneha Reddy', role: 'student', studentId: '4' },
  { id: 'stu5', username: 'ali', password: 'ali123', name: 'Mohammed Ali', role: 'student', studentId: '5' },
]

const AUTH_KEY = 'sms_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY)
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    else localStorage.removeItem(AUTH_KEY)
  }, [user])

  const login = (username, password) => {
    const found = USERS.find(u => u.username === username && u.password === password)
    if (!found) return { success: false, message: 'Invalid username or password' }
    const { password: _, ...safeUser } = found
    setUser(safeUser)
    return { success: true, user: safeUser }
  }

  const logout = () => setUser(null)

  const isAdmin = user?.role === 'admin'
  const isStudent = user?.role === 'student'

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isStudent, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

export { USERS }
