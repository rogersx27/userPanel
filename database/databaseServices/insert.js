import { db, closeDatabase } from '../database';

// Insertar un usuario
const insertUser = (username, email, password) => {
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [username, email, password], function (err) {
    if (err) {
      console.log(username, email, password)
      return console.error('Error al insertar usuario:', err.message);
    }
    console.log(`Usuario añadido con ID: ${this.lastID}`);
  });
};

// Insertar un evento
const insertEvent = (user_id, title, description, start_time, end_time, location) => {
  const sql = `INSERT INTO events (user_id, title, description, start_time, end_time, location) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [user_id, title, description, start_time, end_time, location], function (err) {
    if (err) {
      return console.error('Error al insertar evento:', err.message);
    }
    console.log(`Evento añadido con ID: ${this.lastID}`);
  });
};

export default { insertUser, insertEvent };