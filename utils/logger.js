const fs = require('fs')

const path = require('path')
const { stringify, appendFile, getLogData } = require('./helpers')

// Clase para manejar el loggingz
class Logger {
  constructor() {
    this.logDir = './logs'
    this.logFile = path.join(this.logDir, 'server.log')

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir)
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
