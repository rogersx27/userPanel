const path = require('path')
const Logger = require('../utils/logger')

const { getParseRequestInfo } = require('../utils/helpers')
const { serveFile } = require('../utils/helpers')

const loginRoute = (req, res) => {
  const logger = new Logger()

  const { pathName, method } = getParseRequestInfo(req)

  const isLoginRoute = pathName === 'login' || pathName === ''

  if (isLoginRoute && method === 'GET') {
    const filePath = path.join(__dirname, '../public/pages', 'login.html')
    serveFile(res, filePath, logger, pathName)
  } else if (isLoginRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { loginRoute }
