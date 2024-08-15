const Logger = require('../utils/logger')
const { getParseRequestInfo, getRequestBody } = require('../utils/helpers')
const { insertEvent } = require('../database/databaseServices/insert')

const createEvent = async (eventData) => {
  try {
    const { user_id, title, description, start_time, end_time, location } = eventData
    await insertEvent(user_id, title, description, start_time, end_time, location)
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

const handleCreateEvent = async (req, res, logger) => {
  try {
    const { title, description, start_time, end_time, location } = await getRequestBody(req)

    const user_id = 1 // Hardcoded user_id for now

    if (!user_id || !title || !start_time || !end_time || !location) {
      logger.warn({ message: 'Datos incompletos en la solicitud de creación de evento' })
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: true, message: 'Datos incompletos' }))
      return
    }

    const eventData = { user_id, title, description, start_time, end_time, location }
    const result = await createEvent(eventData)

    console.log('result', result)

    if (result.success) {
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true }))
    } else {
      logger.error({ message: 'Error al insertar el evento', error: result.error.message })
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: true, message: 'Error al crear el evento' }))
    }
  } catch (error) {
    logger.error({ message: 'Error en el manejo de la creación de evento', error: error.message })
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: true, message: 'Solicitud inválida' }))
  }
}

const createEventRoute = async (req, res) => {
  const logger = new Logger()
  const { pathName, method } = getParseRequestInfo(req)

  const isCreateEventRoute = pathName === 'createEvent'

  if (isCreateEventRoute && method === 'POST') {
    await handleCreateEvent(req, res, logger)
  } else if (isCreateEventRoute) {
    res.writeHead(405, { 'Content-Type': 'text/html' })
    res.end('Método no permitido')
  }
}

module.exports = { createEventRoute }
