import { useAuth } from '../context/AuthContext'
import { useScores } from '../context/ScoreContext'
import { Link } from 'react-router-dom'
import ScoreBar from '../components/ScoreBar'

function StudentDashboard() {
  const { user } = useAuth()
  const { students, getStudentScores, getStudentAverage, getGrade, gradeClass } = useScores()

  const student = students.find(s => s.id === user.studentId)
  if (!student) return <div className="page"><div className="card"><p className="empty-state">Student record not found.</p></div></div>

  const studentScores = getStudentScores(student.id)
  const avg = getStudentAverage(student.id)
  const grade = getGrade(avg)
  const passed = studentScores.filter(sc => (sc.scored / sc.maxMarks) * 100 >= 50).length
  const failed = studentScores.length - passed

  const colors = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed']

  return (
    <div className="page">
      <div className="detail-header">
        <div className="detail-info">
          <div className="detail-avatar">{student.name.charAt(0)}</div>
          <div>
            <h2>Welcome, {student.name}</h2>
            <p className="detail-meta">{student.rollNo} · {student.department} · Semester {student.semester}</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-icon">📝</div>
          <div className="stat-info"><span className="stat-value">{studentScores.length}</span><span className="stat-label">Exams Taken</span></div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-icon">📊</div>
          <div className="stat-info"><span className="stat-value">{avg}%</span><span className="stat-label">Average</span></div>
        </div>
        <div className="stat-card stat-orange">
          <div className="stat-icon">🎓</div>
          <div className="stat-info"><span className="stat-value">{grade}</span><span className="stat-label">Grade</span></div>
        </div>
        <div className="stat-card stat-cyan">
          <div className="stat-icon">✅</div>
          <div className="stat-info"><span className="stat-value">{passed}/{studentScores.length}</span><span className="stat-label">Passed</span></div>
        </div>
      </div>

      {studentScores.length > 0 && (
        <>
          <div className="card">
            <div className="card-header"><h3>📊 My Subject Performance</h3></div>
            <div className="card-body">
              {studentScores.map((sc, i) => {
                const pct = Math.round((sc.scored / sc.maxMarks) * 100)
                return <ScoreBar key={sc.id} label={`${sc.subject} (${sc.examType})`} percent={pct} color={colors[i % colors.length]} />
              })}
            </div>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <div className="card-header"><h3>📋 Detailed Scores</h3></div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Exam</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {studentScores.map(sc => {
                    const pct = Math.round((sc.scored / sc.maxMarks) * 100)
                    return (
                      <tr key={sc.id} className={pct < 50 ? 'row-danger' : ''}>
                        <td><strong>{sc.subject}</strong></td>
                        <td><span className="badge">{sc.examType}</span></td>
                        <td>{sc.scored}/{sc.maxMarks}</td>
                        <td>{pct}%</td>
                        <td><span className={`grade ${gradeClass(getGrade(pct))}`}>{getGrade(pct)}</span></td>
                        <td><span className={`badge ${pct >= 50 ? 'badge-pass' : 'badge-fail'}`}>{pct >= 50 ? 'PASS' : 'FAIL'}</span></td>
                        <td>{sc.date}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {studentScores.length === 0 && (
        <div className="card">
          <div className="empty-state-box">
            <p>No scores recorded yet. Check back after exams.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDashboard
