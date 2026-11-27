import { Link } from 'react-router-dom'
import { useScores } from '../context/ScoreContext'
import StatCard from '../components/StatCard'
import ScoreBar from '../components/ScoreBar'

function Dashboard() {
  const { students, scores, getStudentAverage, getGrade, gradeClass } = useScores()

  const totalStudents = students.length
  const totalScores = scores.length
  const subjects = [...new Set(scores.map(s => s.subject))]
  const avgScore = scores.length
    ? Math.round(scores.reduce((s, sc) => s + (sc.scored / sc.maxMarks) * 100, 0) / scores.length)
    : 0

  const topStudents = students
    .map(s => ({ ...s, avg: getStudentAverage(s.id) }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5)

  const subjectAverages = subjects.map(sub => {
    const subScores = scores.filter(sc => sc.subject === sub)
    const avg = Math.round(subScores.reduce((s, sc) => s + (sc.scored / sc.maxMarks) * 100, 0) / subScores.length)
    return { subject: sub, avg }
  }).sort((a, b) => b.avg - a.avg)

  const passCount = students.filter(s => getStudentAverage(s.id) >= 50).length
  const passRate = totalStudents ? Math.round((passCount / totalStudents) * 100) : 0

  const colors = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626']

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard icon="👨‍🎓" label="Total Students" value={totalStudents} color="blue" />
        <StatCard icon="📝" label="Total Scores" value={totalScores} color="cyan" />
        <StatCard icon="📊" label="Avg Score" value={`${avgScore}%`} color="green" />
        <StatCard icon="✅" label="Pass Rate" value={`${passRate}%`} color="orange" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>🏆 Top Performers</h3>
            <Link to="/students" className="card-link">View all →</Link>
          </div>
          <div className="card-body">
            {topStudents.map((s, i) => (
              <Link to={`/students/${s.id}`} key={s.id} className="top-student-row">
                <span className={`rank rank-${i + 1}`}>{i + 1}</span>
                <div className="top-student-info">
                  <span className="top-student-name">{s.name}</span>
                  <span className="top-student-roll">{s.rollNo}</span>
                </div>
                <span className={`grade ${gradeClass(getGrade(s.avg))}`}>{getGrade(s.avg)}</span>
                <span className="top-student-avg">{s.avg}%</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>📚 Subject Performance</h3>
          </div>
          <div className="card-body">
            {subjectAverages.map((s, i) => (
              <ScoreBar key={s.subject} label={s.subject} percent={s.avg} color={colors[i % colors.length]} />
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>⏰ Recent Scores</h3>
          <Link to="/scorecards" className="card-link">View all →</Link>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {scores.slice(-8).reverse().map(sc => {
                const student = students.find(s => s.id === sc.studentId)
                const pct = Math.round((sc.scored / sc.maxMarks) * 100)
                return (
                  <tr key={sc.id}>
                    <td>{student?.name || 'Unknown'}</td>
                    <td>{sc.subject}</td>
                    <td><span className="badge">{sc.examType}</span></td>
                    <td>{sc.scored}/{sc.maxMarks}</td>
                    <td>{pct}%</td>
                    <td><span className={`grade ${gradeClass(getGrade(pct))}`}>{getGrade(pct)}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
