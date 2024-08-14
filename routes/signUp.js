const Logger = require('../utils/logger')
const { getParseRequestInfo } = require('../utils/helpers')
const { insertUser } = require('../database/databaseServices/insert').default

const signUpRoute = (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isSignUpRoute = pathName === 'signUp'

  if (isSignUpRoute && method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const { username, email, password } = JSON.parse(body)

      console.log(JSON.parse(body))

      insertUser(username, email, password)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Usuario creado correctamente' }))
    })
  } else if (isSignUpRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { signUpRoute }
