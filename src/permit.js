/**
 * The base `Permit` class to be extended.
 *
 * @type {Permit}
 */

class Permit {
  constructor(options = {}) {
    const { scheme, proxy, realm = 'auth' } = options
    this.scheme = scheme
    this.realm = realm
    this.proxy = proxy
  }

  check() {
    throw new Error(`Not implemented!`)
  }

  fail(res) {
    const { proxy, realm, scheme } = this
    const schemes = Array.isArray(scheme) ? scheme : [scheme]
    res.statusCode = proxy ? 407 : 401
    schemes.forEach(s => {
      const value = `${s} realm="${realm}"`
      const key = proxy ? 'proxy-authenticate' : 'www-authenticate'
      res.setHeader(key, value)
    })
  }
}

/**
 * Export.
 *
 * @type {Permit}
 */

export default Permit
