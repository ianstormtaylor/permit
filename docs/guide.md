# Getting Started

* [Installing Permit](#installing-permit)
* [Creating Permits](#creating-permits)
* [Writing Authentication Logic](#writing-authentication-logic)
* [Failing Authentication](#failing-authentication)
* [API Reference](#api-reference)

## Installing Permit

To install Permit with Yarn or Npm, simply:

```bash
yarn add permit
```

```bash
npm install --save permit
```

And then you can import it into your code base:

```js
import { BearerPermit, BasicPermit } from 'permit'
```

## Creating Permits

Once you've got Permit installed, the next step is to create the type of permit corresponding for the authentication method your API needs:

* The **`BasicPermit`** uses a username and password combination.
* The **`BearerPermit`** uses a single secret bearer token string.

For example, if you want your API to accept secrets:

```js
const permit = new BearerPermit({
  basic: 'username',
  query: 'access_token',
})

const secret = permit.check(req)

if (secret) {
  ...
}
```

This permit will check a request first for an `Authorization Bearer` token, then for an `Authorization Basic` username, and finally for an `?access_token=` query parameter. That's all customizable.

Or you could have your API accept usernames and passwords:

```js
const permit = new BasicPermit({
  query: ['username', 'password'],
})

const credentials = permit.check(req)

if (credentials) {
  const [ username, password ] = credentials
  ...
}
```

This permit will check a request first for an `Authorization Basic` username and password, falling back to `?username=&password=` query string parameters. Again, all customizable.

## Writing Authentication Logic

The `permit.check` method simply retrieves the credentials you've defined from the Node.js `req` object. Then it's up to you to validate those credentials however you'd like using your API's specific business logic.

```js
const secret = permit.check(req)

if (secret) {
  const user = await db.users.findBySecret(secret)
  ...
}
```

One of the best parts of Permit's design is that it is decoupled from any server framework or ORM layer—it just retrieves the credentials from the request for you.

From there, your authentication logic can be written however you'd like. Which means you have full access to the current request, the current response, and any other context-specific information (eg. the current actor, or current database connection) you may need. And you can write error handling logic to surface errors however your API requires.

This may sound obvious, but other libraries like [Passport.js](http://www.passportjs.org/) encapsulate the authentication logic inside their own abstraction which makes writing it much more complex than it needs to be. With Permit, it's just like writing business logic in any other request handler.

## Failing Authentication

Authentication can fail for two reasons: either no credentials were provided, or the provided credentials were invalid. When this happens you'll use the `permit.fail` method to add a few extra properties to the Node `res` object before it is returned to the user.

```js
const secret = permit.check(req)

// No secret was found, they didn't provide any credentials!
if (!secret) {
  permit.fail(res)
  throw new Error('Authentication required!')
}

const user = await db.users.findBySecret(secret)

// Or, no user was found, their credentials were invalid!
if (!user) {
  permit.fail(res)
  throw new Error('Authentication invalid!')
}

// Otherwise, they're passed, so continue with your business logic...
...
```

## API Reference

That's all for the guide, but check out the [API Reference](./reference.md) documentation for more detailed information.
