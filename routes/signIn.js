const Logger = require('../utils/logger')
const { getParseRequestInfo } = require('../utils/helpers')

// Simulación de datos de usuario (en un escenario real, esto vendría de una base de datos)
const users = [
  { email: 'user@example.com', password: '1234' } // La contraseña debería estar cifrada en una aplicación real
]

const signInRoute = (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isLoginRoute = pathName === 'signIn'

  if (isLoginRoute && method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const { email, password } = JSON.parse(body)

      console.log('email', email)
      console.log('password', password)

      // Verificamos si el usuario existe y si la contraseña es correcta
      const user = users.find(user => user.email === email && user.password === password)

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Inicio de sesión correcto' }))
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: true, message: 'Credenciales incorrectas' }))
      }
    })
  } else if (isLoginRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { signInRoute }
