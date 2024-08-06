const fs = require('fs')

const logInfo = (type, info) => {
  const log = {
    type: type.toUpperCase(),
    date: new Date().toISOString(),
    info: info,
  }
  return log
}

const stringify = obj => JSON.stringify(obj, null, 2) + ',\n'

const getLogData = (type, info) => {
  const log = logInfo(type, info)
  const stringifiedLog = stringify(log)
  return { log, stringifiedLog }
}

const appendFile = (file, data) => {
  fs.appendFile(file, data, err => {
    if (err) {
      console.error(`Error writing to log file: ${err.message}`)
      return { error: 'Error writing to log file', message: err.message }
    }
    console.log(`Data written to ${file}`)
    return true
  })
}

// Clase para manejar el logging
class Logger {
  constructor() {
    this.logFile = './logs/server.log'

    if (!fs.existsSync('./logs')) {
      fs.mkdirSync('./logs')
    }
  }

  // Log de la request
  logRequest(req, res) {
    const log = {
      method: req.method.toUpperCase(),
      date: new Date().toISOString(),
      url: req.url,
      headers: req.headers,
      body: req.body,
      status: res.statusCode,
    }

    const responseChunks = []
    const originalWrite = res.write
    const originalEnd = res.end

    res.write = (...args) => {
      responseChunks.push(Buffer.from(args[0]))
      originalWrite.apply(res, args)
    }

    res.end = (...args) => {
      if (args[0]) responseChunks.push(Buffer.from(args[0]))
      const responseBody = Buffer.concat(responseChunks).toString('utf8')
      log.response = responseBody

      const appendFileResponse = appendFile(this.logFile, stringify(log))
      if (appendFileResponse?.error) {
        console.error(appendFileResponse)
      }
      console.log(log)
      originalEnd.apply(res, args)
    }
  }

  // Log de errores
  error(err) {
    const { log, stringifiedLog } = getLogData('error', err)

    const appendFileResponse = appendFile(this.logFile, stringifiedLog)

    if (appendFileResponse?.error) {
      console.error(appendFileResponse)
    }
    console.error(log)
  }

  // Log de información
  info(info) {
    const { log, stringifiedLog } = getLogData('info', info)

    const appendFileResponse = appendFile(this.logFile, stringifiedLog)

    if (appendFileResponse?.error) {
      console.error(appendFileResponse)
    }
    console.log(log)
  }

  // Log de advertencias
  warn(warning) {
    const { log, stringifiedLog } = getLogData('warn', warning)

    const appendFileResponse = appendFile(this.logFile, stringifiedLog)

    if (appendFileResponse?.error) {
      console.error(appendFileResponse)
    }
    console.warn(log)
  }
}

module.exports = Logger
