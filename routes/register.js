const url = require('url')
const path = require('path')
const Logger = require('../utils/logger')
const { serveFile } = require('../utils/helpers')

const registerRoute = (req, res) => {
  const logger = new Logger()
  const parsedUrl = url.parse(req.url, true)
  const pathName = parsedUrl.pathname.split('/')[1]

  const isRegisterRoute = pathName === 'register'
  const method = req.method.toUpperCase()

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
