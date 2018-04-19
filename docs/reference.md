# API Reference

* [Permit](#permit)
  * [`permit.check`](#permit-check)
  * [`permit.fail`](#permit-fail)
* [Types](#types)
  * [`Basic`](#basic)
  * [`Bearer`](#bearer)
  * [`Permit`](#permit2)

## Permit

Each permit instance has two methods, `check` and `fail`...

### `permit.check`

`permit.check(req) => credentials`

```js
const credentials = permit.check(res)
```

The `check` method takes a Node.js `req` object and checks it for credentials based on the permit's configuration, returning any credentials it finds.

It does not dictate how the credentials should be validated.

### `permit.fail`

`permit.fail(res) => undefined`

```js
if (!credentials) {
  permit.fail(res)
  throw new Error()
}
```

The `fail` method takes a Node.js `res` object and augments it with authentication-specific HTTP headers that browsers and other clients expect, so that consumers can know what types of authentication are expected.

It does not dictate what the error response to the client should be.

## Types

The following permit types come packaged with the library...

```js
import { Basic, Bearer, Permit } from 'permit'
```

### `Basic`

```js
import { Basic } from 'permit'

const permit = new Basic({
  query: Array, // default `null`
})
```

The `Basic` permit checks for credentials in the form of `username` and `password` strings. This can either be in the form of HTTP Basic Auth, or via a query string.

* `query` — An optional array of the username and password query parameters keys to check as a fallback.

### `Bearer`

```js
import { Bearer } from 'permit'

const permit = new Bearer({
  basic: String,
  query: String.
})
```

The `Bearer` permit checks for credentials in the form of a secret bearer token string. This can either be via HTTP Bearer Auth, via HTTP Basic Auth, or via a query string.

* `basic` — Either `'username'` or `'password'` denoting which field of the HTTP Basic Auth to use as a fallback.
* `query` — A query parameter key to check as a fallback.

### `Permit`

The generic `Permit` is provided to be extended by other permits, in case you need to implement custom checking logic.
