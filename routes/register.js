const url = require('url')
const path = require('path')
const Logger = require('../utils/logger')
const { serveFile, getParseRequestInfo } = require('../utils/helpers')

const registerRoute = (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isRegisterRoute = pathName === 'register'

  if (isRegisterRoute && method === 'GET') {
    const filePath = path.join(__dirname, '../public/pages', 'register.html')
    serveFile(res, filePath, logger, pathName)
  } else if (isRegisterRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { registerRoute }
