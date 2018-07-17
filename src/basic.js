import Permit from './permit'

/**
 * A basic authorization permit class.
 *
 * @type {Basic}
 */

class Basic extends Permit {
  constructor(options = {}) {
    const scheme = 'Basic'
    super({ scheme, ...options })
  }

  check(req) {
    const { proxy } = this
    const auth = req.headers
      ? proxy ? req.headers['proxy-authorization'] : req.headers.authorization
      : null

    if (auth) {
      const [scheme, credentials] = auth.split(' ')

      if (scheme === 'Basic') {
        const ascii = Buffer.from(credentials, 'base64').toString('ascii')
        const [username, password] = ascii.split(':')
        return [username, password]
      }
    }
  }
}

/**
 * Export.
 *
 * @type {Basic}
 */

export default Basic
