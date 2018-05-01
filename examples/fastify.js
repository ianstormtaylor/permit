import { Bearer } from 'permit'
import Fastify from 'fastify'

const permit = new Bearer({
  basic: 'username', // Also allow a Basic Auth username as a token.
  query: 'access_token', // Also allow an `?access_token=` query parameter.
})

const fastify = Fastify()
fastify.decorateRequest('user', null)

fastify.addHook('preHandler', async (request, reply) => {
  // Try to find the bearer token in the request.
  const token = permit.check(request.raw)

  // No token found, so ask for authentication.
  if (!token) {
    permit.fail(reply.res)
    throw new Error('Authentication required!')
  }

  // Perform your authentication logic however you'd like...
  const user = await db.users.findByToken(token)

  // No user found, so their token was invalid.
  if (!user) {
    permit.fail(reply.res)
    throw new Error('Authentication invalid!')
  }

  // Authentication succeeded, save the context and proceed...
  request.user = user
})

fastify.get('/restricted', async (req, reply) => {
  content: 'Restricted content!'
})

fastify.listen(3000)
