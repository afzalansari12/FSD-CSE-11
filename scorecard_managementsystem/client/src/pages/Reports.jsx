import { useState } from 'react'
import { useScores } from '../context/ScoreContext'
import ScoreBar from '../components/ScoreBar'

function Reports() {
  const { students, scores, getStudentAverage, getGrade, gradeClass } = useScores()
  const [deptFilter, setDeptFilter] = useState('All')

  const departments = ['All', ...new Set(students.map(s => s.department))]
  const filteredStudents = deptFilter === 'All' ? students : students.filter(s => s.department === deptFilter)

  // Grade distribution
  const gradeDistribution = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 }
  filteredStudents.forEach(s => {
    const avg = getStudentAverage(s.id)
    const g = getGrade(avg)
    gradeDistribution[g]++
  })

  // Subject averages
  const subjects = [...new Set(scores.map(s => s.subject))]
  const subjectStats = subjects.map(sub => {
    const subScores = scores.filter(sc => sc.subject === sub)
    const avg = Math.round(subScores.reduce((s, sc) => s + (sc.scored / sc.maxMarks) * 100, 0) / subScores.length)
    const highest = Math.round(Math.max(...subScores.map(sc => (sc.scored / sc.maxMarks) * 100)))
    const lowest = Math.round(Math.min(...subScores.map(sc => (sc.scored / sc.maxMarks) * 100)))
    return { subject: sub, avg, highest, lowest, count: subScores.length }
  })

  // Department averages
  const deptStats = [...new Set(students.map(s => s.department))].map(dept => {
    const deptStudents = students.filter(s => s.department === dept)
    const totalAvg = deptStudents.reduce((sum, s) => sum + getStudentAverage(s.id), 0)
    return { department: dept, avg: Math.round(totalAvg / deptStudents.length), count: deptStudents.length }
  })

  // Student ranking
  const ranked = filteredStudents
    .map(s => ({ ...s, avg: getStudentAverage(s.id) }))
    .sort((a, b) => b.avg - a.avg)

  const gradeColors = { 'A+': '#059669', 'A': '#0891b2', 'B': '#4f46e5', 'C': '#d97706', 'D': '#ea580c', 'F': '#dc2626' }
  const barColors = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed']

  return (
    <div className="page">
      <div className="page-header">
        <div className="filters">
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="input select-input">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="card">
        <div className="card-header"><h3>📊 Grade Distribution</h3></div>
        <div className="card-body">
          <div className="grade-dist">
            {Object.entries(gradeDistribution).map(([g, count]) => (
              <div key={g} className="grade-dist-item">
                <div className="grade-dist-bar" style={{
                  height: `${filteredStudents.length ? (count / filteredStudents.length) * 150 : 0}px`,
                  backgroundColor: gradeColors[g]
                }} />
                <span className="grade-dist-label">{g}</span>
                <span className="grade-dist-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Subject Stats */}
        <div className="card">
          <div className="card-header"><h3>📚 Subject Analysis</h3></div>
          <div className="card-body">
            {subjectStats.map((s, i) => (
              <div key={s.subject} className="subject-stat">
                <ScoreBar label={s.subject} percent={s.avg} color={barColors[i % barColors.length]} />
                <div className="subject-stat-meta">
                  <span>Highest: {s.highest}%</span>
                  <span>Lowest: {s.lowest}%</span>
                  <span>{s.count} entries</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Stats */}
        <div className="card">
          <div className="card-header"><h3>🏢 Department Comparison</h3></div>
          <div className="card-body">
            {deptStats.map((d, i) => (
              <div key={d.department} className="subject-stat">
                <ScoreBar label={`${d.department} (${d.count} students)`} percent={d.avg} color={barColors[i % barColors.length]} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Ranking */}
      <div className="card">
        <div className="card-header"><h3>🏆 Student Ranking</h3></div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Average</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((s, i) => (
                <tr key={s.id} className={s.avg < 50 ? 'row-danger' : ''}>
                  <td><span className={`rank rank-${i + 1}`}>{i + 1}</span></td>
                  <td><strong>{s.name}</strong></td>
                  <td><code>{s.rollNo}</code></td>
                  <td><span className="badge badge-dept">{s.department}</span></td>
                  <td>{s.avg}%</td>
                  <td><span className={`grade ${gradeClass(getGrade(s.avg))}`}>{getGrade(s.avg)}</span></td>
                  <td><span className={`badge ${s.avg >= 50 ? 'badge-pass' : 'badge-fail'}`}>{s.avg >= 50 ? 'PASS' : 'FAIL'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports
