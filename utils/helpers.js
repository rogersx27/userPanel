const fs = require('fs')
const url = require('url')
const path = require('path')

const parse = body => {
  try {
    return JSON.parse(body)
  } catch (e) {
    return body
  }
}

const stringify = obj => JSON.stringify(obj, null, 2) + ',\n'

const logInfo = (type, info) => {
  return {
    type: type.toUpperCase(),
    date: new Date().toISOString(),
    info: info,
  }
}

const getLogData = (type, info) => {
  const log = logInfo(type, info)
  const stringifiedLog = stringify(log)
  return { log, stringifiedLog }
}

const appendFile = (file, data) => {
  try {
    fs.appendFileSync(file, data)
    console.log('Log appended to file')
    return { success: true }
  } catch (error) {
    return { error: 'Error appending log to file', message: error.message }
  }
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Archivo no encontrado
          resolve({ data: null, error: '404 Not Found' })
        } else {
          // Otro error, enviar 500
          reject({
            data: null,
            error: '500 Internal Server Error',
            message: err.message,
          })
        }
      } else {
        resolve({ data, error: null })
      }
    })
  })
}

async function serveFile(res, filePath, logger, pathName) {
  try {
    const result = await readFile(filePath)

    if (result.error) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(result.error)
      logger.error({ message: 'File not found', filePath, error: result.error })
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(result.data)
      logger.info({ message: 'File served', pathName })
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end('500 Internal Server Error')
    logger.error({ message: 'Internal Server Error', error: err })
  }
}

const getParseRequestInfo = req => {
  const parsedUrl = url.parse(req.url, true)
  const pathName = parsedUrl.pathname.split('/')[1]
  const method = req.method.toUpperCase()

  return { pathName, method, parsedUrl }
}

const getRequestBody = req => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body)
        resolve(parsedBody)
      } catch (error) {
        reject(error)
      }
    })
  })
}

async function serveStaticFile(res, filePath, logger) {
  try {
    const result = await readFile(filePath)

    if (result.error) { 
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end(result.error)
      logger.error({ message: 'File not found', filePath, error: result.error })
      return
    }

    // Determinar el tipo de contenido basado en la extensión del archivo
    const ext = path.extname(filePath).toLowerCase()
    let contentType = 'text/html'

    switch (ext) {
      case '.js':
        contentType = 'application/javascript'
        break
      case '.css':
        contentType = 'text/css'
        break
      case '.png':
        contentType = 'image/png'
        break
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.svg':
        contentType = 'image/svg+xml'
        break
      default:
        contentType = 'application/octet-stream'
    }

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(result.data)
    logger.info({ message: 'File served', filePath })
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end('500 Internal Server Error')
    logger.error({ message: 'Internal Server Error', error: err.message })
  }
}

module.exports = {
  stringify,
  parse,
  getLogData,
  appendFile,
  readFile,
  serveFile,
  getParseRequestInfo,
  getRequestBody,
  serveStaticFile,
}
