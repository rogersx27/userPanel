import { db, closeDatabase } from '../database'

// Función para encontrar un usuario por email en la base de datos
const findUserByEmail = email => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`
    db.get(sql, [email], (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
}

export default { findUserByEmail }
