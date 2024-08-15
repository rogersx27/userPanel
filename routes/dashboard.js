const path = require('path')
const Logger = require('../utils/logger')
const { serveFile, getParseRequestInfo } = require('../utils/helpers')

const dashboardRoute = (req, res) => {
  const logger = new Logger()

  const { pathName, method } = getParseRequestInfo(req)

  const isDashboardRoute = pathName === 'dashboard'

  if (isDashboardRoute && method === 'GET') {
    const filePath = path.join(__dirname, '../public/pages', 'dashboard.html')
    serveFile(res, filePath, logger, pathName)
  } else if (isDashboardRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('405 Method Not Allowed')
    logger.warn({ message: 'Method Not Allowed', method: req.method })
  }
}

module.exports = { dashboardRoute }
