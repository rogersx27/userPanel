const http = require('http')
const url = require('url')
const Logger = require('./logger')

const port = process.env.SERVER_PORT
const logger = new Logger()

function stringify(obj) {
  return JSON.stringify(obj, null, 2)
}

function parse(body) {
  try {
    return JSON.parse(body)
  } catch (e) {
    return body
  }
}

const server = http.createServer((req, res) => {
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
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
  logger.info({ message: `Server running at http://localhost:${port}/` })
})
