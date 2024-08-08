const { handleHealthRoute } = require('./health')

const routes = {
  '/health': handleHealthRoute,
}

module.exports = routes
