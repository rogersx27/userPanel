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

module.exports = { stringify, parse, getLogData, appendFile }
