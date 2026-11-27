import { createContext, useContext, useState, useEffect } from 'react'

const ScoreContext = createContext()

const STUDENTS_KEY = 'sms_students'
const SCORES_KEY = 'sms_scores'

const defaultStudents = [
  { id: '1', name: 'Aarav Sharma', rollNo: 'CSE-001', email: 'aarav@example.com', department: 'CSE', semester: 5, createdAt: '2026-08-01' },
  { id: '2', name: 'Priya Patel', rollNo: 'CSE-002', email: 'priya@example.com', department: 'CSE', semester: 5, createdAt: '2026-08-01' },
  { id: '3', name: 'Rahul Kumar', rollNo: 'CSE-003', email: 'rahul@example.com', department: 'CSE', semester: 5, createdAt: '2026-08-01' },
  { id: '4', name: 'Sneha Reddy', rollNo: 'CSE-004', email: 'sneha@example.com', department: 'CSE', semester: 5, createdAt: '2026-08-01' },
  { id: '5', name: 'Mohammed Ali', rollNo: 'CSE-005', email: 'ali@example.com', department: 'CSE', semester: 5, createdAt: '2026-08-01' },
  { id: '6', name: 'Kavya Nair', rollNo: 'CSE-006', email: 'kavya@example.com', department: 'CSE', semester: 3, createdAt: '2026-08-15' },
  { id: '7', name: 'Arjun Singh', rollNo: 'ECE-001', email: 'arjun@example.com', department: 'ECE', semester: 3, createdAt: '2026-08-15' },
  { id: '8', name: 'Deepa Iyer', rollNo: 'ECE-002', email: 'deepa@example.com', department: 'ECE', semester: 3, createdAt: '2026-08-15' },
]

const defaultScores = [
  { id: '1', studentId: '1', subject: 'Full Stack Development', examType: 'Mid-Term', maxMarks: 100, scored: 87, date: '2026-10-15' },
  { id: '2', studentId: '1', subject: 'Data Structures', examType: 'Mid-Term', maxMarks: 100, scored: 92, date: '2026-10-15' },
  { id: '3', studentId: '1', subject: 'Operating Systems', examType: 'Mid-Term', maxMarks: 100, scored: 78, date: '2026-10-16' },
  { id: '4', studentId: '2', subject: 'Full Stack Development', examType: 'Mid-Term', maxMarks: 100, scored: 95, date: '2026-10-15' },
  { id: '5', studentId: '2', subject: 'Data Structures', examType: 'Mid-Term', maxMarks: 100, scored: 88, date: '2026-10-15' },
  { id: '6', studentId: '2', subject: 'Operating Systems', examType: 'Mid-Term', maxMarks: 100, scored: 91, date: '2026-10-16' },
  { id: '7', studentId: '3', subject: 'Full Stack Development', examType: 'Mid-Term', maxMarks: 100, scored: 72, date: '2026-10-15' },
  { id: '8', studentId: '3', subject: 'Data Structures', examType: 'Mid-Term', maxMarks: 100, scored: 65, date: '2026-10-15' },
  { id: '9', studentId: '3', subject: 'Operating Systems', examType: 'Mid-Term', maxMarks: 100, scored: 70, date: '2026-10-16' },
  { id: '10', studentId: '4', subject: 'Full Stack Development', examType: 'Mid-Term', maxMarks: 100, scored: 98, date: '2026-10-15' },
  { id: '11', studentId: '4', subject: 'Data Structures', examType: 'Mid-Term', maxMarks: 100, scored: 94, date: '2026-10-15' },
  { id: '12', studentId: '4', subject: 'Operating Systems', examType: 'Mid-Term', maxMarks: 100, scored: 90, date: '2026-10-16' },
  { id: '13', studentId: '5', subject: 'Full Stack Development', examType: 'Mid-Term', maxMarks: 100, scored: 55, date: '2026-10-15' },
  { id: '14', studentId: '5', subject: 'Data Structures', examType: 'Mid-Term', maxMarks: 100, scored: 60, date: '2026-10-15' },
  { id: '15', studentId: '5', subject: 'Operating Systems', examType: 'Mid-Term', maxMarks: 100, scored: 48, date: '2026-10-16' },
  { id: '16', studentId: '6', subject: 'Full Stack Development', examType: 'Internal', maxMarks: 50, scored: 42, date: '2026-10-20' },
  { id: '17', studentId: '6', subject: 'Data Structures', examType: 'Internal', maxMarks: 50, scored: 38, date: '2026-10-20' },
  { id: '18', studentId: '7', subject: 'Circuit Theory', examType: 'Mid-Term', maxMarks: 100, scored: 76, date: '2026-10-15' },
  { id: '19', studentId: '7', subject: 'Signals & Systems', examType: 'Mid-Term', maxMarks: 100, scored: 82, date: '2026-10-16' },
  { id: '20', studentId: '8', subject: 'Circuit Theory', examType: 'Mid-Term', maxMarks: 100, scored: 88, date: '2026-10-15' },
  { id: '21', studentId: '8', subject: 'Signals & Systems', examType: 'Mid-Term', maxMarks: 100, scored: 91, date: '2026-10-16' },
]

export function ScoreProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STUDENTS_KEY)
      return saved ? JSON.parse(saved) : defaultStudents
    } catch { return defaultStudents }
  })

  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem(SCORES_KEY)
      return saved ? JSON.parse(saved) : defaultScores
    } catch { return defaultScores }
  })

  useEffect(() => { localStorage.setItem(STUDENTS_KEY, JSON.stringify(students)) }, [students])
  useEffect(() => { localStorage.setItem(SCORES_KEY, JSON.stringify(scores)) }, [scores])

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] }
    setStudents(prev => [...prev, newStudent])
    return newStudent
  }

  const updateStudent = (id, data) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
    setScores(prev => prev.filter(sc => sc.studentId !== id))
  }

  const addScore = (score) => {
    const newScore = { ...score, id: Date.now().toString() }
    setScores(prev => [...prev, newScore])
    return newScore
  }

  const deleteScore = (id) => {
    setScores(prev => prev.filter(sc => sc.id !== id))
  }

  const getStudentScores = (studentId) => scores.filter(sc => sc.studentId === studentId)

  const getStudentAverage = (studentId) => {
    const studentScores = getStudentScores(studentId)
    if (studentScores.length === 0) return 0
    const totalPercent = studentScores.reduce((sum, sc) => sum + (sc.scored / sc.maxMarks) * 100, 0)
    return Math.round(totalPercent / studentScores.length)
  }

  const getGrade = (percent) => {
    if (percent >= 90) return 'A+'
    if (percent >= 80) return 'A'
    if (percent >= 70) return 'B'
    if (percent >= 60) return 'C'
    if (percent >= 50) return 'D'
    return 'F'
  }

  const gradeClass = (grade) => `grade-${grade.replace('+', 'plus')}`

  return (
    <ScoreContext.Provider value={{
      students, scores,
      addStudent, updateStudent, deleteStudent,
      addScore, deleteScore,
      getStudentScores, getStudentAverage, getGrade, gradeClass,
    }}>
      {children}
    </ScoreContext.Provider>
  )
}

export const useScores = () => {
  const ctx = useContext(ScoreContext)
  if (!ctx) throw new Error('useScores must be used inside <ScoreProvider>')
  return ctx
}
