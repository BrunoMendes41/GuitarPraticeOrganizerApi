const jwt = require('jsonwebtoken')

function verifyTokenAndGetUser(request, response, next) {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null)
    return response.status(401).json({ error: 'token invalida', auth: false })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return response.status(403).json({ error: err, auth: false })

    request.username = user

    next()
  })
}

module.exports = verifyTokenAndGetUser
