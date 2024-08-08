require('dotenv').config()
import { createServer } from 'http'
import routes from './routes'
import Logger from './utils/logger'

const port = process.env.SERVER_PORT || 3000
const logger = new Logger()

const server = createServer((req, res) => {
  const url = require('url')
  const parsedUrl = url.parse(req.url, true)
  const pathName = parsedUrl.pathname.split('/')[1]

  if (routes[`/${pathName}`]) {
    routes[`/${pathName}`](req, res)
  } else {
    res.writeHead(404)
    const response = { error: 'Not found' }
    res.end(JSON.stringify(response, null, 2))
    logger.logRequest(req, res)
  }
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
  logger.info({ message: `Server running at http://localhost:${port}/` })
})

server.on('error', err => {
  console.error('Server error:', err)
  logger.error({ message: 'Server error', error: err })
})
