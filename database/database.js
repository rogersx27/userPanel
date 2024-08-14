const sqlite3 = require('sqlite3').verbose()

// Abrir la base de datos
const db = new sqlite3.Database('my_database.db', err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message)
  } else {
    console.log('Conectado a la base de datos SQLite.')
  }
})

// Crear las tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP NOT NULL,
      location TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `)
})

// Función para cerrar la conexión a la base de datos
const closeDatabase = () => {
  db.close(err => {
    if (err) {
      console.error('Error al cerrar la base de datos:', err.message)
    } else {
      console.log('Conexión a la base de datos SQLite cerrada.')
    }
  })
}

// Exportar la base de datos y la función para cerrar
module.exports = { db, closeDatabase }
