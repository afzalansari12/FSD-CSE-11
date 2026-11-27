import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(username, password)
      if (!result.success) setError(result.message)
      setLoading(false)
    }, 400)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">📊</span>
          <h1>ScoreCard</h1>
          <p>Scorecard Management System</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="login-help">
          <details>
            <summary>Demo Credentials</summary>
            <div className="credentials-table">
              <table>
                <thead>
                  <tr><th>Role</th><th>Username</th><th>Password</th></tr>
                </thead>
                <tbody>
                  <tr><td><span className="badge badge-admin">Admin</span></td><td>admin</td><td>admin123</td></tr>
                  <tr><td><span className="badge badge-student">Student</span></td><td>aarav</td><td>aarav123</td></tr>
                  <tr><td><span className="badge badge-student">Student</span></td><td>priya</td><td>priya123</td></tr>
                  <tr><td><span className="badge badge-student">Student</span></td><td>rahul</td><td>rahul123</td></tr>
                  <tr><td><span className="badge badge-student">Student</span></td><td>sneha</td><td>sneha123</td></tr>
                  <tr><td><span className="badge badge-student">Student</span></td><td>ali</td><td>ali123</td></tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default Login
