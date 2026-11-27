const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ---------- API Routes ----------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// In-memory data store (mirrors the client seed for API consistency)
let students = [
  { id: '1', name: 'Aarav Sharma', rollNo: 'CSE-001', email: 'aarav@example.com', department: 'CSE', semester: 5 },
  { id: '2', name: 'Priya Patel', rollNo: 'CSE-002', email: 'priya@example.com', department: 'CSE', semester: 5 },
  { id: '3', name: 'Rahul Kumar', rollNo: 'CSE-003', email: 'rahul@example.com', department: 'CSE', semester: 5 },
  { id: '4', name: 'Sneha Reddy', rollNo: 'CSE-004', email: 'sneha@example.com', department: 'CSE', semester: 5 },
  { id: '5', name: 'Mohammed Ali', rollNo: 'CSE-005', email: 'ali@example.com', department: 'CSE', semester: 5 },
  { id: '6', name: 'Kavya Nair', rollNo: 'CSE-006', email: 'kavya@example.com', department: 'CSE', semester: 3 },
  { id: '7', name: 'Arjun Singh', rollNo: 'ECE-001', email: 'arjun@example.com', department: 'ECE', semester: 3 },
  { id: '8', name: 'Deepa Iyer', rollNo: 'ECE-002', email: 'deepa@example.com', department: 'ECE', semester: 3 },
];

let scores = [
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
];

const users = [
  { id: 'admin1', username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 'stu1', username: 'aarav', password: 'aarav123', name: 'Aarav Sharma', role: 'student', studentId: '1' },
  { id: 'stu2', username: 'priya', password: 'priya123', name: 'Priya Patel', role: 'student', studentId: '2' },
  { id: 'stu3', username: 'rahul', password: 'rahul123', name: 'Rahul Kumar', role: 'student', studentId: '3' },
  { id: 'stu4', username: 'sneha', password: 'sneha123', name: 'Sneha Reddy', role: 'student', studentId: '4' },
  { id: 'stu5', username: 'ali', password: 'ali123', name: 'Mohammed Ali', role: 'student', studentId: '5' },
];

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
});

// Students CRUD
app.get('/api/students', (req, res) => res.json(students));
app.get('/api/students/:id', (req, res) => {
  const s = students.find(s => s.id === req.params.id);
  if (!s) return res.status(404).json({ message: 'Student not found' });
  res.json(s);
});
app.post('/api/students', (req, res) => {
  const student = { ...req.body, id: Date.now().toString() };
  students.push(student);
  res.status(201).json(student);
});
app.put('/api/students/:id', (req, res) => {
  const idx = students.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Student not found' });
  students[idx] = { ...students[idx], ...req.body };
  res.json(students[idx]);
});
app.delete('/api/students/:id', (req, res) => {
  students = students.filter(s => s.id !== req.params.id);
  scores = scores.filter(sc => sc.studentId !== req.params.id);
  res.json({ message: 'Deleted' });
});

// Scores CRUD
app.get('/api/scores', (req, res) => res.json(scores));
app.get('/api/scores/student/:studentId', (req, res) => {
  res.json(scores.filter(sc => sc.studentId === req.params.studentId));
});
app.post('/api/scores', (req, res) => {
  const score = { ...req.body, id: Date.now().toString() };
  scores.push(score);
  res.status(201).json(score);
});
app.delete('/api/scores/:id', (req, res) => {
  scores = scores.filter(sc => sc.id !== req.params.id);
  res.json({ message: 'Deleted' });
});

// ---------- Serve React Frontend ----------
const clientBuild = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientBuild));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}`);
});
