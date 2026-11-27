import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useScores } from '../context/ScoreContext'

function EditStudent() {
  const { id } = useParams()
  const { students, updateStudent } = useScores()
  const navigate = useNavigate()
  const student = students.find(s => s.id === id)

  const [form, setForm] = useState(student ? {
    name: student.name,
    rollNo: student.rollNo,
    email: student.email,
    department: student.department,
    semester: student.semester,
  } : { name: '', rollNo: '', email: '', department: 'CSE', semester: 1 })

  if (!student) return <div className="page"><div className="card"><p>Student not found.</p></div></div>

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.rollNo.trim()) return alert('Name and Roll No are required')
    updateStudent(id, form)
    navigate(`/students/${id}`)
  }

  return (
    <div className="page">
      <div className="card form-card">
        <h3>Edit Student — {student.name}</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Roll Number *</label>
              <input type="text" className="input" value={form.rollNo} onChange={e => setForm({ ...form, rollNo: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select className="input" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
                <option value="IT">IT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Semester</label>
              <select className="input" value={form.semester} onChange={e => setForm({ ...form, semester: Number(e.target.value) })}>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/students/${id}`)} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudent
