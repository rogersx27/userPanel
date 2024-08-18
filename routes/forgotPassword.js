const path = require('path')
const Logger = require('../utils/logger')
const { getParseRequestInfo, getRequestBody } = require('../utils/helpers')
const { serveFile } = require('../utils/helpers')

const users = [{ email: 'user@example.com', password: '1234' }]

const forgotPasswordRoute = async (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isForgotPasswordRoute = pathName === 'forgotPassword'

  if (isForgotPasswordRoute && method === 'POST') {
    const { email } = await getRequestBody(req)

    req.on('end', () => {
      try {
        const user = users.find(user => user.email === email)

        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              message: 'Se ha enviado un correo para restablecer tu contraseña',
            }),
          )
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              error: true,
              message: 'No se encontró un usuario con ese correo',
            }),
          )
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            error: true,
            message: 'Solicitud inválida',
          }),
        )
        logger.error({ message: 'Error al procesar la solicitud', error })
      }
    })
  } else if (isForgotPasswordRoute && method === 'GET') {
    const filePath = path.join(__dirname, '../public/pages', 'forgotPassword.html')
    serveFile(res, filePath, logger, pathName)
  } else if (isForgotPasswordRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { forgotPasswordRoute }
