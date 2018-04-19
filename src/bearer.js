
import Url from 'url'
import Permit from './permit'

/**
 * A bearer token permit class.
 *
 * @type {BearerPermit}
 */

class BearerPermit extends Permit {

  constructor(options = {}) {
    const { basic, query, ...rest } = options
    const scheme = basic ? ['Bearer', 'Basic'] : 'Bearer'
    super({ scheme, ...rest })
    this.basic = basic
    this.query = query
  }

  parse(req) {
    const { basic, query } = this
    const auth = req.headers
      ? req.headers.authorization || req.headers['proxy-authorization']
      : null

    if (auth) {
      const [ scheme, credentials ] = auth.split(' ')

      if (scheme === 'Bearer') {
        return credentials
      }

      if (basic && scheme === 'Basic') {
        const ascii = Buffer.from(credentials, 'base64').toString('ascii')
        const [ username, password ] = ascii.split(':')
        if (basic === 'username') return username
        if (basic === 'password') return password
      }
    }

    if (query && req.url.includes('?')) {
      const parsed = Url.parse(req.url, true)

      if (query in parsed.query) {
        return parsed.query[query]
      }
    }
  }

}

/**
 * Export.
 *
 * @type {BearerPermit}
 */

export default BearerPermit
