
import Permit from './permit'

/**
 * A basic authorization permit class.
 *
 * @type {BasicPermit}
 */

class BasicPermit extends Permit {

  constructor(options = {}) {
    const scheme = 'Basic'
    super({ scheme, ...options })
  }

  parse(req) {
    const auth = req.headers
      ? req.headers.authorization || req.headers['proxy-authorization']
      : null

    if (auth) {
      const [ scheme, credentials ] = auth.split(' ')

      if (scheme === 'Basic') {
        const ascii = Buffer.from(credentials, 'base64').toString('ascii')
        const [ username, password ] = ascii.split(':')
        return [username, password]
      }
    }
  }

}

/**
 * Export.
 *
 * @type {BasicPermit}
 */

export default BasicPermit
