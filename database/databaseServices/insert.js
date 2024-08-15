import { db } from '../database'

// Insertar un usuario
const insertUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
    db.run(sql, [username, email, password], function (err) {
      if (err) {
        console.error('Error al insertar usuario:', err.message)
        return reject(err)
      }
      console.log(`Usuario añadido con ID: ${this.lastID}`)
      resolve(this.lastID)
    })
  })
}

// Insertar un evento
const insertEvent = (
  user_id,
  title,
  description,
  start_time,
  end_time,
  location,
) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO events (user_id, title, description, start_time, end_time, location) VALUES (?, ?, ?, ?, ?, ?)`
    db.run(
      sql,
      [user_id, title, description, start_time, end_time, location],
      function (err) {
        if (err) {
          console.error('Error al insertar evento:', err.message)
          return reject(err)
        }
        console.log(`Evento añadido con ID: ${this.lastID}`)
        resolve(this.lastID)
      },
    )
  })
}

export { insertUser, insertEvent }
