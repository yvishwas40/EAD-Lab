const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
let students = [];

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Student CRUD API');
});

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET a single student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// POST - Add new student
app.post('/students', (req, res) => {
  const student = req.body;
  const exists = students.find(s => s.id === student.id);
  if (exists) {
    return res.status(400).json({ message: 'Student ID already exists' });
  }
  students.push(student);
  res.status(201).json(student);
});

// PUT - Update student info
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = req.body;
    res.json(req.body);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// DELETE - Remove a student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Student CRUD API listening at http://localhost:${port}`);
});
