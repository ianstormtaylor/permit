import MockReq from 'mock-req'
import assert from 'assert'
import fs from 'fs'
import { basename, extname, resolve } from 'path'

/**
 * Tests.
 */

describe('permit', () => {
  const kindsDir = resolve(__dirname, 'fixtures')
  const kinds = fs
    .readdirSync(kindsDir)
    .filter(t => t[0] !== '.')
    .map(t => basename(t, extname(t)))

  for (const kind of kinds) {
    describe(kind, () => {
      const testsDir = resolve(kindsDir, kind)
      const tests = fs
        .readdirSync(testsDir)
        .filter(t => t[0] !== '.')
        .map(t => basename(t, extname(t)))

      for (const test of tests) {
        it(test, () => {
          const module = require(resolve(testsDir, test))
          const { permit, request, credentials } = module
          const req = new MockReq(request)
          const actual = permit.check(req)
          const expected = credentials
          assert.deepEqual(actual, expected)
        })
      }
    })
  }
})
