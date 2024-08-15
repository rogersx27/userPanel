const { handleHealthRoute } = require('./health')
const { notFoundRoute } = require('./notFound')
const { loginRoute } = require('./login')
const { registerRoute } = require('./register')
const { signInRoute } = require('./signIn')
const { forgotPasswordRoute } = require('./forgotPassword')
const { dashboardRoute } = require('./dashboard')
const { signUpRoute } = require('./signUp')

const routes = {
  '/health': handleHealthRoute,
  '/notFound': notFoundRoute,
  '/login': loginRoute,
  '/': loginRoute,
  '': loginRoute,
  '/register': registerRoute,
  '/signIn': signInRoute,
  '/forgotPassword': forgotPasswordRoute,
  '/dashboard': dashboardRoute,
  '/signUp': signUpRoute,
}

module.exports = routes
