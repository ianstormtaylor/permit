import { Bearer } from 'permit'
import express from 'express'

const permit = new Bearer({
  basic: 'username', // Also allow a Basic Auth username as a token.
  query: 'access_token', // Also allow an `?access_token=` query parameter.
})

function authenticate(req, res, next) {
  // Try to find the bearer token in the request.
  const token = permit.check(req)

  // No token found, so ask for authentication.
  if (!token) {
    permit.fail(res)
    return next(new Error(`Authentication required!`))
  }

  // Perform your authentication logic however you'd like...
  db.users.findByToken(token, (err, user) => {
    if (err) return next(err)

    // No user found, so their token was invalid.
    if (!user) {
      permit.fail(res)
      return next(new Error(`Authentication invalid!`))
    }

    // Authentication succeeded, save the context and proceed...
    req.user = user
    next()
  })
}

const app = express()

app.get('/', (req, res) => {
  res.send('Some unrestricted content.')
})

app.get('/restricted', authenticate, (req, res) => {
  res.send('Restricted content!')
})

app.listen(3000)
