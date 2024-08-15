const Logger = require('../utils/logger')
const { getParseRequestInfo, getRequestBody } = require('../utils/helpers')
const { findUserByEmail } = require('../database/databaseServices/select').default

const handleSignIn = async (req, res) => {
  try {
    const { email, password } = await getRequestBody(req)
    const user = await findUserByEmail(email)

    if (user && password === user.password) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Inicio de sesión correcto' }))
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({ error: true, message: 'Credenciales incorrectas' }),
      )
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({ error: true, message: 'Error interno del servidor' }),
    )
    console.error('Error en el manejo del inicio de sesión:', error.message)
  }
}

// Ruta de inicio de sesión
const signInRoute = (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isSignInRoute = pathName === 'signIn'

  if (isSignInRoute && method === 'POST') {
    handleSignIn(req, res)
  } else if (isSignInRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { signInRoute }
