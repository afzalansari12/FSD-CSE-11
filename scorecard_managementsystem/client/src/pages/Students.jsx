import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScores } from '../context/ScoreContext'

function Students() {
  const { students, scores, getStudentAverage, getGrade, gradeClass, deleteStudent } = useScores()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  const departments = ['All', ...new Set(students.map(s => s.department))]

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.rollNo.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'All' || s.department === deptFilter
    return matchSearch && matchDept
  })

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete student "${name}" and all their scores?`)) {
      deleteStudent(id)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name or roll no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input search-input"
          />
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="input select-input">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <Link to="/students/add" className="btn btn-primary">+ Add Student</Link>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Exams</th>
                <th>Average</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="8" className="empty-state">No students found</td></tr>
              ) : (
                filtered.map(s => {
                  const avg = getStudentAverage(s.id)
                  const examCount = scores.filter(sc => sc.studentId === s.id).length
                  return (
                    <tr key={s.id}>
                      <td><code>{s.rollNo}</code></td>
                      <td><Link to={`/students/${s.id}`} className="text-link">{s.name}</Link></td>
                      <td><span className="badge badge-dept">{s.department}</span></td>
                      <td>{s.semester}</td>
                      <td>{examCount}</td>
                      <td><strong>{avg}%</strong></td>
                      <td><span className={`grade ${gradeClass(getGrade(avg))}`}>{getGrade(avg)}</span></td>
                      <td className="action-cell">
                        <Link to={`/students/${s.id}`} className="btn btn-sm btn-ghost" title="View">👁️</Link>
                        <Link to={`/students/${s.id}/edit`} className="btn btn-sm btn-ghost" title="Edit">✏️</Link>
                        <button onClick={() => handleDelete(s.id, s.name)} className="btn btn-sm btn-danger" title="Delete">🗑️</button>
                      </td>
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

export default Students
