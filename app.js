const express = require('express');
const { pool } = require('./db');

const app = express();
app.use(express.json());

function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

app.use(requestLogger);

app.get('/task', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM task ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/task/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task dengan ID tersebut tidak ditemukan.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.post('/task', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.toString().trim()) {
      return res.status(400).json({ error: "Field 'title' tidak boleh kosong atau hanya berisi spasi" });
    }

    const result = await pool.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title.trim(), description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.put('/task/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, is_complited } = req.body;

    if (!title || !title.toString().trim()) {
      return res.status(400).json({ error: "Field 'title' tidak boleh kosong atau hanya berisi spasi" });
    }

    const result = await pool.query(
      'UPDATE task SET title = $1, description = $2, is_complited = $3 WHERE id = $4 RETURNING *',
      [title.trim(), description || null, is_complited === true, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task dengan ID tersebut tidak ditemukan.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.delete('/task/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task dengan ID tersebut tidak ditemukan.' });
    }

    res.json({ message: 'Task berhasil dihapus.' });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
