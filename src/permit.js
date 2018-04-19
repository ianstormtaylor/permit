/**
 * The base `Permit` class to be extended.
 *
 * @type {Permit}
 */

class Permit {
  constructor(options = {}) {
    const { scheme, realm = 'auth' } = options
    this.scheme = scheme
    this.realm = realm
  }

  check() {
    throw new Error(`Not implemented!`)
  }

  fail(res) {
    const { scheme, realm } = this
    const schemes = Array.isArray(scheme) ? scheme : [scheme]
    res.statusCode = 401
    schemes.forEach(s => {
      const header = `${s} realm="${realm}"`
      res.setHeader('www-authenticate', header)
      res.setHeader('proxy-authenticate', header)
    })
  }
}

/**
 * Export.
 *
 * @type {Permit}
 */

export default Permit
