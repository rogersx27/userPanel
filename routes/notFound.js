const notFoundRoute = (req, res) => {
  res.writeHead(404)
  const response = { error: 'Not found' }
  res.end(JSON.stringify(response, null, 2))
}

module.exports = { notFoundRoute }
