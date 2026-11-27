import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScores } from '../context/ScoreContext'

function AddScore() {
  const { students, addScore } = useScores()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    studentId: students[0]?.id || '',
    subject: '',
    examType: 'Mid-Term',
    maxMarks: 100,
    scored: '',
    date: new Date().toISOString().split('T')[0],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.studentId || !form.subject.trim()) return alert('Student and Subject are required')
    const scored = Number(form.scored)
    if (isNaN(scored) || scored < 0 || scored > Number(form.maxMarks)) return alert('Invalid score')
    addScore({ ...form, scored, maxMarks: Number(form.maxMarks) })
    navigate('/scorecards')
  }

  return (
    <div className="page">
      <div className="card form-card">
        <h3>Add Score Entry</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Student *</label>
            <select className="input" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} required>
              <option value="">Select student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Subject *</label>
              <input type="text" className="input" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. Full Stack Development" required />
            </div>
            <div className="form-group">
              <label>Exam Type</label>
              <select className="input" value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })}>
                <option value="Mid-Term">Mid-Term</option>
                <option value="End-Term">End-Term</option>
                <option value="Internal">Internal</option>
                <option value="Assignment">Assignment</option>
                <option value="Lab">Lab</option>
                <option value="Quiz">Quiz</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Max Marks</label>
              <input type="number" className="input" value={form.maxMarks} onChange={e => setForm({ ...form, maxMarks: e.target.value })} min="1" />
            </div>
            <div className="form-group">
              <label>Scored *</label>
              <input type="number" className="input" value={form.scored} onChange={e => setForm({ ...form, scored: e.target.value })}
                min="0" max={form.maxMarks} required placeholder="Enter marks" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/scorecards')} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Score</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddScore
