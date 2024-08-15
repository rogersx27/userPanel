const Logger = require('../utils/logger')
const { getParseRequestInfo, getRequestBody } = require('../utils/helpers')
const { insertUser } = require('../database/databaseServices/insert')

const createUser = async (username, email, password) => {
  try {
    await insertUser(username, email, password)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

const handleSignUp = async (req, res) => {
  try {
    const { username, email, password } = await getRequestBody(req)

    if (!username || !email || !password) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: true, message: 'Datos incompletos' }))
      return
    }

    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: true, message: 'Email inválido' }))
      return
    }

    const result = await createUser(username, email, password)

    if (result.success) {
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Usuario creado correctamente' }))
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({ error: true, message: 'Error al crear el usuario' }),
      )
      console.error('Error al insertar el usuario:', result.error.message)
    }
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: true, message: 'Solicitud inválida' }))
    console.error('Error en el manejo del registro de usuario:', error.message)
  }
}

// Ruta de registro de usuario
const signUpRoute = async (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isSignUpRoute = pathName === 'signUp'

  if (isSignUpRoute && method === 'POST') {
    await handleSignUp(req, res)
  } else if (isSignUpRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { signUpRoute }
