require('dotenv').config()
import { createServer } from 'http'
import routes from './routes'
import Logger from './utils/logger'
import { getParseRequestInfo, serveStaticFile } from './utils/helpers'

const port = process.env.SERVER_PORT || 3000
const logger = new Logger()

const server = createServer((req, res) => {
  const path = require('path')
  const { pathName, parsedUrl } = getParseRequestInfo(req)
  if (pathName === 'js' || pathName === 'css' || pathName === 'images') {
    const filePath = path.join(__dirname, './public', parsedUrl.pathname)
    console.log('filePath', filePath)
    serveStaticFile(res, filePath, logger)
    return
  }

  if (routes[`/${pathName}`]) {
    routes[`/${pathName}`](req, res)
  } else {
    routes['/notFound'](req, res)
    logger.warn({ message: 'Route not found', pathName })
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
