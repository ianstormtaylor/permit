import { BearerPermit } from 'permit'

const permit = new BearerPermit({
  basic: 'username', // Also allow a Basic Auth username as a token.
  query: 'access_token', // Also allow an `?access_token=` query parameter.
})

async function handler(req, res) {
  // Try to find the bearer token in the request.
  const token = permit.parse(req)

  // No token found, so ask for authentication.
  if (!token) {
    permit.fail(res)
    throw new Error(`Authentication required!`)
  }

  // Perform your authentication logic however you'd like...
  const user = await db.users.findByToken(token)

  // No user found, so their token was invalid.
  if (!user) {
    permit.fail(res)
    throw new Error(`Authentication invalid!`)
  }

  return 'Success!'
}
