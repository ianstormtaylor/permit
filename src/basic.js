import Url from 'url'
import Permit from './permit'

/**
 * A basic authorization permit class.
 *
 * @type {Basic}
 */

class Basic extends Permit {
  constructor(options = {}) {
    const { query, ...rest } = options
    const scheme = 'Basic'
    super({ scheme, ...rest })
    this.query = query
  }

  check(req) {
    const { query } = this
    const auth = req.headers
      ? req.headers.authorization || req.headers['proxy-authorization']
      : null

    if (auth) {
      const [scheme, credentials] = auth.split(' ')

      if (scheme === 'Basic') {
        const ascii = Buffer.from(credentials, 'base64').toString('ascii')
        const [username, password] = ascii.split(':')
        return [username, password]
      }
    }

    if (query && req.url.includes('?')) {
      const parsed = Url.parse(req.url, true)
      const [u, p] = query

      if (u in parsed.query || p in parsed.query) {
        return [parsed.query[u], parsed.query[p]]
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
