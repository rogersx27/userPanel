const fs = require('fs')

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

module.exports = {
  stringify,
  parse,
  getLogData,
  appendFile,
  readFile,
  serveFile,
}
