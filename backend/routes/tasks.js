const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que este archivo maneja la conexión a la base de datos

// Ruta para agregar una tarea
router.post('/tasks', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'El nombre de la tarea es obligatorio' });
  }
  try {
    await db.query('INSERT INTO tasks (name) VALUES (?)', [name]); // Ajusta según tu SQL
    res.status(201).json({ message: 'Tarea agregada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar la tarea' });
  }
});

module.exports = router;
