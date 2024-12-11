const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'El nombre de la tarea es obligatorio.' });
  }
  tasks.push({ id: tasks.length + 1, name });
  res.status(201).json({ message: 'Tarea agregada correctamente', task: { id: tasks.length, name } });
});

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
