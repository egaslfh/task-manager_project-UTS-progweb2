# Project UTS PEmrograman Web 2- 24552011313- Ega Silfhia

Backend Node.js untuk aplikasi Task Manager dan dengan menggunakan PostgreSQL.

## Fitur
- Middleware logging kustom mencetak HTTP method, URL, dan timestamp untuk setiap request.
- Validasi input `title` di `POST /task` dan `PUT /task/:id`.
- Error handling 404 untuk task yang tidak ditemukan.
- Koneksi PostgreSQL menggunakan package `pg`.
- Jalankan dengan `nodemon`.

## Setup PostgreSQL
1. Buat database `db_progweb2`.
2. Buat tabel `task`:

```sql
CREATE TABLE IF NOT EXISTS task (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_complited BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Instalasi untuk dijalanin
1. kopi `.env.example` ke `.env`.
2. Isi konfigurasi PostgreSQL.
3. Jalankan: 
npm install

## untuk menjalankan server
npm run dev
```

## Endpoints
- `GET /task` - ambil semua task
- `GET /task/:id` - ambil task berdasarkan ID
- `POST /task` - tambah task baru
- `PUT /task/:id` - update task
- `DELETE /task/:id` - hapus task
