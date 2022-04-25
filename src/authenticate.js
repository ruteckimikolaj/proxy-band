const auth = require('basic-auth')

const { LOGIN } = process.env
const { PASSWORD } = process.env

function authenticate(req, res, next) {
  if (LOGIN && PASSWORD) {
    const credentials = auth(req)
    if (
      !credentials ||
      credentials.name !== LOGIN ||
      credentials.pass !== PASSWORD
    ) {
      res.setHeader(
        'WWW-Authenticate',
        'Basic realm="Bandwidth-Hero Compression Service"'
      )

      return res.status(401).end('Access denied')
    }
  }

  next()
}

module.exports = authenticate
