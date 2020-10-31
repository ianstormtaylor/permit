import Url from 'url'
import Permit from './permit'

class Bearer extends Permit {
  constructor(options = {}) {
    const { basic, header, query, cookie, ...rest } = options
    const scheme = basic ? ['Bearer', 'Basic'] : 'Bearer'
    super({ scheme, ...rest })
    this.basic = basic
    this.header = header
    this.query = query
    this.cookie = cookie
  }

  check(req) {
    const { basic, header, query, proxy, cookie } = this
    const auth = req.headers
      ? proxy ? req.headers['proxy-authorization'] : req.headers.authorization
      : null

    if (auth) {
      const [scheme, credentials] = auth.split(' ')

      if (scheme === 'Bearer') {
        return credentials
      }

      if (basic && scheme === 'Basic') {
        const ascii = Buffer.from(credentials, 'base64').toString('ascii')
        const [username, password] = ascii.split(':')

        if (basic === 'username') {
          return username
        }

        if (basic === 'password') {
          return password
        }
      }
    }

    if (header) {
      const value = req.headers ? req.headers[header.toLowerCase()] : null

      if (value) {
        return value
      }
    }

    if (query && req.url.includes('?')) {
      const parsed = Url.parse(req.url, true)

      if (query in parsed.query) {
        return parsed.query[query]
      }
    }

    if (cookie) {
      const cookies = req.headers ? req.headers.cookie : null
      if (cookies) {
        const cookieObj = this.parseCookies(cookies)
        if (cookieObj.hasOwnProperty(cookie)) {
          return cookieObj[cookie]
        }
      }
    }
  }
}

export default Bearer
