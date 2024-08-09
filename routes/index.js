const { handleHealthRoute } = require('./health')
const { notFoundRoute } = require('./notFound')
const { loginRoute } = require('./login')

const routes = {
  '/health': handleHealthRoute,
  '/notFound': notFoundRoute,
  '/': loginRoute,
  '/login': loginRoute,
  '': loginRoute,
}

module.exports = routes
