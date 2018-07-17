import Permit from './permit'

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

export default Basic
