import { useParams, Link, useNavigate } from 'react-router-dom'
import { useScores } from '../context/ScoreContext'
import ScoreBar from '../components/ScoreBar'

function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { students, getStudentScores, getStudentAverage, getGrade, gradeClass, deleteStudent, deleteScore } = useScores()

  const student = students.find(s => s.id === id)
  if (!student) return <div className="page"><div className="card"><p>Student not found.</p></div></div>

  const studentScores = getStudentScores(id)
  const avg = getStudentAverage(id)
  const grade = getGrade(avg)

  const handleDeleteStudent = () => {
    if (window.confirm(`Delete "${student.name}" and all their scores?`)) {
      deleteStudent(id)
      navigate('/students')
    }
  }

  const colors = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed']

  return (
    <div className="page">
      <div className="detail-header">
        <div className="detail-info">
          <div className="detail-avatar">{student.name.charAt(0)}</div>
          <div>
            <h2>{student.name}</h2>
            <p className="detail-meta">{student.rollNo} · {student.department} · Semester {student.semester}</p>
            {student.email && <p className="detail-email">{student.email}</p>}
          </div>
        </div>
        <div className="detail-actions">
          <Link to={`/students/${id}/edit`} className="btn btn-primary">✏️ Edit</Link>
          <button onClick={handleDeleteStudent} className="btn btn-danger">🗑️ Delete</button>
        </div>
      </div>

      <div className="stats-grid stats-grid-3">
        <div className="stat-card stat-blue">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <span className="stat-value">{studentScores.length}</span>
            <span className="stat-label">Exams Taken</span>
          </div>
        </div>
        <div className="stat-card stat-green">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <span className="stat-value">{avg}%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
        <div className="stat-card stat-orange">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <span className={`stat-value grade ${gradeClass(grade)}`}>{grade}</span>
            <span className="stat-label">Overall Grade</span>
          </div>
        </div>
      </div>

      {studentScores.length > 0 && (
        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header"><h3>📊 Subject-wise Performance</h3></div>
            <div className="card-body">
              {studentScores.map((sc, i) => {
                const pct = Math.round((sc.scored / sc.maxMarks) * 100)
                return <ScoreBar key={sc.id} label={`${sc.subject} (${sc.examType})`} percent={pct} color={colors[i % colors.length]} />
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>📋 Score Details</h3></div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Exam</th>
                    <th>Score</th>
                    <th>%</th>
                    <th>Grade</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studentScores.map(sc => {
                    const pct = Math.round((sc.scored / sc.maxMarks) * 100)
                    return (
                      <tr key={sc.id}>
                        <td>{sc.subject}</td>
                        <td><span className="badge">{sc.examType}</span></td>
                        <td>{sc.scored}/{sc.maxMarks}</td>
                        <td>{pct}%</td>
                        <td><span className={`grade ${gradeClass(getGrade(pct))}`}>{getGrade(pct)}</span></td>
                        <td>
                          <button onClick={() => deleteScore(sc.id)} className="btn btn-sm btn-danger" title="Delete">🗑️</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {studentScores.length === 0 && (
        <div className="card">
          <div className="empty-state-box">
            <p>No scores recorded yet.</p>
            <Link to="/scorecards/add" className="btn btn-primary">+ Add Score</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDetail
