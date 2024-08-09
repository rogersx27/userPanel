const url = require('url')
const fs = require('fs')
const path = require('path')
const Logger = require('../utils/logger')
const { serveFile } = require('../utils/helpers')

const loginRoute = (req, res) => {
  const logger = new Logger()
  const parsedUrl = url.parse(req.url, true)
  const pathName = parsedUrl.pathname.split('/')[1]

  const isLoginRoute = pathName === 'login' || pathName === ''
  const method = req.method.toUpperCase()

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
