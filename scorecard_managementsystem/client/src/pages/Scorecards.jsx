import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScores } from '../context/ScoreContext'

function Scorecards() {
  const { students, scores, getGrade, gradeClass, deleteScore } = useScores()
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [examFilter, setExamFilter] = useState('All')

  const subjects = ['All', ...new Set(scores.map(s => s.subject))]
  const examTypes = ['All', ...new Set(scores.map(s => s.examType))]

  const filtered = scores.filter(sc => {
    const student = students.find(s => s.id === sc.studentId)
    const matchSearch = !search || (student && (
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase())
    ))
    const matchSubject = subjectFilter === 'All' || sc.subject === subjectFilter
    const matchExam = examFilter === 'All' || sc.examType === examFilter
    return matchSearch && matchSubject && matchExam
  })

  return (
    <div className="page">
      <div className="page-header">
        <div className="filters">
          <input type="text" placeholder="Search student..." value={search}
            onChange={e => setSearch(e.target.value)} className="input search-input" />
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="input select-input">
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={examFilter} onChange={e => setExamFilter(e.target.value)} className="input select-input">
            {examTypes.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <Link to="/scorecards/add" className="btn btn-primary">+ Add Score</Link>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Subject</th>
                <th>Exam Type</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Grade</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="9" className="empty-state">No scores found</td></tr>
              ) : (
                filtered.map(sc => {
                  const student = students.find(s => s.id === sc.studentId)
                  const pct = Math.round((sc.scored / sc.maxMarks) * 100)
                  return (
                    <tr key={sc.id}>
                      <td><Link to={`/students/${sc.studentId}`} className="text-link">{student?.name || 'Unknown'}</Link></td>
                      <td><code>{student?.rollNo}</code></td>
                      <td>{sc.subject}</td>
                      <td><span className="badge">{sc.examType}</span></td>
                      <td>{sc.scored}/{sc.maxMarks}</td>
                      <td>{pct}%</td>
                      <td><span className={`grade ${gradeClass(getGrade(pct))}`}>{getGrade(pct)}</span></td>
                      <td>{sc.date}</td>
                      <td><button onClick={() => deleteScore(sc.id)} className="btn btn-sm btn-danger">🗑️</button></td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Scorecards
