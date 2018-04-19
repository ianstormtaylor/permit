import { BearerPermit } from 'permit'
import Hapi from 'hapi'

const permit = new BearerPermit({
  basic: 'username', // Also allow a Basic Auth username as a token.
  query: 'access_token', // Also allow an `?access_token=` query parameter.
})

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 3000,
})

server.route({
  method: 'GET',
  path: '/restricted',
  handler: (request, reply) => {
    const { req, res } = request.raw

    // Try to find the bearer token in the request.
    const token = permit.check(req)

    // No token found, so ask for authentication.
    if (!token) {
      permit.fail(res)
      return reply(new Error(`Authentication required!`))
    }

    // Perform your authentication logic however you'd like...
    db.users.findByToken(token, (err, user) => {
      if (err) return reply(err)

      // No user found, so their token was invalid.
      if (!user) {
        permit.fail(res)
        return reply(new Error(`Authentication invalid!`))
      }

      // Authentication succeeded, save the context and proceed...
      request.user = user
      reply('Some restricted content.')
    })
  },
})

server.start()
