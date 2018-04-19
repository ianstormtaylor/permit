<p align="center">
  <a href="#"><img src="./docs/images/banner.png" /></a>
</p>

<p align="center">
  An <em>unopinionated</em> authentication library <br/>
  for building Node.js APIs.
</p>
<br/>
<br/>

<p align="center">
  <a href="#usage">Usage</a> •
  <a href="#why">Why?</a> •
  <a href="#principles">Principles</a> •
  <a href="#examples">Examples</a> •
  <a href="#documentation">Documentation</a>
</p>

<p align="center">
  <a href="https://travis-ci.org/ianstormtaylor/permit">
    <img src="https://travis-ci.org/ianstormtaylor/permit.svg?branch=master">
  </a>
  <a href="./package.json">
    <img src="https://img.shields.io/npm/v/permit.svg?maxAge=300&label=version&colorB=007ec6&maxAge=300">
  </a>
  <a href="./License.md">
    <img src="https://img.shields.io/npm/l/slate.svg?maxAge=300">
  </a>
</p>

<br/>
<br/>

Permit makes it easy to add an authentication layer to any Node.js API. It can be used with any of the popular server frameworks (eg. Express, Koa, Hapi, Fastify) and it can be used for any type of API (eg. REST, GraphQL, etc.) due to its simple, unopinionated design.

<br/>

### Usage

Permit lets you authenticate via the two schemes most APIs need: a single secret bearer token, or a set of username and password credentials. For example, here's how to authenticate a bearer token:

```js
import { Bearer } from 'permit'

// A permit that checks for HTTP Bearer Auth, falling back to a query string.
const permit = new Bearer({
  query: 'access_token',
})

async function handler({ req, res }) {
  // Try to find the bearer token in the request.
  const token = permit.check(req)

  // No token, that means they didn't pass credentials!
  if (!token) {
    permit.fail(res)
    throw new Error(`Authentication required!`)
  }

  // Authenticate the token however you'd like...
  const user = await db.users.findByToken(token)

  // No user, that means their credentials were invalid!
  if (!user) {
    permit.fail(res)
    throw new Error(`Authentication invalid!`)
  }

  // They were authenticated, so continue with your business logic...
  ...
}
```

Since Permit isn't tightly coupled to a framework or data model, it gives you complete control over how you write your authentication logic—the exact same way you'd write any other request handler.

<br/>

### Why?

Before Permit, the only real choice for authentication libraries in Node.js was [Passport.js](http://www.passportjs.org/). But it has a bunch of issues that complicate your codebase...

* **It is not focused on authenciating APIs.** Passport is focused on authenticating _web apps_ with services like Facebook, Twitter and GitHub. APIs don't need that, so all the extra bloat means _lots_ of complexity for no gain.

* **It is tightly-coupled to Express.** If you use Koa, Hapi, Fastify, or some other framework you have to go to great lengths to get it to play nicely. Even if you just want to tweak the opinionated defaults you're often out of luck.

* **Other middleware are tightly-coupled to it.** Passport stores state on the `req` object, so all your other middleware (even other third-party middleware) become tightly coupled to its implementation, making your codebase brittle.

* **It results in lots of hard to debug indirection.** Because of Passport's black-box architecture, whenever you need to debug an issue it's causing you have to trace its logic across many layers of indirection and many repositories.

* **It's not very actively maintained.** Passport's focus on OAuth providers means that it takes on a _huge_ amount of scope, across a lot of repositories, many of which are not actively maintained anymore.

Don't get me wrong, Passport works great for working with OAuth providers. But if you've run into any of these problems before while adding authentication to a Node.js API, you might like Permit.

Which brings me to how Permit solves these issues...

<br/>

### Principles

1. **API first.** Permit was designed with authenticating APIs in mind, so it's able to be _much_ leaner than others, since it doesn't need to handle complex OAuth integrations with Facebook, Google, etc.

2. **Stateless requests.** Since the vast majority of APIs are stateless in nature, Permit eschews the complexity that comes with handling session stores—without preventing you from using one if you need to.

3. **Framework agnostic.** Permit doesn't lock you into using any specific server framework or data model, because it's composed of small but powerful utility functions that do the heavy-lifting for you.

4. **Unopinionated interface.** Due to it's simple interface, Permit makes it much easier to write and reason about your actual authentication logic, because it's exactly like writing any other route handler for your API.

<br/>

### Examples

Permit's API is very flexible, allowing it to be used for a variety of use cases depending on your server framework, your feelings about ORMs, your use of promises, etc. Here are a few examples of common patterns...

* [Koa](./examples/koa.js)
* [Express](./examples/express.js)
* [Fastify](./examples/fastify.js)
* [Hapi](./examples/hapi.js)
* [Generic](./examples/generic.js)

<br/>

### Documentation

Read the getting started guide to familiarize yourself with how Permit works, or check out the full API reference for more detailed information...

* [**Guide**](./docs/guide.md)
  * [Installing Permit](./docs/guide.md#installing-permit)
  * [Creating Permits](./docs/guide.md#creating-permits)
  * [Writing Authentication Logic](./docs/guide.md#writing-authentication-logic)
  * [Failing Authentication](./docs/guide.md#failing-authentication)
* [**Reference**](./docs/reference.md)
  * [Permit](./docs/reference.md#permit)
    * [`permit.check`](./docs/reference.md#permit-check)
    * [`permit.fail`](./docs/reference.md#permit-fail)
  * [Types](./docs/reference.md#types)
    * [`Basic`](./docs/reference.md#basic)
    * [`Bearer`](./docs/reference.md#bearer)
    * [`Permit`](./docs/reference.md#permit2)

<br/>

### Thanks

Thank you to [@dresende](https://github.com/dresende) for graciously transferring the `permit` package!

<br/>

### License

This package is [MIT-licensed](./License.md).
