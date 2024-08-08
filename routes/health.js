const url = require('url')
const { stringify, parse } = require('../utils/helpers')
const Logger = require('../utils/logger')
const logger = new Logger()

const handleHealthRoute = (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const pathName = parsedUrl.pathname
  const method = req.method.toUpperCase()

  res.setHeader('Content-Type', 'application/json')

  if (pathName === '/health' && method === 'GET') {
    res.writeHead(200)
    const response = { status: 'UP' }

    logger.info({ method, pathName })

    res.end(stringify(response))
    logger.logRequest(req, res)
  } else if (pathName === '/health' && method === 'POST') {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      res.writeHead(200)
      const response = { status: 'UP', body: parse(body) }
      res.end(stringify(response))
      logger.logRequest(req, res)
    })

    logger.info({ method, pathName })
  } else {
    res.writeHead(404)
    const response = { error: 'Not found' }
    res.end(stringify(response))
    logger.logRequest(req, res)
  }
}

module.exports = { handleHealthRoute }
