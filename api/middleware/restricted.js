const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../secrets/secret.js')



module.exports = (req, res, next) => {
    const token = req.headers.authorization
  
    if (!token) {
      return next({ status: 401, message: "token required" })
    }
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, mesage: "token invalid" })
      } else {
        req.decodedToken = decoded;
        next()
      }
    })
}